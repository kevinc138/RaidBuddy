const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('things')
            .setDescription('Replies with thangs!'),
    async execute(interaction) {
        await interaction.reply('Thangs!');
    },
};