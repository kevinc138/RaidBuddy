const { SlashCommandBuilder } = require('discord.js');
const { doRps } = require('./command_handlers/rpsHandler');


module.exports = {
    data: new SlashCommandBuilder()
            .setName('rps')
            .setDescription('Plays Rock, Paper, Scissors'),
    async execute(interaction) {
        doRps(interaction);
    },
};