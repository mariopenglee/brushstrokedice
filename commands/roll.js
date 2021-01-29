module.exports = {
	name: 'roll',
	description: "this is a ping command",
	execute(client, message, args, vchannel)
	{

	strarg = JSON.stringify(args);
	
	const r1 = client.emojis.cache.find(emoji => emoji.name === "r1");
	const r2 = client.emojis.cache.find(emoji => emoji.name === "r2");
	const r3 = client.emojis.cache.find(emoji => emoji.name === "r3");
	const r4 = client.emojis.cache.find(emoji => emoji.name === "r4");
	const r5 = client.emojis.cache.find(emoji => emoji.name === "r5");
	const r6 = client.emojis.cache.find(emoji => emoji.name === "r6");
	const r7 = client.emojis.cache.find(emoji => emoji.name === "r7");
	const r8 = client.emojis.cache.find(emoji => emoji.name === "r8");
	const r9 = client.emojis.cache.find(emoji => emoji.name === "r9");
	const r0 = client.emojis.cache.find(emoji => emoji.name === "r0");

	const white = client.emojis.cache.find(emoji => emoji.name === "white");
	const black = client.emojis.cache.find(emoji => emoji.name === "black");
	const rose = client.emojis.cache.find(emoji => emoji.name === "rose");
	const jade = client.emojis.cache.find(emoji => emoji.name === "jade");


	let results = [' '];
	var i;

	
	vchannel.join().then(connection =>{

	if(args>4)
	{
	const dispatcher = connection.play('./misc/rolling.mp3');
	}
	else
	{
	const dispatcher = connection.play('./misc/lessroll.mp3');
	}

	
	}).catch(err => console.log(err));
	

		for(i = 0; i< args; i++)
	{
	
	
	var num = Math.floor(Math.random() * 10) + 1;
	switch(num)
	{
	case 1:{results.push(`${r1}`);	break;}
	case 2:{results.push(`${r2}`);	break;}
	case 3:{results.push(`${r3}`);	break;}
	case 4:{results.push(`${r4}`); break;}
	case 5:{results.push(`${r5}`); break;}
	case 6:{results.push(`${r6}`); break;}
	case 7:{results.push(`${r7}`); break;}
	case 8:{results.push(`${r8}`); break;}
	case 9:{results.push(`${r9}`); break;}
	case 10:{results.push(`${r0}`); break;}
	}
	
	
	}












	message.channel.send(results.join(''));
	message.channel.send(`${message.author}`);

}
}