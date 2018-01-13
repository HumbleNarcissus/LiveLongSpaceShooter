
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
        this.enemies = game.add.group()
        this.enemies.enableBody = true;
        game.physics.enable(this.enemies, Phaser.Physics.ARCADE);

        //effects
        this.emitter = game.add.emitter(0,0,100);
        this.emitter.makeParticles('enemy');
        this.emitter.gravity = 200;

        //level data
        this.numLevels = 3;
        this.currentLevel = 1;
        console.log('current level:' + this.currentLevel);

        //loadLevel
        this.loadLevel();

        //audio
        this.laser = game.add.audio('laser');
        
    },
    update: function() {
        
        //collisions
        game.physics.arcade.collide(this.bullets, this.enemies, this.kill, null, this);
        
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
                game.state.start('endMenu');
            }, 2000);
        }
    }
};

