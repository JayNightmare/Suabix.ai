const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.systemChannel; // Use the system channel if set, or replace with a specific channel ID.
        if (!channel) return;

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('Welcome!')
            .setDescription(`Hello, <@${member.id}>! Welcome to **${member.guild.name}**! 🎉`)
            .addFields(
                { name: 'Commands', value: 'Run the `/help` command to view the available commands' },
            )
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: 'We hope you enjoy your stay!' })
            .setTimestamp();

        channel.send({ embeds: [welcomeEmbed] }).catch(console.error);
    },
};
