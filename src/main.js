let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 360,
    pixelArt: true,
    zoom: 1.5,
    physics: {
        default: 'arcade',
        debugger: true
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//let keyUP, keyDOWN, keyLEFT, keyRIGHT;
let cursors;
//let movingX;
//let movingY;

// set UI sizes
//let borderUISize = game.config.height / 15;
//let borderPadding = borderUISize / 3;