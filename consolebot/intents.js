/**
 * Created by stijn on 21-Feb-17.
 */
'use strict';
var builder = require("botbuilder");

module.exports = function (intents) {
    intents.onDefault([
        function (session, args, next) {
            if(!session.userData.name)
                session.beginDialog('/profile');
            else
                next();
        },
        function (session, results) {
            session.send('Dag %s!', session.userData.name);
        }
    ]);

    intents.matches(/^wijzig naam/i, [
        function (session) {
            session.beginDialog('/profile');
        },
        function (session) {
            session.send('Oke, ik heb je naam veranderd naar %s.', session.userData.name);
        }
    ]);
};