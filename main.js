const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === ';ping') {
    msg.reply('Pong!');
  }
  if (msg.content === ';help') {
    // msg.author.sendMessage("**Commands for TaskBot:**\n;ping - replies with 'Pong!'.\n;help - Direct Messages you this menu.")
    const embed = new Discord.RichEmbed()
  .setTitle('Commands for TaskBot')
  .setAuthor('TaskBot Team', 'https://example.com')
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
  .addField('Inline Field', 'Hmm 🤔', true)
  /*
   * Blank field, useful to create some space.
   */
  .addField('\u200b', '\u200b', true)
  .addField('Second (3rd place) Inline Field', 'I\'m in the ZOONE', true);

/*
 *  You can only use the shorthand "{ embed }" when your embed variable is also called embed.
 *  If it's not called embed, use "{ embed: variableName }" instead.
 */
msg.author.sendMessage({ embed });
  }
  client.on('message', message => {
    if (message.content.startsWith(';play')) {
      const voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
      voiceChannel.join()
        .then(connnection => {
          const stream = ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ", { filter: 'audioonly' });
          const dispatcher = connnection.playStream(stream);
          dispatcher.on('end', () => voiceChannel.leave());
        });
    }
  });
});

client.login('MzM1NTkxNzY5NDE0Njk2OTYx.DI5EjA.NjqKmok7Z0N2KdS-1CmwOxCfToY');
