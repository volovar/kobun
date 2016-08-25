var Bot = require("./SlashBot");

module.exports = function (req, res, next) {
  var settings = {
    token: process.env.TILEBOT_TOKEN,
    botPayload: {
      username: "tilebot",
      text: ":argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:",
      channel: req.body.channel_id,
      icon_emoji: ":argyle:"
    }
  }

  var tileBot = new Bot(settings);
  var parameters = req.body.text;
  var regex = /(\d+)\s*x\s*(\d+)\s*(\S+)/;

  if (parameters) {
    tileBot.botPayload.text = tileBot.createTileset(parameters.match(regex));
  }

  tileBot.send(function (error, status, body) {
      if (error) {
          return next(error);
      } else if (status !== 200) {
          return next(new Error('Incoming WebHook: ' + status + ' ' + body));
      } else {
          return res.status(200).end();
      }
  });

  tileBot.prototype.createTileset = function (parameters) {
    var MAX_WIDTH = 10;
    var MAX_HEIGHT = 6;

    // check that width and height aren't larger than the max values
    var width = parameters[1] <= MAX_WIDTH ? parameters[1] : MAX_WIDTH;
    var height = parameters[2] <= MAX_HEIGHT ? parameters[2] : MAX_HEIGHT;
    var text = parameters[3];
    var tileset = [];

    for (var i = 0; i < height; i++) {
      var row = "";

      for (var j = 0; j < width; j++) {
        row += text;
      }

      tileset.push(row);
    }

    return tileset.join("\n");
  }
};
