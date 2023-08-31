const { Client, IntentsBitField } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');




const prefix = '*';

const fs = require('fs');

var results = {};
var rounds = 0;

var pics = [' '];
var rollDict = {};
var roll = require("./commands/roll.js").roll;
var reroll = require("./commands/roll.js").reroll;
var chipoff = require("./commands/roll.js").chipoff;
var tuto = require("./commands/tuto.js").tuto;


const client = new Client({
    intents: [
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('the Balance', { type: 'WATCHING' });
	pics[1] = client.emojis.cache.find(emoji => emoji.name === "r1");
	pics[2] = client.emojis.cache.find(emoji => emoji.name === "r2");
	pics[3] = client.emojis.cache.find(emoji => emoji.name === "r3");
	pics[4] = client.emojis.cache.find(emoji => emoji.name === "r4");
	pics[5] = client.emojis.cache.find(emoji => emoji.name === "r5");
	pics[6] = client.emojis.cache.find(emoji => emoji.name === "r6");
	pics[7] = client.emojis.cache.find(emoji => emoji.name === "r7");
	pics[8] = client.emojis.cache.find(emoji => emoji.name === "r8");
	pics[9] = client.emojis.cache.find(emoji => emoji.name === "r9");
	pics[0] = client.emojis.cache.find(emoji => emoji.name === "r0");
});


client.on('messageCreate', (message) => {
    var args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    // make sure there's someone in the voice channel
    if (!message.member.voice.channel) {
        if(command == 'r' || command == 'roll')
        { 
        var argn = Number(args);
        if(argn>0 && argn<21)
        {
        results = roll(argn, pics, results);
        rollDict[message.author.id] = results;
        message.reply(results.join(''));
        }
        else
        {
        message.reply('invalid input. Please enter a number between 1 and 20');
        }
        
        }
    
    
        if (command== 'reroll' || command== 'rr')
        {
        
        if(rollDict[message.author.id])
        {
        results = reroll(rollDict[message.author.id], pics, args, message);
        // send result as reply
        //message.channel.send(results.join(''));
        message.reply(results.join(''));
        rollDict[message.author.id] = results;
        }
        else
        {
        message.reply('no dice to reroll!');
        }
        
        }

        if (command== 'destroy' || command== 'd')
        {
        
        if(rollDict[message.author.id])
        {
        results = chipoff(rollDict[message.author.id], args, message);
        rollDict[message.author.id] = results;
        console.log(results);
        if (results.length>1)
        {message.reply(results.join(''));}
        else
        {message.reply('no dice left! You\'re screwed :)');}
        }
        else
        {
        message.reply('no dice to destroy!');
        }
        
        }

        if (command== 'myroll' || command== 'mr')
        {
            if(rollDict[message.author.id] && rollDict[message.author.id].length>1)
                {
                message.reply(rollDict[message.author.id].join(''));
                }
                else
                {
                message.reply('you don\'t have a roll!');
            }
        }

        if (command== 'update' || command== 'u')
        {
            rollDict[message.author.id] = args;
            message.reply('your dice pool has been updated!');
            message.send(rollDict[message.author.id].join(''));
        }


        if (command== 'tuto' || command== 'tutorial')
        {tuto(client, message, argn, pics);}

        if (command== 'nextr' || command== 'next' || command== 'n')
        {
        message.channel.send('***ROUND ' + rounds + '***');
        rounds++;
            message.delete();
        }

        if (command== 'resetr' )
        {
        message.channel.send('*Round counter reset*');
        rounds = 0;
            message.delete();
        }
    }
    else
    {
        const player = createAudioPlayer();
        const small_roll = createAudioResource('./misc/lessroll.mp3');
        const big_roll = createAudioResource('./misc/rolling.mp3');
        const connection = joinVoiceChannel(
            {
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
    }
    
});

client.login('Nzg5NTkzNDIwMTg4MzUyNTE1.GjG2TS.hUpksTOcgBmy_sO3SkGgBGkzy9Ju-NAcLwimGA');