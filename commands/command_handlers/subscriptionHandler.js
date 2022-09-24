const mongoUtils = require('../../mongo/mongoUtils')
const GameChannel = require('../command_models/GameChannel');
const Subscriber = require('../command_models/Subscriber');


//Adds a game to the subscriptions collection.
async function addGameDistro(msg, game) {

  try {
    var db = mongoUtils.getDb();
    console.log(db);
    const collection = mongoUtils.getDb().collection("subscriptions");
    console.log(collection);
    const guildId = msg.guildId;
    const query =
    {
      name: game,
      guildId: guildId
    };
    const gameSub = await collection.findOne(query);

    if (gameSub == null) {

      let doc = new GameChannel(game, guildId, []);

      const g = await collection.insertOne(doc);

      msg.reply("Added " + game + " to the subscriptions collection.");
      return;
    }

    msg.reply("Game distro with name: " + game + " already exists.");

  } catch (err) {
    console.log(err);
  }

}

async function addUserSubscription(msg, game) {
  try {
    let collection = mongoUtils.getDb().collection("subscriptions");

    const query =
    {
      name: game,
      guildId: msg.guildId
    };

    const gameSub = await collection.findOne(query);

    if (gameSub != null) {
      let subscribers = gameSub.subscribers;
      const user = msg.user;
      let subscriberIds = subscribers.map(sub => sub.id);
      let subscriber = new Subscriber(user.id, user.username);

      if (!subscriberIds.includes(subscriber.id)) {
        subscribers.push(subscriber);

        const options = { upsert: true };

        const updateDoc = {
          $set: {
            subscribers: subscribers
          },
        };

        const result = await collection.updateOne(query, updateDoc, options);

        msg.reply("You have successfully subscribed to the distro for " + game);
      } else {
        msg.reply("You are already subscribed");
      }

    } else {
      msg.reply("This game distro doesn't exist. Please add it with !addGameDistro");
    }

  } catch (err) {
    console.log(err);
  }
}

async function removeUserSubscription(msg, game) {
  try {
    let collection = mongoUtils.getDb().collection("subscriptions");

    const query = {
      name: game,
      guildId: msg.guildId
    };

    const gameSub = await collection.findOne(query);

    let subscribers = gameSub.subscribers;
    const user = msg.user;
    let subscriberIds = subscribers.map(sub => sub.id);

    if (subscriberIds.includes(user.id)) {

      let newSubscribers = subscribers.filter(sub => sub.id != user.id);

      const options = { upsert: true };

      const updateDoc = {
        $set: {
          subscribers: newSubscribers
        },
      };

      const result = await collection.updateOne(query, updateDoc, options);

      msg.reply("You have successfully unsubscribed from the distro for " + game);
    } else {
      msg.reply("You are not subscribed to this distro");
    }

  } catch (err) {
    console.log(err);
  }
}

async function pingGameDistro(msg, game) {
  try {
    let collection = mongoUtils.getDb().collection("subscriptions");

    const query = {
      name: game,
      guildId: msg.guildId
    };

    const gameSub = await collection.findOne(query);

    if (gameSub == null) {
      msg.reply("That distro doesn't exist.");
      return;
    }
    let subscribers = gameSub.subscribers;

    let fullListString = "Distro ping for " + game + ": ";

    console.log(subscribers);

    for (let sub in subscribers) {
      fullListString += buildMentionString(subscribers[sub].id) + " ";
    }

    msg.reply(fullListString);

  } catch (err) {
    console.log(err);
  }
}

async function listGameDistros(interaction) {
    try {
        let collection = mongoUtils.getDb().collection("subscriptions");

        const query = {
          guildId: interaction.guildId
        };

        const gameSub = await collection.find(query);

        let sb = "";
        let distroCount = 0;

        await gameSub.forEach((distro) => {
            sb += distro.name + "\n";
            distroCount++;
        });

        if(distroCount === 0) {
            interaction.reply("There are no distros for this server.");
        } else {
            interaction.reply(sb);
        }


    } catch (err) {
        console.log(err);
    }
}



function buildMentionString(userId) {
  return "<@" + userId + ">";
}

module.exports.listGameDistros = listGameDistros;
module.exports.pingGameDistro = pingGameDistro;
module.exports.removeUserSubscription = removeUserSubscription;
module.exports.addUserSubscription = addUserSubscription;
module.exports.addGameDistro = addGameDistro;