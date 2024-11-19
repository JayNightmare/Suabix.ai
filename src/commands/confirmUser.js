const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { sendEmbedNotification } = require('../utils/webhookClient');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confirm-user')
        .setDescription('Confirm or reject a user\'s registration on the SaaS platform')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to confirm or reject')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('confirmed')
                .setDescription('Set to true to confirm, false to reject')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const confirmed = interaction.options.getBoolean('confirmed');

        // Prepare variables for confirmation or rejection
        const status = confirmed ? '✅ Confirmed' : '❌ Rejected';
        const embedColor = confirmed ? 0x2ecc71 : 0xff4d4d;
        const adminMessage = confirmed
            ? `User <@${user.id}> has been confirmed!`
            : `User <@${user.id}> registration has been rejected.`;
        const userMessage = confirmed
            ? `<a:tick:1307826874625294377> Your registration has been confirmed! <a:tick:1307826874625294377>`
            : `❌ Your registration has been rejected ❌`;

        // Create the embed for the admin
        const adminEmbed = new EmbedBuilder()
            .setTitle(confirmed ? "User Confirmed" : "User Rejected")
            .setDescription(adminMessage)
            .setColor(embedColor);

        // Send admin notification
        await interaction.reply({ embeds: [adminEmbed] });

        const fields = [
            { name: 'User', value: `<@${user.id}>`, inline: true },
            { name: 'Processed By', value: `<@${interaction.user.id}>`, inline: true },
            { name: 'Time', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: false },
            { name: 'Status', value: status, inline: false }
        ];

        // Send Webhook Notification
        await sendEmbedNotification(
            'confirm',
            confirmed ? 'Registration Confirmation' : 'Registration Rejection',
            `User <@${user.id}> registration has been ${confirmed ? 'confirmed' : 'rejected'}`,
            embedColor,
            fields
        );

        // Create the embed for the user
        const userEmbed = new EmbedBuilder()
            .setTitle(userMessage)
            .setDescription(`Hello, <@${user.id}>!\n\nYour registration details are below:`)
            .addFields(fields)
            .setColor(embedColor)
            .setFooter({ text: confirmed ? "Thank you for registering!" : "Contact support for further details" });

        // Attempt to send the DM to the user
        try {
            await user.send({ embeds: [userEmbed] });
        } catch (error) {
            console.error(`Failed to send DM to ${user.tag}:`, error);

            // Inform the admin if DM fails
            await interaction.followUp({
                content: `⚠️ I was unable to send a DM to <@${user.id}>. They might have DMs disabled`,
                ephemeral: true
            });
        }
    }
};
