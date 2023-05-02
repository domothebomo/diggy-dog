class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        // load audio
        this.load.audio('footsteps', './assets/footsteps.wav');
        this.load.audio('bark_4', './assets/dogbark_04.mp3');
        this.load.audio('digging', './assets/digging.mp3');
    }

    create() {
        

        // define keys
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.scene.start('playScene');
    }
}