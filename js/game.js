var game = new Phaser.Game(420, 480, Phaser.AUTO, '');

//game states
game.state.add('play', playState);
game.state.add('load', loadState);
game.state.add('endMenu', endMenuState);
game.state.add('menu', menuState);


//starting game
game.state.start('load')