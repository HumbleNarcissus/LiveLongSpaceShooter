import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

export default class extends Phaser.State {
    
        create() {
            game.add.text(50, 50, 'End of level.\nPress space to restart!',
                           {fill: '#fff'});
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spaceKey.onDown.add(this.startGame, this);
        }
    
        startGame() {
            game.state.start('play');
        }
    }