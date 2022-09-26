const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('memes')
            .setDescription('Send some memes')
            .addStringOption(option => 
                option.setName('meme')
                .setDescription('What meme to send?')
                .setRequired(true)
                .addChoices(
                    { name: 'Raid?' , value: 'raid'}
                )),
    async execute(interaction) {

        let p = path.join(__dirname, ChoiceEnum[interaction.options.getString('meme')]);

        await interaction.reply({ files: [ p ]});

    },
};

const ChoiceEnum = {
    raid: 'command_assets/raid-destiny.gif'
}
Object.freeze(ChoiceEnum);