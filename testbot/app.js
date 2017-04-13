'use strict';

var builder = require('botbuilder');
// express = require('express');

// var app = express();

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

require('./intents')(intents, bot);