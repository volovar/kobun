var Bot = require("./Bot");

module.exports = function (req, res, next) {
  var settings = {
    token: process.env.TESTBOT_TOKEN,
    teamId: process.env.TEAM_ID,
    botPayload: {
      username: "testbot",
      text: "Hi, I'm testbot!"
    }
  }
  var testBot = new Bot(settings);
  //
  // if (!testBot.isAuthorized(req.body.token, req.body.team_id)) {
  //   return res.status(401).end("Not Authorized");
  // }

  return res.status(200).json(testBot.botPayload);
};
