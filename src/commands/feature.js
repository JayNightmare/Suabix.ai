const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('features')
        .setDescription('Learn more about the SaaS platform features')
        .addStringOption(option => 
            option.setName('feature_name')
                .setDescription('Select a feature to learn about')
                .setRequired(true)
                .addChoices(
                    { name: 'Placeholder 1', value: 'placeholder_1' },
                    { name: 'Placeholder 2', value: 'placeholder_2' },
                    { name: 'Placeholder 3', value: 'placeholder_3' },
                    { name: 'Placeholder 4', value: 'placeholder_4' },
                    { name: 'Placeholder 5', value: 'placeholder_5' }
                )
        ),
    async execute(interaction) {
        const featureName = interaction.options.getString('feature_name');
        
        // Define descriptions for each placeholder feature
        const featureDetails = {
            placeholder_1: {
                title: "Placeholder 1",
                description: "Explore Placeholder 1, which provides an overview of feature X on our platform.",
                link: "https://example.com/feature1"
            },
            placeholder_2: {
                title: "Placeholder 2",
                description: "Discover Placeholder 2, offering insights into feature Y.",
                link: "https://example.com/feature2"
            },
            placeholder_3: {
                title: "Placeholder 3",
                description: "Learn more about Placeholder 3 and how it enhances user experience.",
                link: "https://example.com/feature3"
            },
            placeholder_4: {
                title: "Placeholder 4",
                description: "Find out about Placeholder 4, a key component of our platform.",
                link: "https://example.com/feature4"
            },
            placeholder_5: {
                title: "Placeholder 5",
                description: "Dive into Placeholder 5 for details on feature Z.",
                link: "https://example.com/feature5"
            }
        };

        const selectedFeature = featureDetails[featureName];

        const embed = new EmbedBuilder()
            .setTitle(`Feature: ${selectedFeature.title}`)
            .setDescription(`${selectedFeature.description}\n\n[Learn more](${selectedFeature.link})`)
            .setColor(0xf1c40f);

        await interaction.reply({ embeds: [embed] });
    }
};
