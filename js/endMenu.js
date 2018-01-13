var endMenuState = {
    
        create: function () {
            game.add.text(50, 50, 'End of level.\nPress space to restart!',
                           {fill: '#fff'});
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spaceKey.onDown.add(this.startGame, this);
        },
    
        startGame: function(){
            game.state.start('play');
        }
    }