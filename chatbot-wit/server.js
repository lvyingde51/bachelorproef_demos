'use strict';

var express = require('express'),
    debug = require('debug')('chatbot:server'),
    https = require('https'),
    builder = require('botbuilder'),
    fs = require('fs'),
    config = require('./app/config/config');

var app = express();

// Creating the chat bot and hooking up with microsoft framework
var connector = new builder.ChatConnector({
  appId: '81b40661-9619-4462-9ed1-e245db9957ae',
  appPassword: 'xnhheUBinkcBavA4ExMjvFp'
});
var bot = new builder.UniversalBot(connector);
var model = config.luis;
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', intents);

require('./app/intents/intents')(intents);
require('./app/conversations/dialogs')(bot);
// var conversation_path = __dirname + '/app/conversations';
// fs.readdirSync(conversation_path).forEach(function (file) {
//
//   if (~file.indexOf('.js')) require(conversation_path + '/' + file)(bot);
// });

// express settings
require('./app/config/express')(app, global.config);

// Bootstrap routes
require('./app/config/routes')(app, connector);

var port = process.env.PORT || '1337';

var privateKey = fs.readFileSync(__dirname + '/app/config/sslcert/endare.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/app/config/sslcert/endare.crt', 'utf8');
var bundledCert = fs.readFileSync(__dirname + '/app/config/sslcert/gd_bundle-g2-g1.crt', 'utf8');

var sslOptions = {
  key: privateKey,
  cert: certificate,
  ca: bundledCert
};

//Create HTTP server.
var httpsServer = https.createServer(sslOptions, app);

// Start the app by listening on <port>
httpsServer.listen('1337', function () {
  console.log('Server listening to %s', process.env.port || process.env.PORT);
});