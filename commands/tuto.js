function tuto(client, message, args, pics)
	{


	const white = client.emojis.cache.find(emoji => emoji.name === "white");
	const black = client.emojis.cache.find(emoji => emoji.name === "black");
	const rose = client.emojis.cache.find(emoji => emoji.name === "rose");
	const jade = client.emojis.cache.find(emoji => emoji.name === "jade");

	let lista = [' '];
	lista.push(`${pics[1]}`);
	lista.push(`${pics[2]}`);
	lista.push(`${pics[3]}`);
	lista.push(`${pics[4]}`);
	lista.push(`${pics[5]}`);
	lista.push(`${pics[6]}`);
	lista.push(`${pics[7]}`);
	lista.push(`${pics[8]}`);
	lista.push(`${pics[9]}`);
	lista.push(`${pics[0]}`);

	let actualtext = [' '];

	message.channel.send(lista.join(''));

	

	actualtext.push('Brushstroke Dice are color-coded d10s, each color representing a result:');
	actualtext.push(`${black}`+'Black Jade counts as nothing, ignore it when it comes up.');
	actualtext.push(`${rose}`+'Rose Jade counts as a blossom, **or 1 success by taking 1 involvement**.');
	actualtext.push(`${white}`+'White Jade counts as 1 success, **or 2 successes by taking 1 involvement**.');
	actualtext.push(`${jade}`+'Pure Jade counts as 1 success and removes 1 involvement, **or 2 successes if no involvement**.');


	message.channel.send(actualtext);







}

module.exports = { 
tuto: tuto,
 


};