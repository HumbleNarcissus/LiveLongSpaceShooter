import Bullet from './bullets';

export default class Player extends Phaser.Sprite {
    constructor({game, x, y, asset, health}){
        super(game, x, y, asset);

        this.game = game;
        this.anchor.setTo(0.5);
        this.health = health;
        this.maxhealth = health;

        //physics
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.game.stage.addChild(this);

        //player bullets
        this.bullets = game.add.group();
        this.bullets.enableBody = true;


        //Set up the bullets
        this.bullets.createMultiple(50, 'bullet');
        this.fireRate = 300;
        this.nextFire = 0;

    }


    //player shooting
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
            bullet.body.velocity.y = -200;
        }
    }
}