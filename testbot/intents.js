/**
 * Created by stijn on 21-Feb-17.
 */
'use strict';
var builder = require("botbuilder");

module.exports = function (intents, bot) {
    intents.matches(/^change name/i, [
        function (session) {
            session.beginDialog('/profile');
        },
        function (session) {
            session.send('Ok... Changed your name to %s', session.userData.name);
        }
    ]);

    intents.onDefault([
        function (session, args, next) {
            if(!session.userData.name)
                session.beginDialog('/profile');
            else
                next();
        },
        function (session, results) {
            session.send('Hello %s!', session.userData.name);
        }
    ]);

    bot.dialog('/profile', [
        function (session) {
            builder.Prompts.text(session, 'Hi! What is your name?');
        },
        function (session, results) {
            session.userData.name = results.response;
            session.endDialog();
        }
    ]);
};