const Discord = require('discord.js');
var queue = require('../controller/QueueController.js');
var json = require("../user.json");
const fs = require('fs');
var teams = require("../teams.json");
var client;

module.exports = {
	name: 'winner',
	description: 'Define a winner for the current bet',
	execute(message, args) {
		var client = message.client;

		const embeded = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTimestamp()
		.setFooter('Use !bet [team] [money] to bet');

        
        var totalLoser = 0, totalWinner = 0, str = "";

		for(let i = 0; i < (json.Gamblers.length); i++)
			if(json.Gamblers[i].team.toUpperCase() != args[0].toUpperCase())
                totalLoser += convert_to_float(json.Gamblers[i].qtd);
            else totalWinner += convert_to_float(json.Gamblers[i].qtd);
        
		for(let i = 0; i < (json.Gamblers.length); i++){
            
			if(json.Gamblers[i].team.toUpperCase() == args[0].toUpperCase()){

			    var username = client.users.cache.get(json.Gamblers[i].player).username;
                var mult1 = (json.Gamblers[i].qtd / totalWinner);
                var x = mult1 * totalLoser;

                str += username + ": apostado R$ " + json.Gamblers[i].qtd + " | ganho R$ " + x.toFixed(2) +"\n";
            }


        }

        var strTeam = "team" + args[0].toUpperCase();
        
        if(str != "")
            embeded.addField("Winners " + teams[strTeam], str);

		message.channel.send(embeded);
    }
}

function convert_to_float(a) {
          
    // Type conversion
    // of string to float
    var floatValue = +(a);
      
    // Return float value
    return floatValue; 
} 