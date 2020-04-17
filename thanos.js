const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const client  = new Discord.Client();

// For snapping
function snap(message, channel) {
	try {
		if (channel == null)
			const VCMembers = message.member.voiceChannel.members;
		else
			const VCmembers = channel.members;

		const sizeBalanced    = Math.floor(Array.from(VCMembers).length / 2);
		const balancedMembers = VCMembers.random(sizeBalanced);

		message.channel.send("Equally balanced, as all things should be.");

		for (let i = 0; i < sizeBalanced; ++i)
			balanceMembers[i].setVoiceChannel(null);
	} catch(e) {
		// Not enough members
		if (e instanceof RangeError)
			console.log("Too few members in voice channel.");
		// No one is in the channel
		if (e instanceof TypeError)
		console.log("Property 'members' undefined, perhaps no one is in channel.");
	}
}

// Start the bot
client.on('ready', () => {
    console.log('Ready...');
});

// Handles parsing of commands
client.on('message', message => {
	// If prefix not found, or messager is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args    = message.content.slice(prefix.length).split(' '); // Get the pure argument
    const command = args.shift().toLowerCase(); // Easier parsing, this also changes args
    const guild   = message.guild; // Get the guild of the message

	switch(args) {
		case "snap": 
			if (!args.length)
				snap(message); // Snapping...
			else {
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

				// Snapping...
				snap(message, channel);
	    	}
	}
});

client.login(token);
