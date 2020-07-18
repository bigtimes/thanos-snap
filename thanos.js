// Startup variables
const {prefix, token} = require('./config.json');
const Discord = require('discord.js');
const client  = new Discord.Client();

// For snapping
function snap(message, channel = null) 
{
    try 
    {
	let VCMembers;
	if (channel == null)
	    VCMembers = message.member.voice.channel.members;
	else
	    VCmembers = channel.members;
		
	const sizeBalanced    = Math.floor(Array.from(VCMembers).length / 2);
	const balancedMembers = VCMembers.random(sizeBalanced);

	let VoiceStates = new Array();
	for (let gm of balancedMembers.values()) {
	    VoiceStates.push(gm.voice);
	}

	message.channel.send("Equally balanced, as all things should be.");

	console.log(VoiceStates);
	for (let i = 0; i < sizeBalanced; ++i) {
	    VoiceStates[i].setChannel(null);
	}
    } catch(e) 
    {
        // Not enough members
	if (e instanceof RangeError)
	    console.log("Too few members in voice channel.");
	// No one is in the channel
	if (e instanceof TypeError)
	    console.log("Property 'members' undefined, perhaps no one is in channel.");
    }
}

// Start the bot
client.on('ready', () => 
{
    console.log('Ready...');
    console.log('Prefix:' + prefix);
});

// Handles parsing of commands
client.on('message', message => 
{
    // If prefix not found, or messager is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Get the pure argument
    const args    = message.content.slice(prefix.length).toLowerCase().split(" "); 
    // Get the guild of the message
    const guild   = message.guild; 

    switch(args[0]) {
    case "snap": 
	if (args.length < 2)
	   snap(message); // Snapping...
	else {
	    let channel = args[1];
	    if (!guild.available) return;
	
	    const channels = guild.channels.cache;
	    for (let i of guildArrays) {
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
