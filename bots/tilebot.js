var request = require("request");

module.exports = function (req, res, next) {
  var botPayload = {
    text: ":argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:"
  };
  var parameters = req.body.text;
  var regex = /(\d+)\s*x\s*(\d+)\s*(\S+)/;

  botPayload.username = "tilebot";
  botPayload.icon_emoji = ":argyle:";
  botPayload.channel = req.body.channel_id;
  if (parameters) {
    botPayload.text = createTileset(parameters.match(regex));
  }

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

function createTileset (parameters) {
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
