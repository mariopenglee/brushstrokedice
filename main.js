const { Client, IntentsBitField } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const http = require('http'); // Require the http module
require('dotenv').config();

const prefix = '*';

const fs = require('fs');

var results = [' '];
var rounds = 0;

var pics = [' '];
var rollDict = {};
var { roll, reroll, chipoff } = require("./commands/roll.js");
var { tuto } = require("./commands/tuto.js");

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

    pics[1] = client.emojis.cache.find(emoji => emoji.name === "red");
    pics[2] = client.emojis.cache.find(emoji => emoji.name === "black");
    pics[3] = client.emojis.cache.find(emoji => emoji.name === "black");
    pics[4] = client.emojis.cache.find(emoji => emoji.name === "black");
    pics[5] = client.emojis.cache.find(emoji => emoji.name === "black");
    pics[6] = client.emojis.cache.find(emoji => emoji.name === "white");
    pics[7] = client.emojis.cache.find(emoji => emoji.name === "white");
    pics[8] = client.emojis.cache.find(emoji => emoji.name === "white");
    pics[9] = client.emojis.cache.find(emoji => emoji.name === "white");
    pics[0] = client.emojis.cache.find(emoji => emoji.name === "jade");

    // pics[1] = client.emojis.cache.find(emoji => emoji.name === "w1");
    // pics[2] = client.emojis.cache.find(emoji => emoji.name === "w2");
    // pics[3] = client.emojis.cache.find(emoji => emoji.name === "w3");
    // pics[4] = client.emojis.cache.find(emoji => emoji.name === "w4");
    // pics[5] = client.emojis.cache.find(emoji => emoji.name === "w5");
    // pics[6] = client.emojis.cache.find(emoji => emoji.name === "w6");

});

client.on('messageCreate', (message) => {
    var args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Make sure there's someone in the voice channel
    if (!message.member.voice.channel) {
        if (command == 'r' || command == 'roll') { 
            console.log(args);
            if (!args.length) {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            }

            var argn = Number(args);
            if (argn > 0 && argn < 21) {
                results = roll(argn, pics, results);
                rollDict[message.author.id] = results;
                message.reply(results.join(''));
            } else {
                message.reply('invalid input. Please enter a number between 1 and 20');
            }

        }
        if (command == 'reroll' || command == 'rr') {
            if (rollDict[message.author.id]) {
                results = reroll(rollDict[message.author.id], pics, args, message);
                message.reply(results.join(''));
                rollDict[message.author.id] = results;
            } else {
                message.reply('no dice to reroll!');
            }
        }

        if (command == 'destroy' || command == 'd') {
            if (rollDict[message.author.id]) {
                results = chipoff(rollDict[message.author.id], args, message);
                rollDict[message.author.id] = results;
                console.log(results);
                if (results.length > 1) {
                    message.reply(results.join(''));
                } else {
                    message.reply('no dice left! You\'re screwed :)');
                }
            } else {
                message.reply('no dice to destroy!');
            }
        }

        if (command == 'myroll' || command == 'mr') {
            if (rollDict[message.author.id] && rollDict[message.author.id].length > 1) {
                message.reply(rollDict[message.author.id].join(''));
            } else {
                message.reply('you don\'t have a roll!');
            }
        }

        if (command == 'update' || command == 'u') {
            rollDict[message.author.id] = args;
            message.reply('your dice pool has been updated!');
            message.send(rollDict[message.author.id].join(''));
        }

        if (command == 'tuto' || command == 'tutorial') {
            tuto(client, message, argn, pics);
        }

        if (command == 'nextr' || command == 'next' || command == 'n') {
            message.channel.send('***ROUND ' + rounds + '***');
            rounds++;
            message.delete();
        }

        if (command == 'resetr') {
            message.channel.send('*Round counter reset*');
            rounds = 0;
            message.delete();
        }
    } 
    else {
        console.log('in voice channel');
        const player = createAudioPlayer();
        const small_roll = createAudioResource('./misc/lessroll.mp3');
        const big_roll = createAudioResource('./misc/rolling.mp3');
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        
        if (command == 'r' || command == 'roll') { 
            var argn = Number(args);
            if (argn > 0 && argn < 21) {
                results = roll(argn, pics, results);
                rollDict[message.author.id] = results;

                
                if (argn < 6) {
                    player.play(small_roll);
                }
                else {
                    player.play(big_roll);
                }
                connection.subscribe(player);

                message.reply(results.join(''));
            } else {
                message.reply('invalid input. Please enter a number between 1 and 20');
            }
        }
    }
});

// HTTP server to keep bot alive
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running\n');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});

client.login(process.env.TOKEN);
