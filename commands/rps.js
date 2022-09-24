const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('rps')
            .setDescription('Plays Rock, Paper, Scissors'),
    async execute(interaction) {
        await interaction.reply('rps to be implemented.');
    },
};