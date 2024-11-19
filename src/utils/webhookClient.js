const { WebhookClient, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const webhooks = {
    error: new WebhookClient({ url: process.env.ERROR_WH }),
    register: new WebhookClient({ url: process.env.REGISTER_WH }),
    confirm: new WebhookClient({ url: process.env.CONFIRMED_WH })
};

module.exports = {
    sendEmbedNotification: async (type, title, description, color, embedFields = []) => {
        console.log(embedFields);
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color);

        if (Array.isArray(embedFields) && embedFields.length > 0) {
            embed.addFields(...embedFields);
        }

        if (webhooks[type]) {
            await webhooks[type].send({ embeds: [embed] });
        } else {
            console.error(`Invalid webhook type: ${type}`);
        }
    }
};
