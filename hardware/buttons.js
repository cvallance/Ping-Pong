var tessel = require('tessel');
var api = require('./xeroPongApi');

function setupButton(button, buttonNum) {
    //We want to avoid calling the API multiple times, so we'll use this var for that
    var isBusy = false;
    setInterval(function () {
        if (isBusy) {
            return;
        }

        isBusy = true;
        button.read(function(err, value) {
            if (value === 1) {
                //If it's 1, that means it's not pressed
                isBusy = false;
                return;
            }

            if (err) {
                console.log('ERROR button.read', err);
                isBusy = false;
                return;
            }

            console.log('doing button press');
            api.buttonPress(buttonNum, function(err) {
                if (err) {
                    console.log('ERROR api.buttonPress', err);
                }

                isBusy = false;
            });
        });
    }, 250);
}

function setup() {
    var button1 = tessel.port.B.pin[0];
    var button2 = tessel.port.B.pin[1];

    setupButton(button1, 1);
    setupButton(button2, 2);
}

module.exports = {
    setup: setup
};

