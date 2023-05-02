class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        
        //scene.add.existing(this);
        this.moveSpeed = 2;
        return scene.physics.add.sprite(x, y, texture);
    }

    update() {
        //let playerDirection = new Phaser.Math.Vector2(0, 0);

        if (cursors.left.isDown && this.x >= this.width) {
            this.setVelocityX(-this.moveSpeed);
            //this.x -= this.moveSpeed;
            //playerDirection.x = -1;
        }
        if (cursors.right.isDown && this.x <= game.config.width - this.width) {
            //this.x += this.moveSpeed;
            //playerDirection.x = 1;
        }
        if (cursors.up.isDown && this.y >= this.height) {
            //this.y -= this.moveSpeed;
            //playerDirection.y = -1;
        }
        if (cursors.down.isDown && this.y <= game.config.height - this.height) {
            //this.y += this.moveSpeed;
            //playerDirection.y = 1;
        }
        //moveTo(this, this.x + playerDirection.x, this.y + playerDirection.y, 5);

    }
}