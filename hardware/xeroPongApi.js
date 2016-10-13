var request = require('request');
var config = require('../config');
config = config[process.env.NODE_ENV] || config.production;

function rfidScan(cardId, done) {
    console.log('xeroPongApi.rfidScan', cardId);

    var path = '/hardware/rfidscan';
    request.post(
        config.apiAddress + path,
        {json: {cardId: cardId}},
        (err, res, body) => {
            if (err) {
                console.log('ERROR request.post', err);
                return done(err);
            }

            done(null);
        }
    );
}

function buttonPress(buttonNum, done) {
    console.log('xeroPongApi.buttonPress', buttonNum);

    var path = '/hardware/buttonpress';
    request.post(
        config.apiAddress + path,
        {json: {buttonNum: buttonNum}},
        (err, res, body) => {
            if (err) {
                console.log('ERROR request.post', err);
                return done(err);
            }

            done(null);
        }
    );
}

module.exports = {
    rfidScan: rfidScan,
    buttonPress: buttonPress
};