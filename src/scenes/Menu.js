class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        // load audio
        this.load.audio('footsteps', './assets/footsteps.wav');
        this.load.audio('bark_1', './assets/dogbark_01.mp3');
        this.load.audio('bark_2', './assets/dogbark_02.mp3');
        this.load.audio('bark_3', './assets/dogbark_03.mp3');
        this.load.audio('bark_4', './assets/dogbark_04.mp3');
        
        this.load.audio('digging', './assets/digging.mp3');
        this.load.audio('alert', './assets/alert.wav');
        this.load.audio('jingle', './assets/jingle.mp3');
        this.load.audio('bad_item', './assets/bad_item.wav');
        this.load.audio('victory', './assets/victory.wav');
        this.load.audio('defeat', './assets/defeat.mp3');
        this.load.audio('music', './assets/music.wav');

        // load menu sprites
        this.load.image('sky', './assets/sky.png');
        this.load.image('logo', './assets/logo.png');
        this.load.image('start', './assets/start-button.png');
        this.load.image('title_grass', './assets/title_grass.png');
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, 720, 640, 'sky').setOrigin(0, 0);
        this.title_grass = this.add.tileSprite(0, 0, 720, 640, 'title_grass').setOrigin(0, 0);
        this.add.sprite(game.config.width / 2 + 20, game.config.height / 2, 'logo');
        this.add.sprite(game.config.width / 2, game.config.height / 2 + 200, 'start');

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#000000',
            align: 'center',
            padding: {
                top: 20,
                bottom: 20,
            },
            fixedWidth: 0
        };

        this.add.text(game.config.width / 2, game.config.height / 2 + 110, "Find your bone before the park closes!\nUse the arrow keys to move, and (SPACE)\nto dig up treasure. You'll start to bark\nwhen near buried treasure, but try to avoid\ngetting distracted by the other dogs!", menuConfig).setOrigin(0.5, 0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.title_grass.tilePositionX += 0.25;
        this.sky.tilePositionX -= 0.25;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
        //this.scene.start('playScene');
    }
}