import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import Player from './prefabs/player';
import Enemy from './prefabs/enemy';
import Bullet from './prefabs/bullets';

export default class Play extends Phaser.State {
    create(){
        //background
        this.background = this.add.tileSprite(0,0, this.world.width,
            this.world.height, 'background');
        this.background.autoScroll(0,30);

        //player
        this.player = new Player({
            game: this.game,
            x: this.game.world.centerX,
            y: this.game.world.centerY + 250,
            asset: 'player',
            health: 3
        });

        //control
        this.cursors = game.input.keyboard.createCursorKeys();

        //health
        this.health = this.add.group();
        for(let i = 0; i < this.player.health; i++){
            let heart = this.game.add.sprite(0 + i*35, 0, 'heart');
            this.health.add(heart);
        }
        
        //enemies group
        this.enemies = this.add.group();
        this.enemies.enableBody = true;
        this.physics.enable(this.enemies, Phaser.Physics.ARCADE);

        //enemies bullets
        this.enemyBullets = this.add.group();
        this.enemyBullets.enableBody = true;
        this.physics.enable(this.enemyBullets, Phaser.Physics.ARCADE);

        //effects
        this.emitter = this.add.emitter(0,0,100);
        this.emitter.makeParticles('enemy');
        this.emitter.gravity = 200;

        //level data
        this.numLevels = 3;
        this.currentLevel = 1;
        
        //load level from json data
        this.loadLevel();

        //audio
        this.laser = game.add.audio('laser');
        
    }

    loadLevel() {
        //parse level from json
        console.log(this.currentLevel);
        this.levelData = JSON.parse(this.cache.getText('level' + this.currentLevel));
        
        //create enemies from json level data
        this.levelData.enemies.forEach( enemy => {
            enemy = new Enemy({
                game: this.game,
                x: 50 + Math.random() * 200,
                y: 50 + Math.random() * 200,
                asset: 'enemy',
                enemyBullets: this.enemyBullets
            });
            this.enemies.add(enemy);
        });
    }

    kill(enemy, target) {
        this.emitter.x = enemy.x;
        this.emitter.y = enemy.y;
        this.emitter.start(true, 500, null, 100);
        enemy.kill();
        target.kill();
        this.enemies.remove(target);
    }

    killPlayer(player, target) {
        //check player health
        player.loseHealth();
        target.kill();
        this.health.remove(this.health.getTop());
        //end game if health <= 0
        if(player.health <= 0){
            player.kill();
            this.game.state.start('endMenu');
        }
    }
      
    update() {
        //collisions
        this.physics.arcade.collide(this.player.bullets, this.enemies, this.kill, null, this);
        this.physics.arcade.collide(this.enemyBullets, this.player, this.killPlayer, null, this);


        if (this.cursors.left.isDown){
            this.player.x -= 2;
	    } 
        
	    if (this.cursors.right.isDown){
            this.player.x += 2;
        } 
        
        if(this.cursors.up.isDown){
            this.player.fire();
            this.laser.play();
        }

        this.enemies.forEach(enemy => enemy.update());
    
         //end level after killing all enemies
        if(this.enemies.length === 0) {
            let timer = this.game.time.create(this.game, true);
            timer.add(3000, () => {
                this.player.destroy();
                this.game.state.start('endMenu');
            });
            timer.start();
        }
    }
};

