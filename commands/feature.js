const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feature')
        .setDescription('Learn more about the SaaS platform features.')
        .addStringOption(option => option.setName('feature_name').setDescription('Name of the feature').setRequired(true)),
    async execute(interaction) {
        const featureName = interaction.options.getString('feature_name');
        
        // Respond with details about the requested feature
        await interaction.reply({
            embeds: [{
                title: `Feature: ${featureName}`,
                description: `Details and usage of the **${featureName}** feature will be displayed here.`,
                color: 0xf1c40f
            }]
        });
    }
};
