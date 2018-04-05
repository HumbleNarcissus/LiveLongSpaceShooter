import Bullet from './bullets';

export default class Enemy extends Phaser.Sprite {
    constructor({game, x, y, asset, enemyBullets}) {
        super(game, x, y, asset);

        this.anchor.setTo(0.5);
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.enableBody = true;
        this.game.physics.arcade.enable(this);
        this.body.velocity.x = 40;
        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(1, 1);
        
         //enemy bullets
         this.bullets = enemyBullets;
 
         //Set up the bullets
         this.bullets.createMultiple(50, 'bullet');
         this.fireRate = 750;
         this.nextFire = 0;

    }

    update() {
       this.fire();
    }

    fire() {
        if (game.time.now > this.nextFire && this.bullets.countDead() > 0){
            this.nextFire = game.time.now + this.fireRate;
            
            let bullet = this.bullets.getFirstExists(false);

            if (!bullet) {
                bullet = new Bullet({
                    game: this.game,
                    x: this.x,
                    y: this.y,
                    asset: 'bullet'
                });
                this.bullets.add(bullet);
            }
            else {
                bullet.reset(this.x, this.y);
            }
            //bullet speed
            bullet.body.velocity.y = 200;
        }
    }

}