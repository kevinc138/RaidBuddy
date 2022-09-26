const RPSGame = require('../command_models/RPSGame');
const path = require('node:path');
const { MessageAttachment, MessageEmbed, EmbedBuilder, AttachmentBuilder } = require('discord.js');

//This is volatile and will reset when the bot is restarted.
const activeGames = new Map(); //Key: Channel, Value: RPSGame {Player : Roll}

const RPS = {
    ROCK: {
        value: 0,
        file: 'commands/command_assets/TheRock.jpeg',
        fileName: 'TheRock.jpeg',
        text: "Rock!"
    },
    PAPER: {
        value: 1,
        file: 'commands/command_assets/DunderMifflin.jpg',
        fileName: 'DunderMifflin.jpg',
        text: "Paper!"
    },
    SCISSORS: {
        value: 2,
        file: 'commands/command_assets/EdwardScissorHands.jpg',
        fileName: "EdwardScissorHands.jpg",
        text: 'Scissors!'
    }
  }
Object.freeze(RPS);

//Entry point for RPS matches
async function doRps(interaction) {
    if (activeGames.has(interaction.channelId)) {
      determineRpsWinner(interaction, await rpsRoll(interaction));
    } else {
      activeGames.set(interaction.channelId, new RPSGame(interaction.user.username, await rpsRoll(interaction)));
    }
  }

async function rpsRoll(interaction) {
    var rand = Math.floor(Math.random() * 3);

    if (rand == RPS.ROCK.value) {
        //const exampleEmbed = new EmbedBuilder();
        //exampleEmbed.setTitle("Rock!");
      console.log(path.join(__dirname, RPS.ROCK.file));
      await constructMessageAndReply(interaction, RPS.ROCK)
      //await interaction.reply({ data: 'Rock', files: [path.join(__dirname, RPS.ROCK.file)] });
    } else if (rand == RPS.PAPER.value) {
      //await interaction.reply('Paper', { files: [path.join(__dirname, RPS.PAPER.file)] });
      await constructMessageAndReply(interaction, RPS.PAPER);
    } else if (rand == RPS.SCISSORS.value) {
      //await interaction.reply('Scissors', { files: [path.join(__dirname, RPS.SCISSORS.file)] });
      await constructMessageAndReply(interaction, RPS.SCISSORS);
    }
    return rand;
  }

  async function constructMessageAndReply(interaction, rpsEnum) {
    const attachment = new AttachmentBuilder(rpsEnum.file);

    const embed = new EmbedBuilder().setImage("attachment://" + rpsEnum.fileName).setTitle(rpsEnum.text);

    await interaction.reply({embeds: [embed], files: [attachment]})
  }


  /**
 * PlayerOne - the player that initiated the game.
 * PlayerTwo - the challenger that plays second.
 * 
 * Looks up the active game in the activeGames map.
 * Deletes the game (channelId) from the activeGames map.
 * 
 * TODO: Implement record storing. The previous format was using a volatile storage mechanism. Switch to mongodb.
 */
async function determineRpsWinner(interaction, secondRoll) {

    let activeRpsGame = activeGames.get(interaction.channelId);
    let activeRpsRoll = activeRpsGame.roll;
    let playerOne = activeRpsGame.username;
  
    let playerTwo = interaction.user.username;
  
    //Tie
    if (activeRpsRoll == secondRoll) {
      await interaction.followUp("It's a tie!");
      //rpsIncrementTies(interaction, playerOne, playerTwo);
    }
  
    //Rock vs Scissors
    else if (activeRpsRoll == RPS.ROCK.value && secondRoll == RPS.SCISSORS.value) {
      await interaction.followUp(playerOne + " wins! Rock vs Scissors!");
      //rpsIncrementRecords(interaction, playerOne, playerTwo, true);
    }
    else if (activeRpsRoll == RPS.SCISSORS.value && secondRoll == RPS.ROCK.value) {
      await interaction.followUp(playerTwo + " wins! Scissors vs Rock!");
      //rpsIncrementRecords(interaction, playerTwo, playerOne, false);
    }
  
    //Scissors vs Paper
    else if (activeRpsRoll == RPS.SCISSORS.value && secondRoll == RPS.PAPER.value) {
      await interaction.followUp(playerOne + " wins! Scissors vs Paper!");
      //rpsIncrementRecords(interaction, playerOne, playerTwo, true);
    }
    else if (activeRpsRoll == RPS.PAPER.value && secondRoll == RPS.SCISSORS.value) {
      await interaction.followUp(playerTwo + " wins! Paper vs Scissors!");
      //rpsIncrementRecords(interaction, playerTwo, playerOne, false);
    }
  
    //Paper vs Rock
    else if (activeRpsRoll == RPS.PAPER.value && secondRoll == RPS.ROCK.value) {
      await interaction.followUp(playerOne + " wins! Paper vs Rock!");
      //rpsIncrementRecords(interaction, playerOne, playerTwo, true);
    }
    else if (activeRpsRoll == RPS.ROCK.value && secondRoll == RPS.PAPER.value) {
      await interaction.followUp(playerTwo + " wins! Rock vs Paper!");
      //rpsIncrementRecords(interaction, playerTwo, playerOne, false);
    }
  
    activeGames.delete(interaction.channelId);
  }

module.exports.doRps = doRps;