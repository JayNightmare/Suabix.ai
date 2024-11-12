const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sendEmbedNotification } = require('../utils/webhookClient');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confirm-registration')
        .setDescription('Confirm your registration on the SaaS platform'),
        
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Confirmation")
            .setDescription(`Your registration has been confirmed! You now have access to the platform's features.`)
            .setColor(0x2ecc71);

        await interaction.reply({ embeds: [embed] });

        // Send Webhook Notification for Confirmation
        await sendEmbedNotification(
            'confirm',
            'Registration Confirmation',
            `User **${interaction.user.tag}** confirmed their registration.`,
            0x2ecc71
        );
    }
};
