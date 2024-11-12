module.exports = async (interaction, error) => {
    console.error(error);
    await interaction.reply({
        embeds: [{
            title: "Error",
            description: "An error occurred while executing this command. Please try again later.",
            color: 0xe74c3c
        }],
        ephemeral: true
    });
};
