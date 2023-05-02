//class Player extends Phaser.GameObjects.Sprite {
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        
        //scene.add.existing(this);
        //var custom_body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
        //this.scene.physics.world.enableBody(this, 0);
        scene.physics.add.existing(this);
        this.moveSpeed = 100;
        this.walking = false;
        //console.log('bruh');
        //scene.physics.add.sprite(x, y, texture);

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

        //this.footsteps = this.sound.add("footsteps", {
        //    volume: 1,
        //    loop: true
        //});
    }

    update() {
        let playerDirection = new Phaser.Math.Vector2(0, 0);

        if(cursors.left.isDown) {
            playerDirection.x = -1;
            this.setFlip(true, false);
        }
        if(cursors.right.isDown) {
            playerDirection.x = 1;
            this.resetFlip();
        }
        if(cursors.up.isDown) {
            playerDirection.y = -1;
        }
        if(cursors.down.isDown) {
            playerDirection.y = 1;
        }
        if (playerDirection.x != 0 || playerDirection.y != 0) {
            this.anims.play('walk', true);
            if (this.walking === false) {
                //this.footsteps.play();
                this.walking = true;
            }
        } else {
            this.anims.play('idle', true);
            //this.footsteps.stop();
            this.walking = false;
        }
        playerDirection.normalize();
        this.setVelocity(playerDirection.x * this.moveSpeed, playerDirection.y * this.moveSpeed);

    }
}