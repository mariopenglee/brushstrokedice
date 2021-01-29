

function roll(args, pics, vchannel, results)
	{
	results = [' '];


	

	rollsound(vchannel, args);
	strarg = JSON.stringify(args);
	var i;
	for(i = 0; i< args; i++)
	{
	results.push(`${pics[Math.floor(Math.random() * 10)]}`);
	}
	
	


	return results;

}


function reroll(results, pics, args, message, vchannel)
{
var auxnum2 = 0;
	if (args.length === 1) args = args[0].split('');
	for (i = 0; i< args.length; i++)
	{
	
	if(args[i]>results.length-1){auxnum2++;}
	else
	{
	var auxnum = args[i];
	if(auxnum==0){auxnum=10;}
	results[auxnum] = pics[Math.floor(Math.random() * 10)];
	}
	
	}
	rollsound(vchannel, args.length);
	message.channel.send(args.length-auxnum2 + ' rerolls!');

	return results;
	
}


function rollsound(vchannel, args)
{

	if(vchannel)
	{
			vchannel.join().then(connection =>{
			if(args>4){	const dispatcher = connection.play('./misc/rolling.mp3');}
			else{	const dispatcher = connection.play('./misc/lessroll.mp3');}}).catch(err => console.log(err));	
	}
	
}











module.exports = { 
roll: roll,
reroll: reroll,
 


};