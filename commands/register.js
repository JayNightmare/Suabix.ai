const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register on the SaaS platform.')
        .addStringOption(option => option.setName('email').setDescription('Your email').setRequired(true)),
    async execute(interaction) {
        const email = interaction.options.getString('email');
        
        // Mock registration process
        await interaction.reply({
            embeds: [{
                title: "Registration",
                description: `Thank you for registering! A confirmation email has been sent to **${email}**.`,
                color: 0x3498db
            }]
        });
    }
};
