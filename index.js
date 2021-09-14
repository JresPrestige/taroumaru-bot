require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", ] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.cache.get("875023097772781631");
  const role = member.guild.roles.cache.filter(r => r.name === "Member");
  if (!role) return;
  
  const welcomeEmbed = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle(`Selamat Datang ${member.user.tag} di ULALA, Enjoy your Stay!`)
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription('Tolong Dibaca Rules Server ini untuk keyamanan bersama!')
    .setTimestamp()
    .setImage('https://media.discordapp.net/attachments/791659091470188590/830668375070998558/Hu_Tao.gif');

  channel.send({ embeds: [welcomeEmbed] });
  member.roles.add(role);
});

client.on('guildMemberRemove', async member => {
  const channel = member.guild.channels.cache.get("878630692156751894");

  channel.send(member.user.tag + ' sudah meninggalkan server.');
});


client.on('messageCreate', async msg => {
  if (msg.content === '!ping') {
    msg.reply(`Kecepatan Internet sekarang ${Date.now() - msg.createdTimestamp}ms.`);
  }
});

client.login(process.env.TOKEN);