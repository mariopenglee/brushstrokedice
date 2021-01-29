const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '/';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
const command = require(`./commands/${file}`);
client.commands.set(command.name, command);

}


client.once('ready', () => {console.log('hello world');});

client.on('message', message =>{
if(!message.content.startsWith(prefix) || message.author.bot) return;
	var vchannel = message.member.voice.channel;
	

	var args = message.content.slice(prefix.length).split(/ +/)
	const command = args.shift().toLowerCase();




	if(command == 'r')
	{ 

	
	var argn = Number(args);
	
	if (argn<11)
	{	

	if(argn>0)
	{
	client.commands.get('roll').execute(client, message, argn, vchannel);
	

	}
	else
	{
	message.delete();
	
	}
	
	}
	else
	{
	message.delete();
	}
	
	
	}
	else
	{
	
	;
	
	}

	if (command== 'tuto' || command== 'tutorial')
	{
	
	client.commands.get('tuto').execute(client, message, argn);
	}


});










client.login('Nzg5NTkzNDIwMTg4MzUyNTE1.X90ULQ.zbwa2uE6Zn6v_MahDv45F-I_YZc');