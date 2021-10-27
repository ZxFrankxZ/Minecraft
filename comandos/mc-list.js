const Discord = require("discord.js");
const sql = require("sqlite");
    sql.open("./servidores2.sqlite");
module.exports.run = (client, message, args) => {
  if(message.channel.type === "dm") return message.reply("you can't use that in DM");
  sql.get(`SELECT * FROM idiomas WHERE guild ="${message.guild.id}"`).then(async(asd) => {
    sql.all(`SELECT * FROM servidores WHERE guild ="${message.guild.id}"`).then(row =>{
      if(asd === undefined || asd.idioma === "en") {
		let embed = new Discord.MessageEmbed()
		.setTitle("Added Ip's")
		.setDescription("[**Bot Status**](https://stats.uptimerobot.com/oyvDnTGnV)")
		.setColor(0x66FF00)
		.addField("Name", row.map(s => s.ip).length > 0 ? row.map(a => a.nombre).join("\n") : 'No servers added', true)
		.addField("IP", row.map(s => s.ip).length > 0 ? row.map(d => d.ip).join("\n") : "No Ip's added", true)
		message.channel.send(embed)
	  }
	  else if(asd.idioma === "es") {
		let embed = new Discord.MessageEmbed()
		.setTitle("IPs añadidas")
		.setDescription("[**Bot Status**](https://stats.uptimerobot.com/oyvDnTGnV)")
		.setColor(0x66FF00)
		.addField("Nombre", row.map(s => s.ip).length > 0 ? row.map(a => a.nombre).join("\n") : 'No hay servidores', true)
		.addField("IP", row.map(s => s.ip).length > 0 ? row.map(d => d.ip).join("\n") : "No hay IPs", true)
		message.channel.send(embed)
	  }
	  else if(asd.idioma === "fr") {
		let embed = new Discord.MessageEmbed()
		.setTitle("IPs ajoutés")
		.setDescription("[**Bot Status**](https://stats.uptimerobot.com/oyvDnTGnV)")
		.setColor(0x66FF00)
		.addField("Nom", row.map(s => s.ip).length > 0 ? row.map(a => a.nombre).join("\n") : 'Aucun serveur ajouté', true)
		.addField("IP", row.map(s => s.ip).length > 0 ? row.map(d => d.ip).join("\n") : "Aucun IPs ajouté", true)
		message.channel.send(embed)
	  }
    })
  })
}
module.exports.help = {
  name: "list"
}