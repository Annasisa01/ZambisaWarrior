class Goblin extends Enemies{
    constructor(scene, x, y, textureKey, damage){
        super(scene,x,y,textureKey,"GoblinMonster");
        this.x = x;
        const anims = scene.anims;
        this.damage = damage;
        this.health = 30;
        this.fightingRange = 100;
        this.speed = 100;

        // I can use this timer to set difficulty of the game
        this.maxTimer = 250/this.scene.game.config.globals.level;

        // creating attack animation
        anims.create({
            key: 'goblin_attack',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Goblin_Attack_", 
                    start: 1, 
                    end: 8, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 10
        });

        // creating idle animation
        anims.create({
            key: 'goblin_idle',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Goblin_Idle_", 
                    start: 1, 
                    end: 4, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 5,
            repeat: -1
        });

        // creating run animation
        anims.create({
            key: 'goblin_run',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Goblin_Run_", 
                    start: 1, 
                    end: 8, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 10,
            repeat: -1
        });

        // creating death animation
        anims.create({
            key: 'goblin_death',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Goblin_Death_", 
                    start: 1, 
                    end: 4, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 5
        });

        // creating hit animation
        anims.create({
            key: 'goblin_hit',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Goblin_Hit_", 
                    start: 1, 
                    end: 4, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 5
        });

        this.anims.play('goblin_run',true);
    }

    /*
        attack is a void function that plays the attack animation for this entity
    */
    attack(){
        this.anims.play('goblin_attack', true);

        /* 
            event listener that is called every time the attack animatoin is completed.
            It changes the instance variable causeDamage to true which would later cause the
            player's health to be reduced.
            It changes the instance variable attacking to false, which would cause this entity
            to return back to idle state
        */
        this.on('animationcomplete', ()=>{
            this.causedDamage = true
            this.attacking = false;
            this.anims.play('goblin_idle',true);
        })
    }

    update(time,delta){
        /*
            if the entity's health is less than 0 change the instance variables 
            attacking and contactedPlayer to false, which would cause entity to 
            stop following the player.
            Reduces entity's y position to add to the entity's death animation
            Once the death animation is completed, this entity calls the void
            kill function from it's super class which destroys the entity 
        */
        if (this.health <= 0) {
            this.contactedPlayer = false
            this.attacking = false;
            this.anims.play('goblin_death',true)
                .on("animationcomplete", ()=>{
                    this.kill();
                })
        }
        
        this.enemyBlocked = this.body.blocked;
        /*
            Check what side the enemy is colliding on
            if it's left, set flipX to false
            if it's right, set flipX to true
            Note: flipX is an instance variable that is used to set the direction
            of the entity
        */
        if (this.enemyBlocked.left) {
            this.flipX = false;
            this.body.setVelocity(this.speed,0);
        }
        else if (this.enemyBlocked.right) {
            this.flipX = true;
            this.body.setVelocity(-this.speed,0);
        }

        /*
            if this entity has contacted player set the direction to face the player.
            if this entity is in range to attack set velocity to 0
            if this entity is not attacking, set instance variable attacking to true
            else increase instance variable attackTime by 1
            if attackTimer is greater than or equals to maxTimer, call the attack function
            and set the attackTimer to 0
            Else, if the entity is not in range, set attacking to false and play the flight 
            animation
        */
        if (this.contactedPlayer) {
            this.flipX = this.aheadOfPlayer
            if (this.inRange) {
                this.body.setVelocityX(0);
                if (!this.attacking) {
                    console.log("not attack");
                    this.anims.play('goblin_idle',true)
                    this.attacking = true
                }else{
                    this.attackTimer += 1;
                    if (this.attackTimer >= this.maxTimer) {
                        console.log("attack");

                        this.attack();
                        this.attackTimer = 0;
                    }
                }
            }else{
                this.attacking = false;
                this.body.setVelocityX(this.flipX ? -100 : 100);
                this.anims.play('goblin_run',true);
                
            }
        }
        
    }
}