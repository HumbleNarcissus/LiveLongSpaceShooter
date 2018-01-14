import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
export default class extends Phaser.State {

    create() {
        game.add.text(100, 100, 'Menu - click space to start',
                       {fill: '#fff'});
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.startGame, this);
    }

    startGame() {
        game.state.start('play');
    }
}