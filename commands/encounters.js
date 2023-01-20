const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path');


module.exports = {
    data: new SlashCommandBuilder()
            .setName('d2')
            .setDescription('Trying subcommands!')
            .addSubcommandGroup(scgroup => 
                scgroup.setName("raid")
                .setDescription("Which raid in destiny 2?")
                .addSubcommand(subcommand => 
                    subcommand.setName('last_wish')
                    .setDescription('Last Wish raid')
                    .addStringOption(option => 
                        option.setName('encounter')
                        .setDescription('The item you want more info about.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'LW Symbols', value: 'lw_symbols'},
                            { name: 'Riven eyes', value: 'lw_eyes'}
                        )))
                .addSubcommand(subcommand =>
                    subcommand.setName('deep_stone_crypt')
                    .setDescription('Deep Stone Crypt raid')
                    .addStringOption(option => 
                        option.setName('encounter')
                        .setDescription('The item you want more info about.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Taniks First', value: 'dsc_taniks'},
                            { name: 'Taniks Abomination', value: 'dsc_taniksAbom'},
                            { name: 'Vault Security', value: 'dsc_vault'} 
                        ))))
            .addSubcommandGroup(scgroup =>
                scgroup.setName('dungeon')
                .setDescription('Which dungeon?')
                .addSubcommand(subcommand =>
                  subcommand.setName('sotw')
                  .setDescription('Spire of the Watcher')
                  .addStringOption(option => 
                        option.setName('encounter')
                        .setDescription('Which encounter?')
                        .setRequired(true)
                        .addChoices(
                          { name: 'Persys, Primordial Ruin', value: 'persys'}
                        )))),
    async execute(interaction) {

        let p = path.join(__dirname, ChoiceEnum[interaction.options.getString('encounter')]);

        await interaction.reply({ files: [ p ]});
    },
};

const ChoiceEnum = {
    lw_symbols: 'command_assets/LWSymbols.png',
    lw_eyes: 'command_assets/RivenEyes.png',
    dsc_taniks: 'command_assets/TaniksReborn.png',
    dsc_taniksAbom: 'command_assets/DSCTaniksAbom.png',
    dsc_vault: 'command_assets/DSCVault.png',
    persys: 'command_assets/spirewatcher2.jpeg'
}
Object.freeze(ChoiceEnum);