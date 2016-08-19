var request = require("request");

module.exports = function (req, res, next) {
  var botPayload = {
    text: ":argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:"
  };

  botPayload.channel = req.body.channel_id;

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
