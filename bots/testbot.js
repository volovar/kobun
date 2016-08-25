var Bot = require("./Bot");

module.exports = function (req, res, next) {
  var testBot = new Bot(req, res);

  var token = process.env.TOKEN || "token";
  var teamID = process.env.TEAM_ID || "localhost";

  return res.status(200).json(testBot.botPayload);
};
