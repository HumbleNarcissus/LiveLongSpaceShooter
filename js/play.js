import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

export default class extends Phaser.State {
    create() {
        //background
        const background = this.add.tileSprite(0,0, this.world.width,
            this.world.height, 'background');
        background.autoScroll(0,30);

        //player
        let player = game.add.sprite(game.world.centerX, game.world.centerY+200, 'player');
        player.anchor.setTo(0.5);
        //this.player.scale.setTo(3, 3);
        //player physics
        this.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        console.log("hehehe");

        //Control
        let cursors = game.input.keyboard.createCursorKeys();

        //Creating bullets
        let bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        //Set up the bullets
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        let fireRate = 300;
        let nextFire = 0;


        //creating enemies
        let enemies = this.add.group()
        enemies.enableBody = true;
        this.physics.enable(enemies, Phaser.Physics.ARCADE);

        //effects
        let emitter = this.add.emitter(0,0,100);
        emitter.makeParticles('enemy');
        emitter.gravity = 200;

        //level data
        let numLevels = 3;
        let currentLevel = 1;
        console.log('current level:' + this.currentLevel);

        //loadLevel
        //load level from json data
        let loadLevel = function() {
        console.log(currentLevel);
        const levelData = JSON.parse(this.cache.getText('level' + currentLevel));
        //create enemies from json level data
    
        levelData.enemies.forEach( enemy => {
            enemies.create(50 + Math.random() * 200,
                           50 + Math.random() * 200,
                           'enemy')
        });
    
        console.log('enemies', enemies.length)
    }

        //audio
        let laser = game.add.audio('laser');
        
    }
    kill(enemy, target) {
        emitter.x = enemy.x;
        emitter.y = enemy.y;
        emitter.start(true, 500, null, 100);
        enemy.kill();
        target.kill();
        enemies.remove(target);
    }
    
    //player fire
    fire() {
        if (time.now > nextFire && bullets.countDead() > 0){
            nextFire = time.now + fireRate;
            
            let bullet = bullets.getFirstDead();
            
            bullet.reset(player.x, player.y);
            bullet.body.velocity.y = -200;
        }
    }
    
   
    update() {
        //collisions
       // this.physics.arcade.collide(this.bullets, this.enemies, this.kill, null, null);
        console.log("this.player",this.player);
        
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
                this.state.start('endMenu');
            }, 2000);
        }
    }
};

