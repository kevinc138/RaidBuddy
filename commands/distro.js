const { SlashCommandBuilder } = require('discord.js');
const subscriptions = require('./command_handlers/subscriptionHandler')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('distro')
            .setDescription('options related to game distrobution lists.')
            .addSubcommand(subcommand => 
                subcommand.setName('create_distro')
                .setDescription('Creates a distrobution list for others to subscribe to.')
                .addStringOption(option => 
                    option.setName('distro')
                    .setDescription('The name of your distrobution list.')
                    .setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand.setName('subscribe')
                .setDescription('Subscribes to a distrobution list.')
                .addStringOption(option => 
                    option.setName('distro')
                    .setDescription('The name of the distro to subscribe to.')
                    .setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand.setName('unsubscribe')
                .setDescription('Unsubscribes to a distrobution list.')
                .addStringOption(option => 
                    option.setName('distro')
                    .setDescription('The name of the distro to unsubscribe to.')
                    .setRequired(true)))
            .addSubcommand(subcommand => 
                subcommand.setName('list_distros')
                .setDescription('Lists all of the distros for this guild.')),
    async execute(interaction) {

        let distro = interaction.options.getString('distro');
        let subcommand = interaction.options.getSubcommand();

        if(subcommand === 'create_distro') {
            subscriptions.addGameDistro(interaction, distro);
        } else if(subcommand === 'subscribe') {
            subscriptions.addUserSubscription(interaction, distro);
        } else if(subcommand === 'unsubscribe') {
            subscriptions.removeUserSubscription(interaction, distro);
        } else if(subcommand === 'list_distros') {
            subscriptions.listGameDistros(interaction);
        }
    },
};