import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import Player from './prefabs/player';

export default class extends Phaser.State {
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
            frame: 1
        });
        
        //Control
        this.cursors = game.input.keyboard.createCursorKeys();

        //Creating bullets
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        //Set up the bullets
        this.bullets.createMultiple(50, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.fireRate = 300;
        this.nextFire = 0;


        //creating enemies
        this.enemies = this.add.group()
        this.enemies.enableBody = true;
        this.physics.enable(this.enemies, Phaser.Physics.ARCADE);

        //effects
        this.emitter = this.add.emitter(0,0,100);
        this.emitter.makeParticles('enemy');
        this.emitter.gravity = 200;

        //level data
        this.numLevels = 3;
        this.currentLevel = 1;
        
        //loadLevel
        //load level from json data
        this.loadLevel();

        //audio
        this.laser = game.add.audio('laser');
        
    }

    loadLevel() {
        console.log(this.currentLevel);
        this.levelData = JSON.parse(this.cache.getText('level' + this.currentLevel));
    //create enemies from json level data

        this.levelData.enemies.forEach( enemy => {
            this.enemies.create(50 + Math.random() * 200,
                           50 + Math.random() * 200,
                           'enemy')
        });

    console.log('enemies', this.enemies.length)
    }
    kill(enemy, target) {
        this.emitter.x = enemy.x;
        this.emitter.y = enemy.y;
        this.emitter.start(true, 500, null, 100);
        enemy.kill();
        target.kill();
        this.enemies.remove(target);
    }
    
    //player fire
    fire() {
        if (this.time.now > this.nextFire && this.bullets.countDead() > 0){
            this.nextFire = this.time.now + this.fireRate;
            
            let bullet = this.bullets.getFirstDead();
            
            bullet.reset(this.player.x, this.player.y);
            bullet.body.velocity.y = -200;
        }
    }
    
   
    update() {
        //collisions
        this.physics.arcade.collide(this.bullets, this.enemies, this.kill, null, this);
        
        if (this.cursors.left.isDown){
            this.player.x -= 2;
	    } 
        
	    if (this.cursors.right.isDown){
            this.player.x += 2;
        } 
        
        if(this.cursors.up.isDown){
            this.fire();
            this.laser.play();
        }

         //end level after killing all enemies
        if(this.enemies.length === 0) {
            setTimeout(function() {
                this.game.state.start('endMenu');
            }, 2000);
        }
    }
};

