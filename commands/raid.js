const { SlashCommandBuilder } = require('discord.js');

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
                        option.setName('lw_encounter')
                        .setDescription('The item you want more info about.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'LW Symbols', value: 'lw_symbols'},
                            { name: 'riven eyes', value: 'lw_eyes'}
                        )))
                .addSubcommand(subcommand =>
                    subcommand.setName('deep_stone_crypt')
                    .setDescription('Deep Stone Crypt raid')
                    .addStringOption(option => 
                        option.setName('dsc_encounter')
                        .setDescription('The item you want more info about.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Taniks First', value: 'dsc_taniks'},
                            { name: 'Taniks Abomination', value: 'dsc_taniksAbom'}
                        )))),
    async execute(interaction) {
        console.log(interaction);
        console.log(interaction.options);
        await interaction.reply(`${interaction.options.getString('raid_encounter')}`);
    },
};