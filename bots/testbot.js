var Bot = require("./Bot");

module.exports = function (req, res, next) {
  var settings = {
    token: process.env.TESTBOT_TOKEN,
    teamId: process.env.TEAM_ID,
    botPayload: {
      username: "testbot",
      text: "Hi, " + req.body.user_name + " I'm testbot!",
      channel: req.body.channel_id,
      icon_emoji: ":control_knobs:"
    }
  }

  var testBot = new Bot(settings);

  // check if request is authorized return 401 otherwise
  if (!testBot.isAuthorized(req.body.token, req.body.team_id)) {
    return res.status(401).end("Not Authorized");
  }

  testBot.send(testBot.botPayload, function (error, status, body) {
      if (error) {
          return next(error);
      } else if (status !== 200) {
          return next(new Error('Incoming WebHook: ' + status + ' ' + body));
      } else {
          return res.status(200).end();
      }
  });
};
