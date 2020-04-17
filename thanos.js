const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const client  = new Discord.Client();

// Start the bot
client.on('ready', () => {
    console.log('Ready...');
});

// Handles parsing
client.on('message', message => {
	// Command handler
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args    = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    const guild   = message.guild;

    if (command === 'snap') {
	if (!args.length) {
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
	} else {
	    let channel;
	    const channelName = args.join(" ");
	    if (!guild.available) return;

	    const guildArrays = guild.channels.array();
	    for (i in guildArrays) {
		if (guildArrays[i].name === channelName) {
		    channel = guildArrays[i];
		    break;
		}
	    }

	    try {
		const VCmembers       = channel.members;
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
    }
});

client.login(token);
