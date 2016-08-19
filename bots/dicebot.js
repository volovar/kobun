var request = require('request');

module.exports = function (req, res, next) {
    var matches;
    var times = 2;
    var die = 6;
    var rolls = [];
    var total = 0;
    var botPayload = {}

    if (req.body.text) {
        matches = req.body.text.match(/^(\d{1,2})d(\d{1,2})$/);

        if (matches && matches[1] && matches[2]) {
            times = matches[1];
            die = matches[2];
        } else {
            return res.status(200).send('<number>d<sides>');
        }
    }

    for (var i = 0; i < times; i++) {
        var currentRoll = roll(1, die);
        rolls.push(currentRoll);
        total += currentRoll;
    }

    botPayload.text = req.body.user_name + ' rolled ' + times + 'd' + die + ':\n' + rolls.join(' + ') + ' = *' + total + '*';
    botPayload.username = 'dicebot';
    botPayload.channel = req.body.channel_id;
    botPayload.icon_emoji = ':game_die:';

    send(botPayload, function (error, status, body) {
        if (error) {
            return next(error);
        } else if (status !== 200) {
            return next(new Error('Incoming WebHook: ' + status + ' ' + body));
        } else {
            return res.status(200).end();
        }
    });
};

function roll (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function send (payload, callback) {
    var path = process.env.INCOMING_WEBHOOK_PATH;
    var uri = 'https://hooks.slack.com/services' + path;

    request({
        uri: uri,
        method: 'POST',
        body: JSON.stringify(payload)
    }, function (error, response, body) {
        if (error) {
            return callback(error);
        }

        callback(null, response.statusCode, body);
    });
}
