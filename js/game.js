import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import loadState from './load';
import playState from './play';
import menuState from './menu';
import endMenuState from './endMenu';


class Game extends Phaser.Game {
    constructor() {
        const width = 420;
        const height = 600;
        
        
        super(width, height, Phaser.AUTO);
        this.state.add('load', loadState);
        this.state.add('menu', menuState);
        this.state.add('play', playState);
        this.state.add('endMenu', endMenuState);
        
        
        this.state.start('load')
        
    }
}

window.game = new Game();