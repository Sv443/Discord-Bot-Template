const commando = require ('discord.js-commando');
const Discord = require("discord.js");

module.exports = class extends commando.Command {
    constructor(client) { 
        super(client,{
           name: 'ban',
           group: 'admin',
           memberName: 'ban',
           description: 'bans a user.'
        })
    }
    async run(message, args) 
    {
        //Checks if the user dm'ed the bot
        if(message.channel.type === 'dm') return message.channel.send('You can not use this command in a dm.');
        //Checks if the user has ADMINISTRATOR or BAN_MEMBERS perms
        if(!message.guild.me.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return;
        //Gets Targeted user with @user#0000
        let target = message.guild.member(message.mentions.users.first());
        if(!target) return message.channel.send("sorry, I couldn't find that user");
        //Checks if user @user#0000 is bannable aka if they dont have higher perms than you are arent in the server
        if(!target.bannable) return message.channel.send("I can't ban this user sorry!");
        //Gets message after @
        let reason = args.split(' ').slice(1).join(' ');
        //If there isn't a reason then set it to unspecified
        if(!reason) reason = "Unspecified";
        //Send the user a message before you ban them
        var userEmbed = new Discord.RichEmbed()
            .setDescription(`You were **Banned By: **${message.author}\n**Reason: **${reason}`)
            //This is color #e74c3c just without the #
            .setColor(0xe74c3c)
            //A footer timestamp
            .setTimestamp()
            //A footer image
            .setFooter("|", "https://cdn.discordapp.com/avatars/616647560488157270/fff85aad3215bafb838eedb56da2e2e3.png?size=512");
        //I beleive if the user has dms dissabled this will error but i dont like try/catch so i will fix later <3
        target.send(userEmbed).then(x=> {
            //This is what banns the user from the server
            message.guild.member(target).ban({days:7,reason:reason});
        });

        //Sends message that they were banned in the server
        var banEmbed = new Discord.RichEmbed()
            .setDescription(`**Banned By: **${message.author}\n**user: ${target}**\n**Reason: **${reason}`)
            .setColor(0xe74c3c)
            .setTimestamp()
            .setFooter("|", "https://cdn.discordapp.com/avatars/616647560488157270/fff85aad3215bafb838eedb56da2e2e3.png?size=512");
        let modlog = message.guild.channels.find(channel => channel.name === "mod-log");
        //Makes sure the channel "mod-log" exists to avoid errors if it does then it sends the ban msg there
        if(modlog) modlog.send(banEmbed);
    }
}

//You can do all this but in a new file named kick.js just rename everything in here that says ban and name it kick :) literally everything