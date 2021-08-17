const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const fetchAllMembers = () => {
    const guilds = client.guilds.cache.array();

    for(let i = 0; i < guilds.length; i++){
        const guild = client.guilds.cache.get(guilds[i].id);
        guild.members.fetch();
        console.log(i);
    }

};

client.on('ready', () => {
    //TODO

    console.log(`Logged in as ${client.user.tag}!`);

    fetchAllMembers();

    //Prefix is '!'
    

    client.on('message', message => {

       
        
        if (message.content.endsWith("waiting for confirmation") && message.author.bot) {
            try {
                message.react('✅');
            } catch (error) {
                console.error('One of the emojis failed to react:', error);
            }
        }
        //====================== Reaction Collector ====================================
        // const filter = (reaction, user) => {
        //     return reaction.emoji.name === '✅' && user.id != message.author.id;
        // };
        
        // const collector = message.createReactionCollector(filter, { time: 60000 });
        
        // collector.on('collect', (reaction, user) => {
        //     console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

        //     if(reaction.message.mentions.users.first() == user){
        //         message.channel.send(`${reaction.message.mentions.users.first()}, ${user}`);
        //     }

        // });
        
        // collector.on('end', collected => {
        //     console.log(`Collected ${collected.size} items`);
        // });
        
        // =======================================================================

        if (!message.content.startsWith(prefix) || message.author.bot || message.channel.id != "864570000824467536") return;

        const args = message.content.slice(prefix.length).trim().split(' ');
        const commandName = args.shift().toLowerCase();
        

        if (!client.commands.has(commandName)) return message.channel.send(`Invalid command`);

        const command = client.commands.get(commandName);

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

        
    });
    
});

client.login(token);

