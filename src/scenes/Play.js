//const { Textures } = require("phaser");

class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        //this.load.image('player', './assets/justaguy.png');
        this.load.image('foodbowl', './assets/foodbowl2.png');

        this.load.spritesheet('dog_idle', './assets/dog_idle.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('dog_walk', './assets/dog_walk.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('question_mark', './assets/question_mark.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
    }

    create() {
        //this.add.text(game.config.width / 2, game.config.height / 2, 'PLAY');
        //this.player = new Player(this, game.config.width / 2, game.config.height / 2, 'dog_idle', 0).setOrigin(0.5, 0.5);

        // ANIMATIONS
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

        this.anims.create({
            key: 'alert',
            frames: this.anims.generateFrameNumbers('question_mark', {start: 0, end: 1, first: 0}),
            frameRate: 3,
        });

        // SOUNDS
        this.footsteps = this.sound.add("footsteps", {
            volume: 1,
            loop: true
        });

        this.alert = this.sound.add("bark_4", {
            volume: 1,
        })

        this.dig = this.sound.add("digging", {
            volume: 1
        });

        // CONTROLS
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // TREASURE
        this.treasure = this.physics.add.sprite(game.config.width / 2 + 200, game.config.height / 2, 'foodbowl')
        this.treasure.body.immovable = true;
        this.treasure.alpha = 0;
        this.treasure.found = false;
        //this.treasure.onOverlap = true;
        this.nearTreasure = false;

        // PLAYER
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'dog_idle');
        this.moveSpeed = 100;
        this.walking = false;
        this.player.setCollideWorldBounds(true);
        this.digging = false;
        //this.player.onOverlap = true;
        //this.player.anims.play('idle');

        // ALERT
        this.notif = this.add.sprite(this.player.x, this.player.y - this.player.height, 'question_mark');
        this.notif.alpha = 0;

        // COLLISION
        //this.physics.add.collider(this.player, this.treasure);
        //this.physics.world.on('overlap', () => {console.log('gah')});

        //this.treasure = this.physics.add.sprite(game.config.width / 2 + 200, game.config.height / 2, 'foodbowl')

    }

    update() {

        //this.player.anims.play('idle');
        //this.player.update();
        //this.movingX = false;
        //this.movingY = false;

        // PLAYER CONTROL
        let playerDirection = new Phaser.Math.Vector2(0, 0);
        if (!this.digging) {
        if(cursors.left.isDown) {
            playerDirection.x = -1;
            this.player.setFlip(true, false);
        }
        if(cursors.right.isDown) {
            playerDirection.x = 1;
            this.player.resetFlip();
        }
        if(cursors.up.isDown) {
            playerDirection.y = -1;
        }
        if(cursors.down.isDown) {
            playerDirection.y = 1;
        }
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

        // COLLISION CHECKING
        //this.physics.world.on('collide', alert);

        if (this.checkCollision(this.player, this.treasure) && !this.treasure.found) {
            if (!this.nearTreasure) {
                this.alert.play();
                this.nearTreasure = true;
                //let alert = this.add.sprite(this.player.x, this.player.y - this.player.height, 'question_mark');
                this.notif.alpha = 1;
                this.notif.anims.play('alert');
            }
            this.notif.x = this.player.x;
            this.notif.y = this.player.y - this.player.height / 1.5;

            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.dig.play();
                //this.player.anims.play('walk', true);
                //this.player.body.immovable = true;
                this.digging = true;
                this.clock = this.time.delayedCall(1500, () => {
                    console.log('bruh');
                    this.digging = false;
                    this.treasure.alpha = 1;
                    this.treasure.found = true;
                    //this.player.body.immovable = false;
                }, null, this);
            }

            //console.log('bruh');
        } else {
            this.nearTreasure = false;
            this.notif.alpha = 0;
            //this.alert.destroy();
        }

    }

    //alert() {
    //    console.log('bruh');
    //}

    checkCollision(player, treasure) {
        if (player.x < treasure.x + treasure.width &&
            player.x + player.width > treasure.x &&
            player.y < treasure.y + treasure.height &&
            player.height + player.y > treasure.y) {
                return true;
            } else {
                return false;
            }
    }

}