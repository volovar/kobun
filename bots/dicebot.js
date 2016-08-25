var Bot = require("./SlashBot");

module.exports = function (req, res, next) {
  var settings = {
    token: process.env.DICEBOT_TOKEN,
    botPayload: {
      username: "dicebot",
      text: "Hi, " + req.body.user_name + " I'm testbot!",
      channel: req.body.channel_id,
      icon_emoji: ":game_die:"
    }
  };

  var rollBot = new Bot(settings);

  rollBot.send(function (error, status, body) {
    if (error) {
      return next(error);
    } else if (status !== 200) {
      return next(new Error('Incoming WebHook: ' + status + ' ' + body));
    } else {
      return res.status(200).end();
    }
  });

  rollBot.roll = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  rollBot.createText = function () {
    var matches;
    var times = 2;
    var die = 6;
    var rolls = [];
    var total = 0;

    if (req.body.text) {
      matches = req.body.text.match(/^(\d{1,2})\s*d\s*(\d{1,3})$/);

      if (matches && matches[1] && matches[2]) {
        times = matches[1];
        die = matches[2];
      } else {
        return res.status(200).send('<number>d<sides>');
      }
    }

    for (var i = 0; i < times; i++) {
      var currentRoll = this.roll(1, die);
      rolls.push(currentRoll);
      total += currentRoll;
    }

    this.botPayload.text = req.body.user_name + ' rolled ' + times + 'd' + die + ':\n' + rolls.join(' + ') + ' = *' + total + '*';
  }
};
