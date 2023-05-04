let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 640,
    pixelArt: true,
    zoom: 1,
    physics: {
        default: 'arcade',
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

let cursors;
let keySPACE, keyESC;
