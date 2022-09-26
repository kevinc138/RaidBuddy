const { SlashCommandBuilder } = require('discord.js');
const subscriptions = require('./command_handlers/subscriptionHandler')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Pings a game distro')
            .addStringOption(option => 
                option.setName('distro')
                .setDescription('The distro to ping')
                .setRequired(true)),
    async execute(interaction) {

        console.log(interaction);
        subscriptions.pingGameDistro(interaction, interaction.options.getString("distro"));
        //await interaction.reply('To be implemented.');
    },
};