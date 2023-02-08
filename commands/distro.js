const { SlashCommandBuilder } = require('discord.js');
const subscriptions = require('./command_handlers/subscriptionHandler')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('distro')
    .setDescription('options related to game distribution lists.')
    .addSubcommand(subcommand =>
      subcommand.setName('ping')
        .setDescription('Pings a distribution list, with an optional message')
        .addStringOption(option =>
          option.setName('distro')
            .setDescription('The name of the distribution list to ping.')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('message')
            .setDescription('The message to send')))
    .addSubcommand(subcommand =>
      subcommand.setName('create_distro')
        .setDescription('Creates a distribution list for others to subscribe to.')
        .addStringOption(option =>
          option.setName('distro')
            .setDescription('The name of your distribution list.')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand.setName('subscribe')
        .setDescription('Subscribes to a distribution list.')
        .addStringOption(option =>
          option.setName('distro')
            .setDescription('The name of the distro to subscribe to.')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand.setName('unsubscribe')
        .setDescription('Unsubscribes to a distribution list.')
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
    let message = interaction.options.getString('message');


    //TODO: Use switch/case
    if (subcommand === 'create_distro') {
      subscriptions.addGameDistro(interaction, distro);
    } else if (subcommand === 'subscribe') {
      subscriptions.addUserSubscription(interaction, distro);
    } else if (subcommand === 'unsubscribe') {
      subscriptions.removeUserSubscription(interaction, distro);
    } else if (subcommand === 'list_distros') {
      subscriptions.listGameDistros(interaction);
    } else if (subcommand === 'ping') {
      subscriptions.pingGameDistro(interaction, distro, message);
    }
  },
};