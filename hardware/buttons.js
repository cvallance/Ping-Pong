var tessel = require('tessel');
var api = require('./xeroPongApi');

function setupButton(button, buttonNum) {
    //We want to avoid calling the API multiple times, so we'll use this var for that
    var isBusy = false;
    button.on('fall', function () {
        console.log('button press', buttonNum);
        if (isBusy) {
            return;
        }

        isBusy = true;
        console.log('doing button press');
        api.buttonPress(buttonNum, function (err) {
            if (err) {
                console.log('ERROR api.buttonPress', err);
            }

            isBusy = false;
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
