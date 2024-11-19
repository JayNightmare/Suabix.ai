const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Provides information on bot commands and categories"),

    async execute(interaction) {
        // Base Help Embed
        const helpEmbed = new EmbedBuilder()
            .setColor('#1d5b5b')
            .setTitle("Help Menu")
            .setDescription("Choose a category from the menu below to see available commands.")
            .setFooter({ text: "The bot is still in development. Stay tuned for updates!" });

        // Select Menu for Categories
        const helpMenu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('help_select')
                .setPlaceholder('Select a help category')
                .addOptions([
                    { label: 'Features', description: 'View the features of the website and AI.', value: 'features' },
                    { label: 'Register', description: 'Learn how to sign up on the website.', value: 'register' },
                    { label: 'Confirm Registration', description: 'Confirm your registration on the website.', value: 'confirm_registration' },
                    { label: 'Admin', description: 'View admin commands.', value: 'admin' },
                    { label: 'Coming Soon', description: 'Learn about future features.', value: 'coming_soon' }
                ])
        );

        // Send the base embed and menu
        const message = await interaction.reply({
            embeds: [helpEmbed],
            components: [helpMenu],
            ephemeral: true,
            fetchReply: true
        });

        // Filter for interactions
        const filter = i => i.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            let sectionEmbed;

            // Handle different menu options
            switch (i.values[0]) {
                case 'features':
                    sectionEmbed = new EmbedBuilder()
                        .setColor('#1d5b5b')
                        .setTitle("Features")
                        .setDescription("The bot provides the following features:")
                        .addFields(
                            { name: "/features", value: "Shows the features of the website and AI." }
                        );
                    break;

                case 'register':
                    sectionEmbed = new EmbedBuilder()
                        .setColor('#1d5b5b')
                        .setTitle("Register")
                        .setDescription("Use this command to get a link to the signup page on the website.")
                        .addFields(
                            { name: "/register", value: "Provides the signup link." }
                        );
                    break;

                case 'confirm_registration':
                    sectionEmbed = new EmbedBuilder()
                        .setColor('#1d5b5b')
                        .setTitle("Confirm Registration")
                        .setDescription("Confirms your registration on the website.")
                        .addFields(
                            { name: "/confirm-registration", value: "Verify your account after registering on the website." }
                        );
                    break;

                case 'coming_soon':
                    sectionEmbed = new EmbedBuilder()
                        .setColor('#1d5b5b')
                        .setTitle("Coming Soon")
                        .setDescription("This bot is under active development. Future commands will include:")
                        .addFields(
                            { name: "Planned Features", value: "Commands for managing your account, advanced analytics, and more." }
                        );
                    break;

                case 'admin':
                    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
                        sectionEmbed = new EmbedBuilder()
                        .setColor('#fd4b51')
                        .setTitle("Missing Perms")
                        .setDescription("You are not allowed to view the admin commands. You need the Administrator permission to view this.")
                        break;
                    }

                    sectionEmbed = new EmbedBuilder()
                        .setColor('#1d5b5b')
                        .setTitle("Admin")
                        .setDescription("View admin commands.")
                        .addFields(
                            { name: "/confirm-users", value: "Confirm a users registration" }
                        );
                    break;

                default:
                    sectionEmbed = helpEmbed;
            }

            // Update the message with the selected category
            await i.update({ embeds: [sectionEmbed], components: [helpMenu] });
        });

        // Disable the select menu after the collector ends
        collector.on('end', () => {
            helpMenu.components[0].setDisabled(true);
            message.edit({ components: [helpMenu] });
        });
    }
};
