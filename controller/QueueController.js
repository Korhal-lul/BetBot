
var json = require("../user.json");
var data = {
    player: "203616087865032705",
    team: "A",
    qtd: "25",
}
const fs = require('fs');

//const queue = JSON.parse(queueJson);

function saveJSON(user, fileName){

    // convert JSON object to string
    const data = JSON.stringify(user);

    // write JSON string to a file
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            throw err;
        }
    });
}

var methods = {};

methods.openBet = function (teamA, teamB, msg) {
    var teams = {
        "teamA": teamA,
        "teamB": teamB,
    }
    saveJSON(teams,'./teams.json');
}

methods.bet = function (name, team, qtd) {
    var user = {
        "player": name,
        "team": team,
        "qtd": qtd,
    }

    json["Gamblers"].push(user);

    saveJSON(json,'./user.json');
}

methods.closeBet = function () {
    json.Gamblers = [];
    var teams = {
        "teamA": "",
        "teamB": "",
    }

    saveJSON(json,'./user.json');
    saveJSON(teams,'./teams.json');
}

module.exports = methods;