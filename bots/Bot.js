var request = require("request");
// var teamID = process.env.TEAM_ID || "localhost";

function Bot (settings) {
  this.teamId = settings.teamId;
  this.token = settings.token;
  this.botPayload = settings.botPayload;
}

Bot.prototype.getTeam = function () {
  return this.teamId;
}

Bot.prototype.getToken = function () {
  return this.token;
}

// data to send back to slack
Bot.prototype.send = function (payload, callback) {
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
};

// returns true if provided token and team id match the bots token and team id
Bot.prototype.isAuthorized = function (reqToken, reqTeamId) {
  if (this.getToken() === reqToken && this.getTeam() === reqTeamId ) {
    return true;
  } else {
    return false;
  }
}

module.exports = Bot;
