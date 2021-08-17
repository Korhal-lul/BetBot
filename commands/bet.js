var queueController = require('../controller/QueueController.js');
var queueStatus = require('./queueStatus');
const Discord = require('discord.js');
var teams = require("../teams.json");

module.exports = {
	name: 'bet',
	description: 'Used to bet',
	execute(message, args) {
        var str;
        if(args[1] > 25 || args[1] < 5 || (args[1] % 5 != 0)){

            return message.channel.send(`Invalid bet value`);

        }else if(teams.teamA == "" || teams.teamB == ""){

            return message.channel.send(`Bets are currently closed`);

        }else if(!args.length || args.length == 1){

            return message.channel.send(`Privided no teams to bet`);

        }else if(args.length == 2){
            queueController.bet(message.author.id, args[0].toUpperCase(), args[1]);
            queueStatus.execute(message);
            //queueController.openBet(args[0], message.author, message);
            //queueStatus.execute(message);
        }

	},
};  