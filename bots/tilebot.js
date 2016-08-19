module.exports = function (req, res, next) {
  var botPayload = {
    text: ":argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:"
  };

  botPayload.channel = req.body.channel_id;

  return res.status(200).json(botPayload);
}
