require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const Discord = require('discord.js');
var mongoUtils = require('./mongo/mongoUtils')

const client = new Discord.Client({ intents: Discord.GatewayIntentBits.Guilds});
const TOKEN = process.env.TOKEN;

client.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

mongoUtils.connectToServer();

client.on('debug', console.log);

client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`)
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch(error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!', epehemeral: true
        });
    }
});

client.login(TOKEN).catch(console.error);