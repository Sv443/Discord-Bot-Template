require('dotenv').config()
const commando = require('discord.js-commando');
const Discord = require('discord.js');

//Set Prefix
const bot = new commando.CommandoClient({ fetchAllMembers: true, commandPrefix: '!', unknownCommandResponse: false });

//Console Colors I Use A Lot
let close="\x1b[0m",black="\x1b[30m",red="\x1b[31m",green="\x1b[32m",yellow="\x1b[33m",blue="\x1b[34m",purple="\x1b[35m",cyan="\x1b[36m",white="\x1b[37m";

//Register Commands
bot.registry.registerGroup('admin', 'Admin')
bot.registry.registerGroup('public', 'Public')
.registerCommandsIn(__dirname + "/commands");

//Login
bot.login(process.env.TOKEN);

//When Bot Starts
bot.on('ready', () => {
    let statuses = ['Coding...', 'Debugging...', 'Working...'];
    setInterval(function() {
        let status = statuses[Math.floor(Math.random()*statuses.length)];
        bot.user.setPresence({ game: { name: status }, status: 'streaming'});
        bot.user.setPresence({ activity: { name: status }, status: 'streaming'});
    }, 7000)
    console.log(`Going Live In ${green + bot.guilds.cache.size + close} Servers | With ${green + bot.users.cache.size + close} Total Users`)
});


//Download nodejs: https://nodejs.org/en/download/