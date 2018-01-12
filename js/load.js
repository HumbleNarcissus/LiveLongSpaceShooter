var loadState = {

    preload: function(){
        //images etc
        game.load.image('player', 'assets/player.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('enemy', 'assets/enemy.png');

        //audio
        game.load.audio('laser', 'audio/laser.wav');

        //level data
        game.load.text('level1', 'levels/level1.json');
    },

    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.stage.backgroundColor = "#555";
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
       
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('play');
    }
}