const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();


//let members;
client.on("error", (err) => {
    console.log(err);
})
client.on("ready", () => {
  console.log("Online!");
  //members = client.guilds.cache.map(d => d.name).length

  let i = 0
  function estado() {
	let num = client.guilds.cache.size
	let estados = ["m/help", num.toString()+" discords"]
	client.user.setPresence({
		activity: {
			name: i > parseInt(estados.length)-1 ? estados[0] : estados[i],
			type: "PLAYING"
		}
	});
  
	i > parseInt(estados.length)-1 ? i =1 : i++
  }
  setInterval(estado, 10000)
});

client.commands = new Discord.Collection();

fs.readdir("./comandos", (err, files) => {
  if(err) console.error(err);
  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles.length <= 0) {
    console.log("No hay comandos para cargar");
    return;
  }
  console.log(`Cargando ${jsFiles.length} comandos`);

  jsFiles.forEach((f, i) => {
    let props = require(`./comandos/${f}`)
    client.commands.set(props.help.name, props)
  });
});

let prefix = "m/";
client.on("message", async(message) => {
  /*if(message.content.startsWith(prefix)) {
      if(!message.content.startsWith(prefix+'emoji') && !message.content.startsWith(prefix+'info') && !message.content.startsWith(prefix+'liststaff') && !message.content.startsWith(prefix+'delstaff') && !message.content.startsWith(prefix+'addstaff') && !message.content.startsWith(prefix+'list') && !message.content.startsWith(prefix+'addstaff') && !message.content.startsWith(prefix+'addserver') && !message.content.startsWith(prefix+'delserver') && !message.content.startsWith(prefix+'ping') && !message.content.startsWith(prefix+'help')) {
       message.channel.send("I don't find this command") 
      }
    }*/
  let guild = message.guild;
    let args = message.content.split(" ").slice(1).join(" ");
  let command = message.content.toLowerCase().split(" ")[0];
  if(!command.startsWith(prefix)) return;

  let cmd = client.commands.get(command.slice(prefix.length));
  if (cmd)
    cmd.run(client, message, args);
});

client.on("message", message => {
  if (message.guild === null) return;
  if(message.content.startsWith("m/")) {
  let mensaje = message.content.split(" ").join(" ");
  let server = message.guild.name;
  let usuario = message.author.username;
  if(message.guild.id === '264445053596991498') return
  if(message.guild.id === '507220891894284328') return
  let canal = client.channels.cache.get('507972406799892501')
  let embed = new Discord.MessageEmbed()
  .setDescription("["+server+"]["+usuario+"#"+message.author.discriminator+"] >> **"+mensaje+"**")
  canal.send(embed)
  //console.log("["+server+"]["+usuario+"#"+message.author.discriminator+"] >> "+mensaje)
}

  let canal = client.channels.cache.get('507997839498936322')
  if(message.channel.type === "dm") {
    if(message.author.bot) return;
     //console.log(message.author.tag + " " + message.content)
	 //message.channel.send("Hi, my commands dont work in Private, sorry");
	 //client.users.get(message.author.id).send("Hi, my commands dont work in Private, sorry");
       canal.send(message.attachments.first() ? message.author.tag + " " + message.content + " " + message.attachments.first().url : message.author.tag + " " + message.content);
  }
});

client.on("guildCreate", guild => {
  //members = members+1
  console.log("Join: \n"+guild.owner.user.tag)
  client.guilds.cache.get(guild.id).fetchInvites().then((a) => {
    let invite = a.map(r => r.code)
  let canal = client.channels.cache.get('507866124809928705')
  let embed = new Discord.MessageEmbed()
  .setTitle('He entrado a un nuevo grupo')
  .setColor(0x66FF00)
  .addField('**Nombre**', guild.name, true)
  .addField('**Cantidad de miembros**', guild.memberCount, true)
  .addField('**Owner**', guild.owner.user.tag, true)
  .addField('**Grupo**', 'https://discord.gg/'+invite[0], true)
  .addField('**Servidores**', client.guilds.cache.size, true)
  .setThumbnail('http://www.eoi.es/blogs/alfredo-fernandez-lorenzo/files/2016/04/Salir-3.jpg')
  
  canal.send(embed)
    })
  
  let embed2 = new Discord.MessageEmbed()
  .setTitle("Thanks for adding me to your group")
  .setDescription('```md\n[m/help](See the avalible command)\n[m/addserver IP Name](Add some server to do ping)\n[m/delserver Name](Remove some stored server)\n[m/ping Name](Ping to some server stored with m/addserver)\n[m/list](See your stored servers)\n[m/addstaff @rol](Add some rol to allow to access to the command m/addserver and m/delserver)\n[m/delstaff @rol](Remove a rol added previously)\n[m/liststaff](See the current roles are allowed to access to the commands m/addserver and m/delstaff)\n[m/ping IP](Do ping to any IP)\n[m/names nickname](See the current names and last names of a PREMIUM user. Example: m/names ZxFrankxZ)\n[m/skin nickname](See the current skin of a PREMIUM user. Example: m/skin ZxFrankxZ)\n[m/language](Set the language to Spanish, English or Franch. Default => English)```')
  .addField('Support', '[Support Discord](https://discord.gg/NNCgDeN)\nIf you find some bug/error pls report this')
  .setColor(0x66FF00);
  try {
  client.users.cache.get(guild.ownerID).send(embed2);
  } catch (err) {
	console.log("No se ha podido enviar el mensaje privado a este usuario");
	return;
  }
});

client.on("guildDelete", guild => {
  //members = members - 1
  let canal = client.channels.cache.get('507866124809928705')
  let embed = new Discord.MessageEmbed()
  .setTitle('Ha salido de un grupo')
  .setColor(0x66FF00)
  .addField('**Nombre**', guild.name, true)
  .addField('**Cantidad de miembros**', guild.memberCount, true)
  .addField('**Owner**', guild.owner.user.tag, true)
  .addField('**Servers**', client.guilds.cache.size, true)
  .setThumbnail('https://sonar-con.net/wp-content/uploads/2013/10/Salir-de-ASNEF-NO-es-gratis3-1.png')
  
  canal.send(embed)
});

client.on('guildMemberAdd', member => {
  if(member.guild.id !== '507220891894284328') return
  let entrada = client.guilds.cache.get("507220891894284328").channels.cache.get("507647789187203074")
  let embed = new Discord.MessageEmbed()
  .setTitle("New User")
  .setDescription("Welcome <@"+member+">, If you have some suggestion you can write this in <#507544332090343444>.\nThanks for join")
  .setThumbnail("http://www.joined.be/JOINED.jpg")
  .setColor("GREEN")
  entrada.send({embed})
})

client.login("NTA3MjIwMDc0NTgzNjg3MTc3.W9nPgQ.jlh2bhGvoZWq61nHA02RIoLmKUE");