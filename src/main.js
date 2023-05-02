let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 640,
    pixelArt: true,
    zoom: 1,
    physics: {
        default: 'arcade',
        //debugger: true
        arcade: {
            checkCollision: {
                up: true,
                down: true,
                left: true,
                right: true
            }
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//let keyUP, keyDOWN, keyLEFT, keyRIGHT;
let cursors;
let keySPACE;
//let movingX;
//let movingY;

// set UI sizes
//let borderUISize = game.config.height / 15;
//let borderPadding = borderUISize / 3;