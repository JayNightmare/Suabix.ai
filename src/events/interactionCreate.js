const errorHandler = require('../utils/errorHandler');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, userSessionData) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, userSessionData);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}:`, error);
            await errorHandler(interaction, error);
        }
    },
};
