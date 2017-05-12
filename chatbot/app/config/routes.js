'use strict';

module.exports = function (app, connector) {
  app.get('/test', function (req, res) {
    console.log('binne');
    res.send('hey');
  });
  app.post('/api/v1/botmessage', connector.listen());
};