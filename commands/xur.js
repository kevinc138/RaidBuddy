const { SlashCommandBuilder } = require('discord.js');
const url = 'https://whereisxur.com/';
const rp = require('request-promise');
const cheerio = require('cheerio');


//TODO: Remove request-promise and move to a different HTTP client.
//request-promise is deprecated.
module.exports = {
    data: new SlashCommandBuilder()
            .setName('xur')
            .setDescription('Finds the location of xur from whereisxur.com'),
    async execute(interaction) {
        rp(url)
        .then(function(html) {
          //success!
          $ = cheerio.load(html);
          interaction.reply($('.title').text());
        })
        .catch(function(err) {
          //handle error
          console.log(err);
          interaction.reply('We had an issue finding xur.');
        });
    },
};