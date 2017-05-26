'use strict';
/**
 * Created by stijn on 05-May-17.
 */

var builder = require("botbuilder");

module.exports = function (bot) {
    bot.dialog('/profile', [
        function (session) {
            builder.Prompts.text(session, 'Hallo, wat is jouw naam?');
        },
        function (session, results) {
            session.userData.name = results.response;
            session.endDialog();
        }
    ]);

    bot.dialog('/greeting', [
        function (session, witResponse, next) {
            session.userData.iDialog = true;
            if (!session.userData.name)
                session.beginDialog('/profile');
            else
                next();
        },
        function (session) {
            session.userData.iDialog = false;
            session.endDialog('Dag %s!', session.userData.name);
        }
    ]);

    bot.dialog('/changeName', [
        function (session, witResponse, next) {
        session.userData.iDialog = true;
            var name;
            if (witResponse.entities && witResponse.entities.hasOwnProperty('contact')
                && witResponse.entities['contact'][0].confidence > 0.8) {
                console.log('ja naam');
                name = witResponse.entities.contact[0].value;
            }

            if (name) {
                console.log(name);
                session.userData.name = name;
                return next();
            }
            session.beginDialog('/profile');
        },
        function (session) {
            session.userData.iDialog = false;
            session.endDialog('Oke, ik heb je naam veranderd naar %s.', session.userData.name);
        }
    ]);
};