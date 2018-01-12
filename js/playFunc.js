playState.kill = function(enemy, target){
    this.emitter.x = enemy.x;
    this.emitter.y = enemy.y;
    this.emitter.start(true, 500, null, 100);
    enemy.kill();
    target.kill();
}

playState.fire = function(){
    if (game.time.now > this.nextFire && this.bullets.countDead() > 0){
        this.nextFire = game.time.now + this.fireRate;
        
        let bullet = this.bullets.getFirstDead();
        
        bullet.reset(this.player.x, this.player.y);
        bullet.body.velocity.y = -200;
    }
    
}


playState.loadLevel = function(){
    console.log(this.currentLevel);
    this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));
     //end of the level timer
    this.endOfLevelTimer = this.game.time.events.add(this.levelData.duration * 1000, function(){
        console.log('level ended!');
        if(this.currentLevel < this.numLevels) {
            this.currentLevel++;
        }
    });
}