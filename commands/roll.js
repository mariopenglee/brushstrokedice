module.exports = {
	name: 'roll',
	description: "this is a ping command",
	execute(client, message, args)
	{

	strarg = JSON.stringify(args);
	
	const m1 = client.emojis.cache.find(emoji => emoji.name === "m1");
	const m2 = client.emojis.cache.find(emoji => emoji.name === "m2");
	const m3 = client.emojis.cache.find(emoji => emoji.name === "m3");
	const m4 = client.emojis.cache.find(emoji => emoji.name === "m4");
	const m5 = client.emojis.cache.find(emoji => emoji.name === "m5");
	const m6 = client.emojis.cache.find(emoji => emoji.name === "m6");
	const m7 = client.emojis.cache.find(emoji => emoji.name === "m7");
	const m8 = client.emojis.cache.find(emoji => emoji.name === "m8");
	const m9 = client.emojis.cache.find(emoji => emoji.name === "m9");
	const m0 = client.emojis.cache.find(emoji => emoji.name === "m0");

	const white = client.emojis.cache.find(emoji => emoji.name === "white");
	const black = client.emojis.cache.find(emoji => emoji.name === "black");
	const rose = client.emojis.cache.find(emoji => emoji.name === "rose");
	const jade = client.emojis.cache.find(emoji => emoji.name === "jade");


	let results = [' '];
	var i;



		for(i = 0; i< args; i++)
	{
	
	
	var num = Math.floor(Math.random() * 10) + 1;
	switch(num)
	{
	case 1:{results.push(`${m1}`);	break;}
	case 2:{results.push(`${m2}`);	break;}
	case 3:{results.push(`${m3}`);	break;}
	case 4:{results.push(`${m4}`); break;}
	case 5:{results.push(`${m5}`); break;}
	case 6:{results.push(`${m6}`); break;}
	case 7:{results.push(`${m7}`); break;}
	case 8:{results.push(`${m8}`); break;}
	case 9:{results.push(`${m9}`); break;}
	case 10:{results.push(`${m0}`); break;}
	}
	
	
	}












	message.channel.send(results.join(''));
	message.channel.send(`${message.author}`);

}
}