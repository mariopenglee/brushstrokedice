const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '/';

const fs = require('fs');

var results = {};
var rounds = 0;


var roll = require("./commands/roll.js").roll;
var reroll = require("./commands/roll.js").reroll;
var tuto = require("./commands/tuto.js").tuto;

client.once('ready', () => {console.log('hello world');});






client.on('message', message =>{


	client.user.setActivity('the Balance', { type: 'WATCHING' });
	let pics = [' '];
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




if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	var vchannel = message.member.voice.channel;
	

	var args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();




	if(command == 'r' || command == 'roll')
	{ 

	
	var argn = Number(args);
	


	if(argn>0 && argn<11)
	{
	results = roll(argn, pics, vchannel, results);
	message.channel.send(results.join(''));

	message.channel.send(`${message.author}`);
	}
	else
	{
	message.channel.send('invalid input');
	message.delete();
	}
	
	}


	if (command== 'reroll' || command== 'art' || command== 'rr')
	{
	
	if(results.length)
	{
	results = reroll(results, pics, args, message, vchannel);
	message.channel.send(results.join(''));
	}
	else
	{
	message.channel.send('no roll to reroll!');
	message.delete();
	}
	
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
});










client.login('Nzg5NTkzNDIwMTg4MzUyNTE1.X90ULQ.zbwa2uE6Zn6v_MahDv45F-I_YZc');