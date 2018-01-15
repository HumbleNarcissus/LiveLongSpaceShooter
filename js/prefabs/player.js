import Bullet from './bullets';

export default class Player extends Phaser.Sprite {
    constructor({game, x, y, asset, frame, health}){
        super(game, x, y, frame);

        this.game = game;
        this.anchor.setTo(0.5);
        this.health = health;
        this.maxhealth = health;

        //physics
        this.game.physics.arcade.enable(this);
        this.player.body.collideWorldBounds = true;
    }
}