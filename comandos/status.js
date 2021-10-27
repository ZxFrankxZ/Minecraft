const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = (client, message, args) => {
  if(message.channel.type === "dm") return message.reply("you can't use that in DM");
  function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {d: d, h: h, m: m, s: s};};
   let u = convertMS(client.uptime);
    let uptime = u.d + " dias : " + u.h + " horas : " + u.m + " minutos : " + u.s + " segundos"
     const duration = moment.duration(client.uptime)
    let embed = new Discord.MessageEmbed()
    .setTitle("Bot Info")
    .setDescription('**BOT Stats**')
    .setColor(0xFF3399)
    .addField(`Mem Usage`, '`'+`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`+'`', true)
    .addField("Uptime", u.d > 0 ? '`'+u.d+" days, "+u.h+" hrs, "+u.m+" mins, "+u.s+" secs`" : u.h > 0 ? '`'+u.h+" hrs, "+u.m+" mins, "+u.s+" secs`" : u.m > 0 ? '`'+u.m+" mins, "+u.s+" secs`" : '`'+u.s+" secs`", true)
    .addField("Users", '`'+client.users.cache.map(d => d.name).length+'`', true)
    .addField("Servers", '`'+client.guilds.cache.map(d => d.name).length+'`', true)
    .addField("Channels", '`'+client.channels.size+'`', true)
    .addField("Voice Connections", "`"+client.voiceConnections.size+'`', true)
    .addField("Discord.js", '`v11.6.4`', true)
    .addField("Node", '`'+process.version+'`', true)
    .addField('CPU', '```fix\nIntel(R) Core(TM) i5-4690K CPU @ 3.50GHz```')
    .addField("Platform", '`Linux`', true)
    .addField('API Latency', "`"+Math.floor(client.ws.ping)+' ms`', true)
    .addField("**Host**", "`VPS`", true)
    .addField('**Donations**', '[Patreon](https://www.patreon.com/user?u=2822657)', true)
    .addField("**Uptime**", "[URL](https://stats.uptimerobot.com/oyvDnTGnV)", true)
    message.channel.send(embed)
}
module.exports.help = {
  name: "info"
}