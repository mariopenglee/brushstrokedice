const { Client, IntentsBitField } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const http = require('http'); // Require the http module
require('dotenv').config();

const prefix = '*';

const fs = require('fs');

var results = [' '];
var rounds = 0;

var pics = [' '];
var diceEmojis = {};
var rollDict = {};
var { roll, reroll, chipoff } = require("./commands/roll.js");
var { rollPool } = require("./commands/rollpool.js");
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

    pics[1] = client.emojis.cache.find(emoji => emoji.name === "n1");
    pics[2] = client.emojis.cache.find(emoji => emoji.name === "n2");
    pics[3] = client.emojis.cache.find(emoji => emoji.name === "n3");
    pics[4] = client.emojis.cache.find(emoji => emoji.name === "n4");
    pics[5] = client.emojis.cache.find(emoji => emoji.name === "n5");
    pics[6] = client.emojis.cache.find(emoji => emoji.name === "n6");
    pics[7] = client.emojis.cache.find(emoji => emoji.name === "n7");
    pics[8] = client.emojis.cache.find(emoji => emoji.name === "n8");
    pics[9] = client.emojis.cache.find(emoji => emoji.name === "n9");
    pics[0] = client.emojis.cache.find(emoji => emoji.name === "n0");

    // pics[1] = client.emojis.cache.find(emoji => emoji.name === "w1");
    // pics[2] = client.emojis.cache.find(emoji => emoji.name === "w2");
    // pics[3] = client.emojis.cache.find(emoji => emoji.name === "w3");
    // pics[4] = client.emojis.cache.find(emoji => emoji.name === "w4");
    // pics[5] = client.emojis.cache.find(emoji => emoji.name === "w5");
    // pics[6] = client.emojis.cache.find(emoji => emoji.name === "w6");

    diceEmojis['blank']       = client.emojis.cache.find(e => e.name === 'blank');
    diceEmojis['cut']         = client.emojis.cache.find(e => e.name === 'cut');
    diceEmojis['2cut']        = client.emojis.cache.find(e => e.name === '2cut');
    diceEmojis['3cut']        = client.emojis.cache.find(e => e.name === '3cut');
    diceEmojis['blossom']     = client.emojis.cache.find(e => e.name === 'blossom');
    diceEmojis['2blossom']    = client.emojis.cache.find(e => e.name === '2blossom');
    diceEmojis['blossom_cut'] = client.emojis.cache.find(e => e.name === 'blossom_cut');

});

client.on('messageCreate', (message) => {
    var args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Make sure there's someone in the voice channel
    if (!message.member.voice.channel) {
        if (command == 'roll') {
            if (!args.length) {
                return message.channel.send(`Usage: \`*roll 2w 1m 1f 2r 1i\`\nDice types: **w**ay, **m**astery, **f**ortune, **r**isk, **i**njury`);
            }
            const poolResult = rollPool(args, diceEmojis);
            if (!poolResult) {
                return message.reply('invalid dice pool. Example: `*roll 2w 1m 1r`');
            }
            message.reply(poolResult);
        }

        if (command == 'r' || command == 'legacyroll') {
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
        
        if (command == 'roll') {
            if (!args.length) {
                return message.channel.send(`Usage: \`*roll 2w 1m 1f 2r 1i\`\nDice types: **w**ay, **m**astery, **f**ortune, **r**isk, **i**njury`);
            }
            const poolResult = rollPool(args, diceEmojis);
            if (!poolResult) {
                return message.reply('invalid dice pool. Example: `*roll 2w 1m 1r`');
            }
            const totalDice = args.reduce((sum, a) => {
                const m = a.match(/^[wmfri]:(\d+)$/i);
                return sum + (m ? parseInt(m[1]) : 0);
            }, 0);
            if (totalDice < 6) { player.play(small_roll); } else { player.play(big_roll); }
            connection.subscribe(player);
            message.reply(poolResult);
        }

        if (command == 'r' || command == 'legacyroll') {
            var argn = Number(args);
            if (argn > 0 && argn < 21) {
                results = roll(argn, pics, results);
                rollDict[message.author.id] = results;

                if (argn < 6) {
                    player.play(small_roll);
                } else {
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
