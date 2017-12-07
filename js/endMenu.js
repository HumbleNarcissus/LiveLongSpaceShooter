var endMenuState = {
    
        create: function () {
            game.add.text(100, 100, 'End. Press space to restart!',
                           {fill: '#fff'});
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spaceKey.onDown.add(this.startGame, this);
        },
    
        startGame: function(){
            game.state.start('play');
        }
    }