//const { Textures } = require("phaser");

class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        //this.load.image('player', './assets/justaguy.png');

        this.load.spritesheet('dog_idle', './assets/dog_idle.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('dog_walk', './assets/dog_walk.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
    }

    create() {
        //this.add.text(game.config.width / 2, game.config.height / 2, 'PLAY');
        //this.player = new Player(this, game.config.width / 2, game.config.height / 2, 'player').setOrigin(0.5, 0.5);
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'dog_idle');
        //this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dog_idle', {start: 0, end: 1, first: 0}),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dog_walk', {start: 0, end: 1, first: 0}),
            frameRate: 3,
            repeat: -1
        });

        this.footsteps = this.sound.add("footsteps", {
            volume: 1,
            loop: true
        });

        /**keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);*/
        cursors = this.input.keyboard.createCursorKeys();
        this.moveSpeed = 100;
        //let moving = false;
        this.movingX = false;
        this.movingY = false;
        this.walking = false;

        this.player.anims.play('idle');
    }

    update() {

        //this.player.anims.play('idle');
        //this.player.update();
        //this.movingX = false;
        //this.movingY = false;
        let playerDirection = new Phaser.Math.Vector2(0, 0);

        if(cursors.left.isDown) {
            //this.player.setVelocityX(-50);
            playerDirection.x = -1;
            //movingX = true;
            this.player.setFlip(true, false);
        }
        if(cursors.right.isDown) {
            //this.player.setVelocityX(50);
            playerDirection.x = 1;
            //movingX = true;
            this.player.resetFlip();
        }
        if(cursors.up.isDown) {
            //this.player.setVelocityY(-50);
            playerDirection.y = -1;
            //movingY = true;
        }
        if(cursors.down.isDown) {
            //this.player.setVelocityY(50);
            playerDirection.y = 1;
            //movingY = true;
        }
        if (playerDirection.x != 0 || playerDirection.y != 0) {
            this.player.anims.play('walk', true);
            if (this.walking === false) {
                this.footsteps.play();
                this.walking = true;
            }
        } else {
            this.player.anims.play('idle', true);
            this.footsteps.stop();
            this.walking = false;
        }
        playerDirection.normalize();
        this.player.setVelocity(playerDirection.x * this.moveSpeed, playerDirection.y * this.moveSpeed);
        //this.player.setVelocityX(playerDirection.x * this.moveSpeed);
        //this.player.setVelocityY(playerDirection.y * this.moveSpeed);

        //if (!movingX) {
        //    this.player.body.velocity.x = 0;
            //this.player.body.velocity.y = 0;
        //}
        //if (!movingY) {
        //    this.player.body.velocity.y = 0;
        //}

    }

}