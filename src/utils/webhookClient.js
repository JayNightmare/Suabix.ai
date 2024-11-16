const { WebhookClient, EmbedBuilder } = require('discord.js');
require('dotenv').config();

// Parse allowed server IDs from .env
// const errorWH = process.env.ALLOWED_SERVER_IDS.split(',');
// const registerWH = process.env.ALLOWED_SERVER_IDS.split(',');
// const confirmedWH = process.env.ALLOWED_SERVER_IDS.split(',');

const webhooks = {
    error: new WebhookClient({ url: process.env.ERROR_WH }),
    register: new WebhookClient({ url: process.env.REGISTER_WH }),
    confirm: new WebhookClient({ url: process.env.CONFIRMED_WH })
};

module.exports = {
    sendEmbedNotification: async (type, title, description, color) => {
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color);

        if (webhooks[type]) {
            await webhooks[type].send({ embeds: [embed] });
        } else {
            console.error(`Invalid webhook type: ${type}`);
        }
    }
};
