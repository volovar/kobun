var express = require('express');
var bodyParser = require('body-parser');
var helloBot = require('./bots/hellobot');
var diceBot = require('./bots/dicebot');
var tileBot = require('./bots/tilebot');
var meTooBot = require('./bots/metoobot');
var testBot = require('./bots/testbot');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) { res.status(200).send('Hello bot world!')});

// the bots
app.post('/hello', helloBot);
app.post('/roll', diceBot);
app.post('/tile', tileBot);
app.post('/test', testBot);
app.post('/metoo', meTooBot);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function () {
    console.log('kobun listening on port ' + port);
});
