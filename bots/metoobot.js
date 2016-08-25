var Bot = require("./SlashBot");

module.exports = function (req, res, next) {
  var settings = {
    token: process.env.METOOBOT_TOKEN,
    botPayload: {
      username: req.body.user_name,
      channel: req.body.channel_id,
      icon_url: "../images/metoo-image.png"
    }
  }

  var meTooBot = new Bot(settings);

  meTooBot.botPayload.text = "_" + req.body.user_name + " " + req.body.text + "_";

  // check if request is authorized
  if (!meTooBot.isAuthorized(req.body.token, req.body.team_id)) {
    return res.status(401).end("Not Authorized");
  }

  meTooBot.send(function (error, status, body) {
    if (error) {
      return next(error);
    } else if (status !== 200) {
      return next(new Error('Incoming WebHook: ' + status + ' ' + body));
    } else {
      return res.status(200).end();
    }
  });
};
