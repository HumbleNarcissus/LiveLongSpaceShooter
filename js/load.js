var loadState = {

    preload: function(){
        game.load.image('player', 'assets/player.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('enemy', 'assets/enemy.png');
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