const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('raid')
            .setDescription('Gives options to select information about raids.')
            .addStringOption(option => 
                option.setName("Game")
                    .setDescription("Choose the game for your raid.")
                    .setRequired(true)
                    .setChoices(
                        {
                            name: 'Destiny 2', value: 'destiny2'
                        },
                        {
                            name: 'FFXIV", value: "ff14'
                        },
                    )),
    async execute(interaction) {
        await interaction.reply('Raid!');
    },
};