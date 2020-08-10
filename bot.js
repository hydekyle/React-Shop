const player = require('node-wav-player');

setInterval(() => {
    player.play({
        path: './beep1.wav',
    }).then(() => {
        console.log('The wav file started to be played successfully.');
    }).catch((error) => {
        console.error(error);
    });
}, 6000);