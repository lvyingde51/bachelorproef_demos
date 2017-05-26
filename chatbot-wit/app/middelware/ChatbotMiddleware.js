'use strict';
/**
 * Created by stijn on 26-May-17.
 */

var _ = require('lodash'),
    intents = require('../intents/intentList');

var ChatbotMiddleware = {
    botbuilder: function (session, next) {
        if(!session.userData.iDialog){
            return startWit();
        }
        next();

        function startWit() {
            global.witService.config.actions.send(session, function (witResponse) {
                console.log(witResponse.entities);
                if(!_.isEmpty(witResponse.entities)){
                    if (witResponse.entities.hasOwnProperty('intent')) {
                        if (witResponse.entities.intent[0].confidence >= 0.70) {
                            return session.beginDialog(intents[witResponse.entities.intent[0].value], witResponse);
                        }
                        next();
                    }
                }
            });
        }
    },

    receive: function (event, next) {
        next();
    },

    send: function (event, next) {
        next();
    }
};

module.exports = ChatbotMiddleware;