require('dotenv').config();

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        console.log(`Joined new guild: ${guild.name} (${guild.id})`);

        // Parse allowed server IDs from .env
        const allowedServerIds = [process.env.DEV_SERVER, process.env.PROD_SERVER]

        // Check if the joined guild is in the allowed list
        if (!allowedServerIds.includes(guild.id)) {
            console.log(`Guild not allowed: ${guild.name} (${guild.id}). Leaving...`);
            try {
                await guild.leave();
                console.log(`Successfully left guild: ${guild.name} (${guild.id})`);
            } catch (error) {
                console.error(`Failed to leave guild: ${guild.name} (${guild.id})`, error);
            }
        } else {
            console.log(`Guild is allowed: ${guild.name} (${guild.id}).`);
        }
    },
};
    