// src/events/ready.js
const { REST, Routes, ActivityType } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        // Set bot activity and status
        client.user.setActivity('Dev Mode', { type: ActivityType.Watching });
        client.user.setStatus('dnd');

        // Load commands
        const commands = [];
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

        try {
            console.log('Started refreshing application (/) commands');

            const guilds = await client.guilds.fetch(); // Fetch all guilds the bot is in

            for (const guild of guilds.values()) {
                const fullGuild = await client.guilds.cache.get(guild.id)?.fetch(); // Fetch full guild object

                if (!fullGuild) {
                    console.log(`Unable to fetch guild: ${guild.id}`);
                    continue;
                }

                // Check if the guild ID matches the allowed server ID
                if (fullGuild.id !== process.env.ALLOWED_SERVER_ID) {
                    console.log(`Leaving unauthorized guild: ${fullGuild.name} (${fullGuild.id})`);
                    await fullGuild.leave(); // Leave the guild
                } else {
                    try {
                        // Register commands for the allowed server
                        await rest.put(
                            Routes.applicationGuildCommands(client.user.id, fullGuild.id),
                            { body: commands }
                        );
                        console.log(`Successfully registered commands for guild: ${fullGuild.name} (${fullGuild.id})`);
                    } catch (error) {
                        console.error(`Error registering commands for guild: ${fullGuild.name} (${fullGuild.id})`, error);
                    }
                }
            }

            console.log('Successfully reloaded application (/) commands');
        } catch (error) {
            console.error('Error refreshing application commands or managing guilds:', error);
        }
    },
};
