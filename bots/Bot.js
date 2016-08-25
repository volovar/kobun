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

Bot.prototype.isAuthorized = function (reqToken, reqTeamId) {
  console.log(reqToken, reqTeamId);
  if (this.token === reqToken && this.teamId === reqTeamId ) {
    return true;
  } else {
    return false;
  }
}

module.exports = Bot;
