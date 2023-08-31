
function roll(args, pics, results)
	{
	results = [' '];

	strarg = JSON.stringify(args);
	var i;
	// generate random numbers
	nums = [];
	for(i = 0; i< args; i++)
	{
	nums[i] = Math.floor(Math.random() * 10);
	}

	nums.sort(function(a, b){return a-b});
	
	for(i = 0; i< args; i++)
	{
	results.push(`${pics[nums[i]]}`);
	}
	return results;

}


function reroll(results, pics, args, message)
{
	var counter = 0;
	if (args.length === 1) args = args[0].split('');
	for (i = 0; i< args.length; i++)
	{
	var auxnum = args[i];
	if(auxnum==0){auxnum=10;}
	if(auxnum>results.length-1){;}
	else
	{
	results[auxnum] = pics[Math.floor(Math.random() * 10)];
	counter++;
	}
	
	}
	message.channel.send(counter + ' rerolls!');

	return results;
	
}


function chipoff(results, args, message)
{ // destroy dice
	var counter = 0;
	if (args.length === 1) args = args[0].split('');
	for (i = 0; i< args.length; i++)
	{
		var auxnum = args[i];
		if(auxnum==0){auxnum=10;}

		if(auxnum>results.length-1){} // do nothing
		else
		{
		results[auxnum] = 'd';
		counter++;
		}
	}
	message.channel.send(counter + ' dice destroyed!');
	results = results.filter(function (el) {
	  return el != 'd';
	});
	return results;
}











module.exports = { 
roll: roll,
reroll: reroll,
chipoff: chipoff,
 


};