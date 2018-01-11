
var playState = {
    create: function() {
        //background
        this.background = this.add.tileSprite(0,0, this.game.world.width,
            this.game.world.height, 'background');
        this.background.autoScroll(0,30);

        //player
        this.player = game.add.sprite(game.world.centerX, game.world.centerY+200, 'player');
        this.player.anchor.setTo(0.5);
        //this.player.scale.setTo(3, 3);

        //player physics
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;

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
        this.enemy = game.add.sprite(game.world.centerX, game.world.centerY, 'enemy');
        this.enemy.scale.setTo(1.5 , 1.5);
        this.enemy.anchor.setTo(0.5);
        game.physics.enable(this.enemy, Phaser.Physics.ARCADE);

        //effects
        this.emitter = game.add.emitter(0,0,100);
        this.emitter.makeParticles('enemy');
        this.emitter.gravity = 200;

    },

    fire: function(){
        if (game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = game.time.now + this.fireRate;
    
            let bullet = this.bullets.getFirstDead();
    
            bullet.reset(this.player.x, this.player.y);
            bullet.body.velocity.y = -200;
        }
    
    },

    kill: function(enemy, target){
        this.emitter.x = enemy.x;
        this.emitter.y = enemy.y;
        this.emitter.start(true, 500, null, 100);
        enemy.kill();
        target.kill();
    },

    update: function() {
        
        //collisions
        game.physics.arcade.collide(this.bullets, this.enemy, this.kill, null, this);

        if (this.cursors.left.isDown){
	        this.player.x -= 2;
	    } 

	    if (this.cursors.right.isDown){
	        this.player.x += 2;
        } 
        
        if(this.cursors.up.isDown){
            this.fire();
        }

    }
};
