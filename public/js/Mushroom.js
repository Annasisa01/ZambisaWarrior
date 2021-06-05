class Mushroom extends Entity{
    constructor(scene, x, y, textureKey, damage){
        super(scene,x,y,textureKey,"MushroomMonster");

        this.x = x;
        const anims = scene.anims;
        this.causedDamage = false;
        this.damage = damage;
        this.textureKey = textureKey;
        this.inRange = false;
        this.attacking = false;
        this.justDied = false;
        this.aheadOfPlayer = true;
        this.health = 40;
        this.fightingRange = 80;
        this.contactedPlayer = false;
        this.attackTimer = 0;
        this.speed = 60;
        this.resource = 0;
        this.timer = 0;

        // I can use this timer to set difficulty of the game
        this.maxTimer = 300/this.scene.game.config.globals.level;

        anims.create({
            key: 'mushroom_attack',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Mushroom_Attack_", 
                    start: 1, 
                    end: 8, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 10
        });

        anims.create({
            key: 'mushroom_idle',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Mushroom_Idle_", 
                    start: 1, 
                    end: 4, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 5,
            repeat: -1
        });

        anims.create({
            key: 'mushroom_run',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Mushroom_Run_", 
                    start: 1, 
                    end: 8, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: 'mushroom_death',
            frames: anims.generateFrameNames(this.textureKey, 
                {
                    prefix: "Mushroom_Death_", 
                    start: 1, 
                    end: 4, 
                    zeroPad: 1, 
                    suffix: ".png"
                }),
            frameRate: 5
        });

        this.anims.play('mushroom_run',true);
    }

    attack(){
        this.anims.play('mushroom_attack', true);
        this.on('animationcomplete', ()=>{
            this.causedDamage = true
            this.attacking = false;
            this.anims.play('mushroom_idle',true);
        })
    }

    update(time,delta){
        if (this.health <= 0) {
            this.contactedPlayer = false
            this.attacking = false;
            this.anims.play('mushroom_death',true)
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
                    this.anims.play('mushroom_idle',true);
                    this.attacking = true
                }
                else{
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
                this.anims.play('mushroom_run',true);
                
            }
        }
        
    }
}