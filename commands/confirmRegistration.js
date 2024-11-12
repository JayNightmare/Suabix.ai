const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confirmregistration')
        .setDescription('Confirm your registration on the SaaS platform.'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [{
                title: "Confirmation",
                description: `Your registration has been confirmed! You now have access to the platform's features`,
                color: 0x2ecc71
            }]
        });
    }
};
