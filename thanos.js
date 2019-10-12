const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const client  = new Discord.Client();

/* Start her up */
client.on('ready', () => {
    console.log('Ready...');
});

/* Basically handles parsing */
client.on('message', message => {
    if (message.content === `${prefix}snap`) {
	try {
	    const VCmembers       = message.member.voiceChannel.members;
	    const sizeBalanced    = Math.floor(Array.from(VCmembers).length / 2);
	    const balancedMembers = VCmembers.random(sizeBalanced);
	
	    message.channel.send("Equally balanced, as all things should be.");
	    for (var i = 0; i < sizeBalanced; ++i)
		balancedMembers[i].setVoiceChannel(null);
	}
	catch (e) {
	    if (e instanceof RangeError)
		console.log("Too few members in voice channel.");
	    if (e instanceof TypeError)
		console.log("Property 'members' undefined, perhaps no one is in channel.");
	}
    }
});



client.login(token);
