//kill enemy
playState.kill = function(enemy, target){
    this.emitter.x = enemy.x;
    this.emitter.y = enemy.y;
    this.emitter.start(true, 500, null, 100);
    enemy.kill();
    target.kill();
    this.enemies.remove(target);
}

//player fire
playState.fire = function(){
    if (game.time.now > this.nextFire && this.bullets.countDead() > 0){
        this.nextFire = game.time.now + this.fireRate;
        
        let bullet = this.bullets.getFirstDead();
        
        bullet.reset(this.player.x, this.player.y);
        bullet.body.velocity.y = -200;
    }
    
}

//load level from json data
playState.loadLevel = function(){
    console.log(this.currentLevel);
    this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
    //create enemies from json level data

    this.levelData.enemies.forEach( enemy => {
        this.enemies.create(50 + Math.random() * 200,
                            50 + Math.random() * 200,
                            'enemy')
    });

    console.log('enemies', this.enemies.length)

    
    //end of the level timer
   /* this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, function(){
        if(this.enemies.length === 0) {
            console.log('level ended!');
            //this.currentLevel++;
        }
    }); */
}

