function tuto(client, message, args, pics)
	{


	const white = client.emojis.cache.find(emoji => emoji.name === "white");
	const black = client.emojis.cache.find(emoji => emoji.name === "black");
	const rose = client.emojis.cache.find(emoji => emoji.name === "rose");
	const jade = client.emojis.cache.find(emoji => emoji.name === "jade");
	const red = client.emojis.cache.find(emoji => emoji.name === "red");

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

	

	actualtext.push('Brushstroke Dice are color-coded d10s, each color representing a result');
	actualtext.push(`${red}`+'Blood Jade counts as nothing. **if 10 (max) involvement, counts as 2 hits.**');
	actualtext.push(`${black}`+'Black Jade counts as 1 hit with 1 involvement.');
	actualtext.push(`${rose}`+'Rose Jade counts as a blossom.');
	actualtext.push(`${white}`+'White Jade counts as 1 hit.');
	actualtext.push(`${jade}`+'Pure Jade removes 1 involvement. **if no involvement, counts as 2 hits.**');


	message.channel.send(actualtext);







}

module.exports = { 
tuto: tuto,
 


};