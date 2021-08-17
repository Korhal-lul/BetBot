const Discord = require('discord.js');
var queue = require('../controller/QueueController.js');
var json = require("../user.json");
const fs = require('fs');
var teams = require("../teams.json");
var client;

module.exports = {
	name: 'status',
	description: 'display the bets status',
	execute(message) {
		var client = message.client;

		const embeded = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTimestamp()
		.setFooter('Use !bet [team] [money] to bet');

		var strA = "", strB = "";

		for(let i = 0; i < (json.Gamblers.length); i++){

			//console.log(server.members.cache.get(json.Gamblers[i].player));

			var username = client.users.cache.get(json.Gamblers[i].player).username;
			
			var money = json.Gamblers[i].qtd + ",00";

			if(json.Gamblers[i].team == 'A'){
				strA += username + ": R$ " + money + "\n";
			}else{
				strB += username + ": R$ " + money + "\n";
			}
			
			
		}
		if(strA != "")
			embeded.addField("Team A) " + teams.teamA, strA);
		if(strB != "")
			embeded.addField("Team B) " + teams.teamB, strB);
		message.channel.send(embeded);
    }
}