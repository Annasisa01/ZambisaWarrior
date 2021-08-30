class EyeMonster extends Entity{
    /* 
        Eyemonster is a subclass of Entity
        Constructor would recieve the current scene, desired x and y location for entity,
        textureKey and damage to be assigned to the entity
    */
    constructor(scene, x, y, textureKey, damage){
        super(scene,x,y,textureKey,"EyeMonster");
        // Creating anims constant from scene that was passed
        const anims = scene.anims;

        // Initializing all instance variables needed for this entity
        this.damage = damage;
        this.health = 20;
        this.fightingRange = 100;
        this.speed = 30;
        this.attackSpeed = 300;

        // I use this instance variable to set how fast the enemy attacks
        this.maxTimer = this.attackSpeed/this.scene.game.config.globals.level;
        
        // creating attack animation
        anims.create({
            key: 'eyemonster_attack',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "EyeMonster_Attack_", 
                    start: 1, 
                    end: 8, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 10
        });

        // Creating flight animation
        anims.create({
            key: 'eyemonster_flight',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "EyeMonster_Flight_", 
                    start: 1, 
                    end: 8, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 10,
            repeat: -1
        });

        // Creating death animation
        anims.create({
            key: 'eyemonster_death',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "EyeMonster_Death_", 
                    start: 1, 
                    end: 4, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 6
        });

        // Creating hit animation
        anims.create({
            key: 'eyemonster_hit',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "EyeMonster_Hit_", 
                    start: 1, 
                    end: 4, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 5
        });

        // Playing flight animation to start the animation for this enemy
        this.anims.play('eyemonster_flight',true);
    }


    /*
        attack is a void function that plays the attack animation for this entity
    */
    attack(){
        /* 
            diffX is the value added to the x position of the entity to create a lunging
            during the attack animation
        */
        var diffX = this.flipX ? -20 : 20
        this.anims.play('eyemonster_attack', true);
        this.x += diffX;

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
            this.anims.play('eyemonster_flight',true);
            this.x += -diffX;
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
            this.y -=5
            this.anims.play('eyemonster_death',true)
                .on("animationcomplete", ()=>{
                    this.kill();
                });
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
                    this.attacking = true
                }else{
                    this.attackTimer += 1;
                    if (this.attackTimer >= this.maxTimer) {
                        this.attack();
                        this.attackTimer = 0;
                    }
                }
            }else{
                this.attacking = false;
                this.body.setVelocityX(this.flipX ? -100 : 100);
                this.anims.play('eyemonster_flight',true);
                
            }
        }
        
    }
}