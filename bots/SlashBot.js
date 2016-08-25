var request = require("request");

function SlashBot (settings) {
  this.teamId = process.env.TEAM_ID;
  this.token = settings.token;
  this.botPayload = settings.botPayload;
}

SlashBot.prototype.getTeam = function () {
  return this.teamId;
}

SlashBot.prototype.getToken = function () {
  return this.token;
}

// data to send back to slack
SlashBot.prototype.send = function (callback) {
  var path = process.env.INCOMING_WEBHOOK_PATH;
  var uri = 'https://hooks.slack.com/services' + path;

  request({
      uri: uri,
      method: 'POST',
      body: JSON.stringify(this.botPayload)
  }, function (error, response, body) {
      if (error) {
          return callback(error);
      }

      callback(null, response.statusCode, body);
  });
};

// returns true if provided token and team id match the bots token and team id
SlashBot.prototype.isAuthorized = function (reqToken, reqTeamId) {
  if (this.getToken() === reqToken && this.getTeam() === reqTeamId ) {
    return true;
  } else {
    return false;
  }
}

module.exports = SlashBot;
