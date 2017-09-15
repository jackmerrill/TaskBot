const express = require('express');
const app = express();

var v=null;

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});
// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
 http.get('http://taskbotdiscord.herokuapp.com');
}, 900000);

const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === ';ping') {
    msg.reply('Pong!')
  }
  if (msg.content === ';invite') {
    msg.author.send('Want to invite me to your server? Here is the link! https://discordapp.com/oauth2/authorize?client_id=335591769414696961&scope=bot&permissions=2146958591')
  }
  if (msg.content === ';help') {
    // msg.author.sendMessage("**Commands for TaskBot:**\n;ping - replies with 'Pong!'.\n;help - Direct Messages you this menu.")
    const embed = new Discord.RichEmbed()
  .setTitle('Commands for TaskBot')
  .setAuthor('TaskBot Team', 'https://taskbotdiscord.herokuapp.com')
  /*
   * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription('Here are where you can find the commands for TaskBot!')
  .setFooter('Thanks for using TaskBot!', '')
  // .setImage('https://goo.gl/D3uKk2')
  .setThumbnail('https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/103/white-heavy-check-mark_2705.png')
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL('')
  .addField('**Task Commands**', ';new - Makes a new TaskList. Should be a channel.\n ;add - Adds a Task to the TaskList.\n ;complete <task> - Selects the specified task as completed.')
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField('Admin Commands', ';kick - Kicks the mentioned user from the server.\n', true)
  /*
   * Blank field, useful to create some space.
   */
  .addField('\u200b', '\u200b', true)
  .addField('Fun/Misc Commands', ';play <youtube-link> - Plays a video from YouTube into a voice channel. You must be in a voice channel.\n ;stop - Stops all audio in the voice channel.', true);

/*
 *  You can only use the shorthand "{ embed }" when your embed variable is also called embed.
 *  If it's not called embed, use "{ embed: variableName }" instead.
 */
msg.author.send({ embed });
  }

    if (msg.content.substring(0,5) === ";play") {
		if(v){
			msg.reply("Already playing a song!");
		}
		else{
			if(msg.content.substring(5,6)!=' ')
				return;
		  const args = msg.content.substring(6).trim().split(/ +/g);
		  const command = args.shift().toLowerCase();
		  let audio = args[0];
		  const voiceChannel = msg.member.voiceChannel;
		  if (voiceChannel)
			voiceChannel.join()
				.then(connnection => {
				  const stream = ytdl(audio, { filter: "audioonly" });
				  const dispatcher = connnection.playStream(stream);
				  v=voiceChannel;
				});
		  else
			msg.reply("Please be in a voice channel first!");
		}
    }
    if (msg.content === ";stop"){
		if(v){
			v.leave();
			v=null;
		}
		else
			msg.reply("Not in a voice channel!");
	}
    if (msg.content === ";kick") {
      let member = msg.mentions.members.first();
      member.kick();
    }
    if (msg.content.substring(0,4) === ";new") {
		var name="TaskList";
		if(msg.content.length>5){
			if(msg.content.substring(4,5)==' ')
				name=msg.content.substring(5);
			else return;
		}
      server = msg.guild;
      if(!(!server.available || server.channels.findAll("name",name).length>0)){
		server.createChannel(name, "text").then(channel => channel.send("Test message")).catch(console.error);
	}
    }
    if (msg.content.substring(0,7) === ";remove") {
		var name="TaskList";
		if(msg.content.substring(7,8)==' ')
			name=msg.content.substring(8);
		else return;
      server = msg.guild;
      if(server.available && server.channels.findAll("name",name).length!=0){
		server.channels.findAll(name, "text")[0].delete("Removal requested").then("Removed channel "+name).catch(console.error);
	}
}
  });
client.login('MzM1NTkxNzY5NDE0Njk2OTYx.DI5EjA.NjqKmok7Z0N2KdS-1CmwOxCfToY');
