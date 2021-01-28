module.exports = {
	name: 'tuto',
	description : "tutorial",
	execute(client, message, args)
	{

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

	let lista = [' '];

	lista.push(`${r1}`);
	lista.push(`${r2}`);
	lista.push(`${r3}`);
	lista.push(`${r4}`);
	lista.push(`${r5}`);
	lista.push(`${r6}`);
	lista.push(`${r7}`);
	lista.push(`${r8}`);
	lista.push(`${r9}`);
	lista.push(`${r0}`);

	let actualtext = [' '];

	message.channel.send(lista.join(''));

	

	actualtext.push('Brushstroke Dice are color-coded d10s, each color representing a result:');
	actualtext.push(`${black}`+'Black Jade counts as nothing, ignore it when it comes up.');
	actualtext.push(`${rose}`+'Rose Jade counts as a blossom, **or 1 success by taking 1 involvement**.');
	actualtext.push(`${white}`+'White Jade counts as 1 success, **or 2 successes by taking 1 involvement**.');
	actualtext.push(`${jade}`+'Pure Jade counts as 1 success and removes 1 involvement, **or 2 successes if no involvement**.');


	message.channel.send(actualtext);







}
}