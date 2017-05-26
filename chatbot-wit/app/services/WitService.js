'use strict';
/**
 * Created by stijn on 26-May-17.
 */

const uuidV1 = require('uuid/v1');
var Wit = require('node-wit').Wit;

var WitAiService = (function () {
    var sessionId,
        context,
        witClient;

    var actions = {
        send: function send(session, callback) {

            var uuid = uuidV1();
            witClient.converse(uuid, session.message.text)
                .then(function (data) {
                    callback(data);
                })
                .catch(console.error);
        }
    };

    function WitAiService() {
        sessionId = uuidV1();
        context = {};
        witClient = new Wit({accessToken: global.config.wit.accessToken, actions: actions});
        return witClient;
    }

    return WitAiService;
})();

module.exports = WitAiService;