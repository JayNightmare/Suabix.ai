const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sendEmbedNotification } = require('../utils/webhookClient');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confirm-registration')
        .setDescription('Confirm your registration on the SaaS platform')
        .addBooleanOption(option =>
            option.setName('terms_of_service')
                .setDescription('I agree to the terms of service')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('email')
                .setDescription('Your email address')
                .setRequired(true)
        ),
        
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        try {
            const embed = new EmbedBuilder()
                .setTitle("Confirmation")
                .setDescription(`<a:loading:1307826866169843722> Your registration has been sent for confirmation! Please wait till the registration has been confirmed by the moderators`)
                .setColor(0xbac67d);
    
            await interaction.editReply({ embeds: [embed], ephemeral: true });
    
            const tos = interaction.options.getBoolean('terms_of_service');
            const email = interaction.options.getString('email');
            // const user = interaction.user;
    
            const fields = [
                { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                { name: 'TOS Choice', value: tos ? String(tos) : 'Not provided', inline: true },
                { name: 'Email', value: email ? String(email) : 'Not provided', inline: false },
                { name: 'Status', value: '🔄️ Pending', inline: false }
            ];
    
            // Send Webhook Notification for Confirmation
            await sendEmbedNotification(
                'confirm', // Webhook type
                'Registration Confirmation', // Title
                `User **${interaction.user.tag}** confirmed their registration`,
                0xbac67d, // Color
                fields // Pass the fields array
            );
        } catch (error) {
            console.error('Error executing /confirm-registration command:', error);
            await interaction.editReply('An error occurred while processing your request.');
        }
    }
};
