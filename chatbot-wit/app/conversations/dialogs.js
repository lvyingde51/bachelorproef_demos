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
        function (session, args, next) {
            if(!session.userData.name)
                session.beginDialog('/profile');
            else
                next();
        },
        function (session) {
            session.endDialog('Dag %s!', session.userData.name);
        }
    ]);

    bot.dialog('/changeName', [
        function (session, args, next) {
            if(args){
                var name = builder.EntityRecognizer.findEntity(args.entities, 'name');
            }
            if(name){
                session.userData.name = name.entity;
                return next();
            }
            session.beginDialog('/profile');
        },
        function (session) {
            session.endDialog('Oke, ik heb je naam veranderd naar %s.', session.userData.name);
        }
    ]);
};