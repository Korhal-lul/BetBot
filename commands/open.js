
var queueController = require('../controller/QueueController.js');

module.exports = {
	name: 'open',
	description: 'Used to open a bet',
	execute(message, args) {
        var str;

        if(!args.length || args.length == 1){

            return message.channel.send(`No teams to bet`);

        }else if(args.length == 2){
            queueController.openBet(args[0], args[1], message);
            //queueController.openBet(args[0], message.author, message);
            message.channel.send(`The bets are now open`);
            //queueStatus.execute(message);
        }

	},
};