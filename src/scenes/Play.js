
class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('foodbowl', './assets/foodbowl.png');
        this.load.image('bone', './assets/bone.png');
        this.load.image('banana', './assets/banana_peel.png');
        this.load.image('apple', './assets/apple_core.png');
        this.load.image('fishbone', './assets/fish_bone.png');
        this.load.image('sock', './assets/dirty_sock.png');

        this.load.image('dirt', './assets/dirt_mound.png');
        this.load.image('grass', './assets/grass.png');
        this.load.image('fence', './assets/fence.png');
        this.load.image('tree', './assets/tree.png');
        this.load.image('pond', './assets/pond.png');

        this.load.image('failure', './assets/failure.png');
        this.load.image('success', './assets/victory.png');

        // Player dog
        this.load.spritesheet('dog_idle', './assets/dog_idle.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('dog_walk', './assets/dog_walk.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('dog_dig', './assets/dog_dig.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 2});
        this.load.spritesheet('dog_bark', './assets/dog_bark.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});

        // Brown dog
        this.load.spritesheet('dog2_idle', './assets/brown_idle.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('dog2_walk', './assets/brown_walk.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('dog2_bark', './assets/brown_bark.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});

        // Beige dog
        this.load.spritesheet('dog3_idle', './assets/beige_idle.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('dog3_walk', './assets/beige_walk.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});
        this.load.spritesheet('dog3_bark', './assets/beige_bark.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1});

        this.load.spritesheet('question_mark', './assets/question_mark.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
    }

    create() {

        this.grass = this.add.tileSprite(0, 0, 720, 640, 'grass').setOrigin(0, 0);
        this.fence = this.add.tileSprite(0, 0, 720, 640, 'fence').setOrigin(0, 0);

        // ANIMATIONS

        if (!this.anims.exists('idle')) {
            // PLAYER
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
                key: 'dig',
                frames: this.anims.generateFrameNumbers('dog_dig', {start: 0, end: 2, first: 0}),
                frameRate: 3,
                repeat: 2
            });
            this.anims.create({
                key: 'bark',
                frames: this.anims.generateFrameNumbers('dog_bark', {start: 0, end: 1, first: 0}),
                frameRate: 3,
                repeat: 3
            });

            // BROWN DOG
            this.anims.create({
                key: 'idle2',
                frames: this.anims.generateFrameNumbers('dog2_idle', {start: 0, end: 1, first: 0}),
                frameRate: 3,
                repeat: -1
            });
            this.anims.create({
                key: 'walk2',
                frames: this.anims.generateFrameNumbers('dog2_walk', {start: 0, end: 1, first: 0}),
                frameRate: 3,
                repeat: -1
            });
            this.anims.create({
                key: 'bark2',
            frames: this.anims.generateFrameNumbers('dog2_bark', {start: 0, end: 1, first: 0}),
                frameRate: 3,
                repeat: 3
            });

            // BEIGE DOG
            this.anims.create({
                key: 'idle3',
                frames: this.anims.generateFrameNumbers('dog3_idle', {start: 0, end: 1, first: 0}),
                frameRate: 3,
                repeat: -1
            });
            this.anims.create({
                key: 'walk3',
                frames: this.anims.generateFrameNumbers('dog3_walk', {start: 0, end: 1, first: 0}),
                frameRate: 3,
                repeat: -1
            });
            this.anims.create({
                key: 'bark3',
                frames: this.anims.generateFrameNumbers('dog3_bark', {start: 0, end: 1, first: 0}),
                frameRate: 3,
                repeat: 3
            });
        

            // EXTRA
            this.anims.create({
                key: 'alert',
                frames: this.anims.generateFrameNumbers('question_mark', {start: 0, end: 2, first: 0}),
                frameRate: 3,
            });
        }

        // SOUNDS
        this.music = this.sound.add("music", {
            volume: 0.5,
            loop: true
        });

        this.footsteps = this.sound.add("footsteps", {
            volume: 1,
            loop: true
        });

        this.alert = this.sound.add("bark_4", {
            volume: 0.5,
        });

        this.dig = this.sound.add("digging", {
            volume: 1
        });

        this.victory = this.sound.add("victory", {
            volume: 0.5
        });

        this.defeat = this.sound.add("defeat", {
            volume: 0.5
        });

        this.badItem = this.sound.add("bad_item", {
            volume: 1,
        });

        this.bark1 = this.sound.add("bark_1", {
            volume: 1
        });

        this.bark2 = this.sound.add("bark_2", {
            volume: 1
        });

        this.bark3 = this.sound.add("bark_3", {
            volume: 1
        });

        // CONTROLS
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // TREASURES
        this.treasures = [];
        this.treasures.push(this.physics.add.sprite(game.config.width / 2 + 200, game.config.height / 2, 'dirt'));
        this.treasures[0].identity = 'bone';
        this.treasures.push(this.physics.add.sprite(game.config.width / 2 - 200, game.config.height / 2, 'dirt'));
        this.treasures[1].identity = 'fishbone';
        this.treasures.push(this.physics.add.sprite(game.config.width / 2, game.config.height / 2 + 200, 'dirt'));
        this.treasures[2].identity = 'apple';
        this.treasures.push(this.physics.add.sprite(game.config.width / 2, game.config.height / 2 - 200, 'dirt'));
        this.treasures[3].identity = 'banana';
        this.treasures.push(this.physics.add.sprite(game.config.width / 2 + 200, game.config.height / 2 + 200, 'dirt'));
        this.treasures[4].identity = 'sock';
        
        for (let i = 0; i < this.treasures.length; i++) {
            this.treasures[i].body.immovable = true;
            this.treasures[i].alpha = 0;
            this.treasures[i].found = false;
            this.treasures[i].near = false;
            this.treasures[i].x = Math.floor(Math.random() * 500) + 75;
            this.treasures[i].y = Math.floor(Math.random() * 450) + 150;
        }
        
        this.pond = this.add.tileSprite(0, 0, 720, 640, 'pond').setOrigin(0, 0);

        // PLAYER
        this.player = this.physics.add.sprite(game.config.width / 2, 50, 'dog_idle');
        this.moveSpeed = 100;
        this.walking = false;
        this.player.setCollideWorldBounds(true);
        this.digging = false;
        this.distracted = false;

        // BROWN DOG
        this.dog1 = this.physics.add.sprite(100, 500, 'dog2_idle');
        this.dog1.anims.play('idle2');
        this.dog1.alerted = false;
        this.dog1.body.immovable = true;
        this.dog1.moveSpeed = 100;
        this.dog1.direction = 1;
        this.dog1.idle = false;

        // BEIGE DOG
        this.dog2 = this.physics.add.sprite(630, 170, 'dog3_idle');
        this.dog2.anims.play('idle3');
        this.dog2.alerted = false;
        this.dog2.body.immovable = true;
        this.dog2.moveSpeed = 100;
        this.dog2.direction = -1;
        this.dog2.flipX = true;
        this.dog2.idle = false;

        // ALERT
        this.notif = this.add.sprite(this.player.x, this.player.y - this.player.height, 'question_mark');
        this.notif.alpha = 0;

        // TREE BASE
        this.stump = this.physics.add.sprite(150, 290, 'dirt');
        this.stump.alpha = 0;
        this.stump.body.immovable = true;
        this.physics.add.collider(this.player, this.stump);
        this.tree = this.add.tileSprite(0, 0, 720, 640, 'tree').setOrigin(0, 0);

        // TIMER
        this.clock = this.time.delayedCall(60000, () => {this.Lose()}, null, this);

        // DISPLAY TEXT
        let gameConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            color: '#000000',
            backgroundColor: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 275
        };
        this.timeDisplay = this.add.text(game.config.width - 285, 10, "PARK CLOSES IN "+this.clock.delay / 1000+" SECONDS", gameConfig);
        gameConfig.align = 'left';
        this.escText = this.add.text(10, 10, "(ESC) TO RETURN TO MENU", gameConfig);

        this.gameOver = false;
        this.music.play();
    }

    update() {
        this.timeDisplay.text = "PARK CLOSES IN "+Math.ceil((this.clock.delay - this.clock.elapsed) / 1000)+" SECONDS";

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.music.stop();
            this.scene.start('menuScene');
        }

        // PLAYER CONTROL
        if (!this.gameOver) {
            let playerDirection = new Phaser.Math.Vector2(0, 0);
            if (!this.digging && !this.player.distracted) {
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
            }
            playerDirection.normalize();
            this.player.setVelocity(playerDirection.x * this.moveSpeed, playerDirection.y * this.moveSpeed);
        }

        // BROWN DOG UPDATE
        if (!this.gameOver && !this.dog1.alerted) {
            if (this.dog1.moveSpeed != 0) {
                this.dog1.anims.play('walk2', true);
                this.dog1.setVelocity(this.dog1.direction * this.dog1.moveSpeed, 0);
                this.dog1.flipX = this.dog1.direction * this.dog1.moveSpeed < 1 ? true : false;
            } else {
                this.dog1.anims.play('idle2', true);
            }
            if (this.dog1.x > 320) {
                if (this.dog1.moveSpeed != 0 && this.dog1.direction == 1) {
                    this.dog1.moveSpeed = 0;
                    this.dog1.setVelocity(0, 0);
                    this.dog1.idle = true;
                }
            } else if (this.dog1.x < 75) {
                if (this.dog1.moveSpeed != 0 && this.dog1.direction == -1) {
                    this.dog1.moveSpeed = 0;
                    this.dog1.setVelocity(0, 0);
                    this.dog1.idle = true;
                }
            }
            if (this.dog1.idle) {
                this.dog1.idle = false;
                this.dog1delay = this.time.delayedCall(5000, () => {
                    this.dog1.direction = this.dog1.direction == 1 ? -1 : 1;
                    this.dog1.moveSpeed = 100;
                    this.dog1.flipX = this.dog1.direction == 1 ? false : true;
                }, null, this);
            }   
        }
        if (!this.gameOver && this.checkNear(this.player, this.dog1) && !this.dog1.alerted) {
            if (this.dog1.x > this.player.x) {
                this.dog1.setFlip(true, false);
                if (this.player.flipX == true) {
                    this.player.flipX = false;
                }
            } else if (this.player.flipX == false) {
                this.player.flipX = true;
            }
            this.dog1.setVelocity(0, 0);
            this.dog1.alerted = true;
            this.dog1.anims.play('bark2', true);
            this.bark3.play();

            this.player.distracted = true;
            this.player.anims.play('bark', true);
            this.footsteps.stop();
            this.alert.play();

            this.stunTime = this.time.delayedCall(3000, () => {
                this.player.distracted = false;
                this.dog1.anims.play('idle2', true);
            }, null, this);
            this.stunTime = this.time.delayedCall(6000, () => {
                this.dog1.alerted = false;
            }, null, this);

        }

        // BEIGE DOG UPDATE
        if (!this.gameOver && !this.dog2.alerted) {
            if (this.dog2.moveSpeed != 0) {
                this.dog2.anims.play('walk3', true);
                this.dog2.setVelocity(this.dog2.direction * this.dog2.moveSpeed, 0);
                this.dog2.flipX = this.dog2.direction * this.dog2.moveSpeed < 1 ? true : false;
            } else {
                this.dog2.anims.play('idle3', true);
            }
            if (this.dog2.x > 630) {
                if (this.dog2.moveSpeed != 0 && this.dog2.direction == 1) {
                    this.dog2.moveSpeed = 0;
                    this.dog2.setVelocity(0, 0);
                    this.dog2.idle = true;
                }
            } else if (this.dog2.x < 75) {
                if (this.dog2.moveSpeed != 0 && this.dog2.direction == -1) {
                    this.dog2.moveSpeed = 0;
                    this.dog2.setVelocity(0, 0);
                    this.dog2.idle = true;
                }
            }
            if (this.dog2.idle) {
                this.dog2.idle = false;
                this.dog2delay = this.time.delayedCall(5000, () => {
                    this.dog2.direction = this.dog2.direction == 1 ? -1 : 1;
                    this.dog2.moveSpeed = 100;
                    this.dog2.flipX = this.dog2.direction == 1 ? false : true;
                }, null, this);
            }   
        }
        if (!this.gameOver && this.checkNear(this.player, this.dog2) && !this.dog2.alerted) {
            if (this.dog2.x > this.player.x) {
                this.dog2.setFlip(true, false);
                if (this.player.flipX == true) {
                    this.player.flipX = false;
                }
            } else if (this.player.flipX == false) {
                this.player.flipX = true;
            }
            this.dog2.setVelocity(0, 0);
            this.dog2.alerted = true;
            this.dog2.anims.play('bark3', true);
            this.bark3.play();

            this.player.distracted = true;
            this.player.anims.play('bark', true);
            this.footsteps.stop();
            this.alert.play();

            this.stunTime = this.time.delayedCall(3000, () => {
                this.player.distracted = false;
                this.dog2.anims.play('idle3', true);
            }, null, this);
            this.stunTime = this.time.delayedCall(6000, () => {
                this.dog2.alerted = false;
            }, null, this);

        }


        // TREASURE UPDATING
        for (let i = 0; i < this.treasures.length; i++) {
            if (!this.gameOver && !this.player.distracted && this.checkCollision(this.player, this.treasures[i]) && !this.treasures[i].found) {
                if (!this.treasures[i].near) {
                    this.alert.play();
                    this.treasures[i].near = true;
                    this.notif.alpha = 1;
                    this.notif.anims.play('alert');
                }
                this.notif.x = this.player.x;
                this.notif.y = this.player.y - this.player.height / 1.5;

                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    this.dig.play();
                    this.player.anims.play('dig', true);
                    this.digging = true;
                    this.treasures[i].found = true;
                    this.digTime = this.time.delayedCall(1500, () => {
                        this.digging = false;
                        this.treasures[i].alpha = 1;
                        this.treasures[i].near = false;

                        this.currentTreasure = this.add.sprite(this.player.x, this.player.y - this.player.height / 1.5, this.treasures[i].identity);
                        if (this.treasures[i].identity == 'bone') {
                            this.Win();
                        } else {
                            this.badItem.play();
                        }

                    }, null, this);
                }

            } else {
                this.treasures[i].near = false;
            }
        }

        this.nearTreasure = false;
        for (let i = 0; i < this.treasures.length; i++) {
            if (this.treasures[i].near) {
                this.nearTreasure = true;
            }
        }
        if (!this.nearTreasure) {
            this.notif.alpha = 0;
        }
    }

    Win() {
        if (!this.gameOver) {
            this.music.stop();
            this.victory.play();
            this.gameOver = true;
            this.add.sprite(game.config.width / 2, game.config.height / 2, 'success');
            this.player.anims.play('idle', true);
        }
    }

    Lose() {
        if (!this.gameOver) {
            this.music.stop();
            this.defeat.play();
            this.player.setVelocity(0, 0);
            this.gameOver = true;
            this.add.sprite(game.config.width / 2, game.config.height / 2, 'failure');
            this.player.anims.play('idle', true);
        }
    }

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

    checkNear(player, treasure) {
        if (player.x < treasure.x + treasure.width + 10 &&
            player.x + player.width > treasure.x - 10 &&
            player.y < treasure.y + treasure.height + 10 &&
            player.height + player.y > treasure.y - 10) {
                return true;
            } else {
                return false;
            }
    }

}