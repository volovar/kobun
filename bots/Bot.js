var request = require("request");
// var teamID = process.env.TEAM_ID || "localhost";

function Bot (req, res) {
  this.message = "good sir";
  this.botPayload = {
    username: "defaultbot"
  };
}

Bot.prototype.hello = function () {
  return "hello " + this.message;
}

Bot.prototype.send = function (payload, callback) {
  var path = process.env.INCOMING_WEBHOOK_PATH;
  var uri = 'https://hooks.slack.com/services' + path;
  var token = process.env.TOKEN || "token";
  var teamID = process.env.TEAM_ID || "localhost";

  if (token !== req.body.token || teamID !== req.body.team_id ) {
    return res.status(200).end("Not authorized");
  }

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
};

module.exports = Bot;
