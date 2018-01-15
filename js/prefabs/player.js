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
    }
}