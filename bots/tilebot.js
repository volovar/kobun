module.exports = function (req, res, next) {
  var botPayload = {
    text: ":argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:\n:argyle::argyle::argyle::argyle:"
  };

  return res.status(200).json(botPayload);
}
