const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feature')
        .setDescription('Learn more about the SaaS platform features')
        .addStringOption(option => 
            option.setName('feature_name')
                .setDescription('Name of the feature')
                .setRequired(true)
        ),
    async execute(interaction) {
        const featureName = interaction.options.getString('feature_name');
        
        const embed = new EmbedBuilder()
            .setTitle(`Feature: ${featureName}`)
            .setDescription(`Details and usage of the **${featureName}** feature will be displayed here.`)
            .setColor(0xf1c40f);

        await interaction.reply({ embeds: [embed] });
    }
};
