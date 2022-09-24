const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Pings a game distro'),
    async execute(interaction) {
        await interaction.reply('To be implemented.');
    },
};