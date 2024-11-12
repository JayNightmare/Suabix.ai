const { sendEmbedNotification } = require('./webhookClient');

module.exports = async (interaction, error) => {
    console.error(error);

    await interaction.reply({
        embeds: [{
            title: "Error",
            description: "An error occurred while executing this command. Please try again later",
            color: 0xe74c3c
        }],
        ephemeral: true
    });

    // Send Webhook Notification for Error
    await sendEmbedNotification(
        'Error Notification',
        `An error occurred for user **${interaction.user.tag}** while executing command **${interaction.commandName}**.\nError: ${error.message}`,
        0xe74c3c
    );
};
