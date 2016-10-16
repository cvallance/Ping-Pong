var tessel = require('tessel');
var rfidlib = require('rfid-pn532');
var api = require('./xeroPongApi');

function setup() {
    var rfid = rfidlib.use(tessel.port['A']);
    var tLight = tessel.led[3];
    var tErrorLed = tessel.led[0];

    rfid.on('ready', function () {
        console.log('Ready to read RFID card');

        //We want to avoid calling the API multiple times, so we'll use this var for that
        var isBusy = false;
        rfid.on('data', function(card) {
            if (isBusy) {
                return;
            }

            isBusy = true;
            tLight.on();
            api.rfidScan(card.uid.toString('hex'), function(error) {
                if (error) {
                    console.log('ERROR api.rfidScan', error);
                    tErrorLed.on();
                    setTimeout(function() {
                        tErrorLed.off();
                    }, 1000);
                }

                isBusy = false;
                tLight.off();
            });
        });
    });

    rfid.on('error', function (err) {
        console.error('ERROR rfid.on(\'error\')', err);
        tErrorLed.on();
        setTimeout(function() {
            tErrorLed.off();
        }, 1000);
    });
}

module.exports = {
    setup: setup
};
