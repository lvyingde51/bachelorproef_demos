'use strict';
/**
 * Created by stijn on 05-May-17.
 */

'use strict';
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
};