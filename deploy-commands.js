require("dotenv").config();
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const clientId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

//Use this for global commands.
rest.put(Routes.applicationCommands(clientId), { body: commands })
  .then(data => console.log(`Successfully registered ${data.length} application commands`))
  .catch(console.error);

//Use this for Guild Specific commands.
/*rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(data => console.log(`Successfully registered ${data.length} application commands`))
  .catch(console.error);*/