var Bot = require("./Bot");

module.exports = function (req, res, next) {
  var settings = {
    token: process.env.TESTBOT_TOKEN || "Hu6C4VYZizX4bUy8Xl8Dr3I8",
    teamId: process.env.TEAM_ID || "T09Q15U78",
    botPayload: {
      username: "testbot",
      text: "Hi, I'm testbot!"
    }
  }
  var testBot = new Bot(settings);

  if (!testBot.isAuthorized(req.body.token, req.body.team_id)) {
    return res.status(401).end("Not Authorized");
  }

  return res.status(200).json(settings);
};
