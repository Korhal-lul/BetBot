
var queueController = require('../controller/QueueController.js');

module.exports = {
	name: 'close',
	description: 'Used to close a open bet',
	execute(message, args) {

        if(args.length != 0){

            return message.channel.send(`No parameters allowed`);

        }else {
            queueController.closeBet();
            //queueController.openBet(args[0], message.author, message);
            message.channel.send(`The bets are now closed`);
            //queueStatus.execute(message);
        }

	},
};