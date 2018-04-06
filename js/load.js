import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
//Load state
export default class extends Phaser.State {
    preload() {
        //images etc
        this.load.image('player', 'assets/player.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('heart', 'assets/heart.png');

        //audio
        this.load.audio('laser', 'audio/laser.wav');

        //level data
        this.load.text('level1', 'levels/level1.json');
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.stage.backgroundColor = "#555";
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
       
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('play');
    }
}