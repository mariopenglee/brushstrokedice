const { Random } = require('random-js');
const random = new Random();

function rolld10(args, picsd10) {
    let resultsd10 = [' '];
    let nums = [];

    // generate random numbers
    for(let i = 0; i < args; i++) {
        nums[i] = random.integer(0, 9);
    }

    // sort the numbers for readability
    nums.sort((a, b) => a - b);

    // add corresponding pictures
    for(let i = 0; i < args; i++) {
        resultsd10.push(`${picsd10[nums[i]]}`);
    }
    return resultsd10;
}

function rolld6(args, picsd6) {
    let resultsd6 = [' '];
    let nums = [];

    // generate random numbers
    for(let i = 0; i < args; i++) {
        nums[i] = random.integer(0, 5);
    }

    // sort the numbers for readability
    nums.sort((a, b) => a - b);

    // add corresponding pictures
    for(let i = 0; i < args; i++) {
        resultsd6.push(`${picsd6[nums[i]]}`);
    }
    return resultsd6;
}

function reroll(results, pics, args, message) {
    let counter = 0;
    if (args.length === 1) args = args[0].split('');
    for (let i = 0; i < args.length; i++) {
        let auxnum = args[i];
        if (auxnum == 0) { auxnum = 10; }
        if (auxnum > results.length - 1) { ; }
        else {
            results[auxnum] = pics[random.integer(0, 9)];
            counter++;
        }
    }
    message.channel.send(counter + ' rerolls!');
    return results;
}

function chipoff(results, args, message) {
    let counter = 0;
    if (args.length === 1) args = args[0].split('');
    for (let i = 0; i < args.length; i++) {
        let auxnum = args[i];
        if (auxnum == 0) { auxnum = 10; }
        if (auxnum > results.length - 1) { ; }
        else {
            results[auxnum] = 'd';
            counter++;
        }
    }
    message.channel.send(counter + ' dice destroyed!');
    results = results.filter(el => el != 'd');
    return results;
}

module.exports = { 
    rolld10: rolld10,
    rolld6: rolld6,
    reroll: reroll,
    chipoff: chipoff,
};
