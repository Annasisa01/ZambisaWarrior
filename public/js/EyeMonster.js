class EyeMonster extends Entity{
    constructor(scene, x, y, textureKey, damage){
        super(scene,x,y,textureKey,"EyeMonster");

        this.x = x;
        const anims = scene.anims;
        this.causedDamage = false;
        this.damage = damage;
        this.textureKey = textureKey;
        this.inRange = false;
        this.attacking = false;
        this.justDied = false;
        this.aheadOfPlayer = true;
        this.health = 20;
        this.fightingRange = 100;
        this.contactedPlayer = false;
        this.attackTimer = 0;
        this.speed = 30;
        this.resource = 0;
        this.timer = 0;

        // I can use this timer to set difficulty of the game
        this.maxTimer = 300/this.scene.game.config.globals.level;

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

        this.anims.play('eyemonster_flight',true);
    }

    attack(){
        var diffX = this.flipX ? -20 : 20
        this.anims.play('eyemonster_attack', true);
        this.x += diffX;
        this.on('animationcomplete', ()=>{
            this.causedDamage = true
            this.attacking = false;
            this.anims.play('eyemonster_flight',true);
            this.x += -diffX;
        })
    }

    update(time,delta){
        // this.timer += delta;
        // // console.log(this.timer);
        // if (this.timer >= 1000) {
        //     console.log(++this.resource);
        //     this.timer -= 1000
        // }
        
        if (this.health <= 0) {
            this.contactedPlayer = false
            this.attacking = false;
            this.y -=5
            this.anims.play('eyemonster_death',true)
                .on("animationcomplete", ()=>{
                    this.kill();
                })
        }
        
        this.enemyBlocked = this.body.blocked;
        if (this.enemyBlocked.left) {
            this.flipX = false;
            this.body.setVelocity(this.speed,0);
        }
        else if (this.enemyBlocked.right) {
            this.flipX = true;
            this.body.setVelocity(-this.speed,0);
        }

        if (this.contactedPlayer) {
            this.flipX = this.aheadOfPlayer
            if (this.inRange) {
                this.body.setVelocityX(0);
                if (!this.attacking) {
                    console.log("not attack");
                    this.anims.play('eyemonster_flight',true)
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
                this.anims.play('eyemonster_flight',true);
                
            }
        }
        
    }
}