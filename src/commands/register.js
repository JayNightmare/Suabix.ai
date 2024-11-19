const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { sendEmbedNotification } = require('../utils/webhookClient');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register on the SaaS platform'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setTitle("Registration")
                .setDescription('Go to [link here] to register your account\n\nOnce you have registered, run the `/confirm` command')
                .setColor(0x3498db);
            
            await interaction.reply({ embeds: [embed], ephemeral: true });
    
            // Send Webhook Notification for Registration
            await sendEmbedNotification(
                'register',
                'User Registration',
                `User <@${interaction.user.id}> requested to register to the site.`,
                0x3498db
            );
        } catch (error) {
            console.error('Error executing /register command:', error);
            await interaction.reply('An error occurred while processing your request.');
        }
    }
};
