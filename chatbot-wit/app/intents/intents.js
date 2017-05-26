/**
 * Created by stijn on 21-Feb-17.
 */
'use strict';
var builder = require("botbuilder");

module.exports = function (intents) {
    intents.onDefault('/greeting');
};