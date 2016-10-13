var tessel = require('tessel');
var api = require('./xeroPongApi');

function setupButton(button, buttonNum) {
    var tLight = tessel.led[2];

    //We want to avoid calling the API multiple times, so we'll use this var for that
    var isBusy = false;
    button.on('fall', function () {
        if (isBusy) {
            return;
        }

        isBusy = true;
        tLight.on();
        api.buttonPress(buttonNum, function (err) {
            if (err) {
                console.log('ERROR api.buttonPress', err);
            }

            isBusy = false;
            tLight.off();
        });
    });
}

function setup() {
    var button1 = tessel.port.B.pin[6];
    var button2 = tessel.port.B.pin[7];

    setupButton(button1, 1);
    setupButton(button2, 2);
}

module.exports = {
    setup: setup
};

