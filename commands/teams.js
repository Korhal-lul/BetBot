const Discord = require('discord.js');
var queue = require('../controller/QueueController.js');
var json = require("../user.json");
const fs = require('fs');
var teams = require("../teams.json");
var client;

module.exports = {
	name: 'teams',
	description: 'display the teams',
	execute(message) {
		var client = message.client;

		const embeded = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTimestamp()
		.setFooter('Use !bet [team] [money] to bet');

		var strA = "", strB = "";
        
        strA = "A) " +  teams.teamA + "\nB) " +  teams.teamB;
		
		embeded.addField("Teams", strA);

		message.channel.send(embeded);
    }
}