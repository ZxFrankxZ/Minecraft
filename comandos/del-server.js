const Discord = require("discord.js");
const sql = require("sqlite");
    sql.open("./servidores2.sqlite");
module.exports.run = (client, message, args) => {
  if(message.channel.type === "dm") return message.reply("you can't use that in DM");
	sql.get(`SELECT * FROM idiomas WHERE guild ="${message.guild.id}"`).then(async(asd) => {
		sql.all(`SELECT * FROM staffs WHERE guild ="${message.guild.id}"`).then(s => {
			if(asd === undefined || asd.idioma === "en") {
				let roles = s.map(d => d.nombre)
				if(!message.guild.member(message.author).roles.cache.some(v =>roles.includes(v.name))) return message.reply("❌ You don't have the proper role")
				let nombrew = message.content.split(" ")[1]
				if(!nombrew) return message.reply("You don't add some name to delete")
				sql.get("SELECT * FROM servidores WHERE guild ='"+message.guild.id+"' AND nombre = '"+nombrew.toLowerCase()+"'").then((a) => {
					if(a === undefined) return message.channel.send("❌This IP doesn't exist")
					sql.run("DELETE FROM servidores WHERE guild = '"+message.guild.id+"' AND nombre = '"+nombrew.toLowerCase()+"'").then(() => {
						let embed = new Discord.MessageEmbed()
						.setTitle("✅ Server removed successfully")
						.setDescription("[**Bot Status**](https://stats.uptimerobot.com/oyvDnTGnV)")
						.setColor(0x66FF00)
						.addField("Name", nombrew.toLowerCase(), true)
						.setFooter(message.author.username, message.author.avatarURL())
						.setThumbnail('http://pluspng.com/img-png/png-tick-png-green-tick-png-transparent-image-500.png')
						message.channel.send(embed)
					})
				})
			}
			else if(asd.idioma === "es") {
				let roles = s.map(d => d.nombre)
				if(!message.guild.member(message.author).roles.cache.some(v =>roles.includes(v.name))) return message.reply("❌ You don't have the proper role")
				let nombrew = message.content.split(" ")[1]
				if(!nombrew) return message.reply("No has añadido un nombre para eliminar")
				sql.get("SELECT * FROM servidores WHERE guild ='"+message.guild.id+"' AND nombre = '"+nombrew.toLowerCase()+"'").then((a) => {
					if(a === undefined) return message.channel.send("❌Esta IP no existe")

					sql.run("DELETE FROM servidores WHERE guild = '"+message.guild.id+"' AND nombre = '"+nombrew.toLowerCase()+"'").then(() => {
						let embed = new Discord.MessageEmbed()
						.setTitle("✅ Servidor Eliminado Correctamente")
						.setDescription("[**Bot Status**](https://stats.uptimerobot.com/oyvDnTGnV)")
						.setColor(0x66FF00)
						.addField("Nombre", nombrew.toLowerCase(), true)
						.setFooter(message.author.username, message.author.avatarURL())
						.setThumbnail('http://pluspng.com/img-png/png-tick-png-green-tick-png-transparent-image-500.png')
						message.channel.send(embed)
					})
				})
			}
			else if(asd.idioma === "fr") {
				let roles = s.map(d => d.nombre)
				if(!message.guild.member(message.author).roles.cache.some(v =>roles.includes(v.name))) return message.reply("❌ You don't have the proper role")
				let nombrew = message.content.split(" ")[1]
				if(!nombrew) return message.reply("Vous n'ajoutez pas de nom à supprimer")
				sql.get("SELECT * FROM servidores WHERE guild ='"+message.guild.id+"' AND nombre = '"+nombrew.toLowerCase()+"'").then((a) => {
					if(a === undefined) return message.channel.send("❌Cette IP n'existe pas")

					sql.run("DELETE FROM servidores WHERE guild = '"+message.guild.id+"' AND nombre = '"+nombrew.toLowerCase()+"'").then(() => {
						let embed = new Discord.MessageEmbed()
						.setTitle("✅ Le serveur a bien été supprimé")
						.setDescription("[**Bot Status**](https://stats.uptimerobot.com/oyvDnTGnV)")
						.setColor(0x66FF00)
						.addField("Nom", nombrew.toLowerCase(), true)
						.setFooter(message.author.username, message.author.avatarURL())
						.setThumbnail('http://pluspng.com/img-png/png-tick-png-green-tick-png-transparent-image-500.png')
						message.channel.send(embed)
					})
				})
			}
		})
	})
}
module.exports.help = {
  name: "delserver"
}