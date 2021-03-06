class LightEnemy extends Enemies{
    constructor(scene, x, y, textureKey,type, damage){
        super(scene, x, y, textureKey, type);
        const anims = scene.anims;
        this.damage = damage;
        this.health = 40;
        this.fightingRange = 75;
        this.speed = 150;
        this.attackSpeed = 175;

        // I can use this timer to set difficulty of the enemy
        this.maxTimer = this.attackSpeed/this.scene.game.config.globals.level;


        if (this.type == "LightEnemy") {
            // Animations for lightbandit
            anims.create({
                key: 'combatIdle',
                frames: anims.generateFrameNames(this.textureKey, 
                    {
                        prefix: "LightBandit_Combat_Idle_", 
                        start: 1, 
                        end: 4, 
                        zeroPad: 1, 
                        suffix: ".png"
                    }),
                frameRate: 5,
                repeat: -1
            });

            anims.create({
                key: 'lightEnemy_attack',
                frames: anims.generateFrameNames(this.textureKey, 
                    {
                        prefix: "LightBandit_Attack_", 
                        start: 1, 
                        end: 8, 
                        zeroPad: 1, 
                        suffix: ".png"
                    }),
                frameRate: 11,
            });

            anims.create({
                key: 'lightEnemy_death',
                frames: anims.generateFrameNames(this.textureKey, 
                    {
                        prefix: "LightBandit_Death_", 
                        start: 0, 
                        end: 0, 
                        zeroPad: 1, 
                        suffix: ".png"
                    }),
                frameRate: 1,
                repeat: -1
            });

            anims.create({
                key: 'lightEnemy_idle',
                frames: anims.generateFrameNames(this.textureKey, 
                    {
                        prefix: "LightBandit_Idle_", 
                        start: 1, 
                        end: 4, 
                        zeroPad: 1, 
                        suffix: ".png"
                    }),
                frameRate: 5,
                repeat: -1
            });

            anims.create({
                key: 'lightEnemy_run',
                frames: anims.generateFrameNames(this.textureKey, 
                    {
                        prefix: "LightBandit_Run_", 
                        start: 1, 
                        end: 8, 
                        zeroPad: 1, 
                        suffix: ".png"
                    }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.play('lightEnemy_run',true);
        }else{
            // Animations for darkbandit
            anims.create({
                key:'darkbandit_run',
                frames: anims.generateFrameNames(this.textureKey,{
                    prefix: "HeavyBandit_Run_",
                    start: 1,
                    end: 8,
                    zeroPad: 1,
                    suffix: ".png"
                }),
                frameRate: 12,
                repeat: -1
            });

            anims.create({
                key:'darkbandit_attack',
                frames: anims.generateFrameNames(this.textureKey,{
                    prefix: "HeavyBandit_Attack_",
                    start: 1,
                    end: 8,
                    zeroPad: 1,
                    suffix: ".png"
                }),
                frameRate: 12
            });

            anims.create({
                key:'darkbandit_combatIdle',
                frames: anims.generateFrameNames(this.textureKey,{
                    prefix: "HeavyBandit_CombatIdle_",
                    start: 1,
                    end: 4,
                    zeroPad: 1,
                    suffix: ".png"
                }),
                frameRate: 5,
                repeat: -1
            });

            anims.create({
                key:'darkbandit_death',
                frames: anims.generateFrameNames(this.textureKey,{
                    prefix: "HeavyBandit_Death_",
                    start: 2,
                    end: 9,
                    zeroPad: 2,
                    suffix: ".png"
                }),
                frameRate: 9,
            });

            this.anims.play('darkbandit_run',true);
        }

    }

    attack(){
        if (this.type == "LightEnemy") {
            this.anims.play('lightEnemy_attack', true)
        }else{
            console.log("i am here");
            this.anims.play('darkbandit_attack', true)
        }
        this.on('animationcomplete', ()=>{
            this.causedDamage = true
            this.attacking = false;
        })
    }

    update(){
        const enemyBlocked = this.body.blocked;
        if (enemyBlocked.left) {
            this.flipX = true
            this.body.setVelocity(this.speed,0);
        }
        else if (enemyBlocked.right) {
            this.flipX = false;
            this.body.setVelocity(-this.speed,0);
        }

        if (this.contactedPlayer) {
            this.flipX = !this.aheadOfPlayer
            if (this.inRange) {
                this.body.setVelocityX(0);
                if (!this.attacking) {
                    this.attackTimer += 1;
                    if (this.type == "LightEnemy") {
                        this.anims.play('combatIdle',true)
                    }else{
                        this.anims.play('darkbandit_combatIdle',true)
                    }
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
                this.body.setVelocityX(this.flipX ? this.speed : -this.speed);
                if (this.type == "LightEnemy") {
                    this.anims.play('lightEnemy_run',true);
                }else{
                    this.anims.play('darkbandit_run',true);
                }
                
            }
        }
        if (this.health <= 0) {
            this.contactedPlayer = false
            if (this.type == "LightEnemy") {
                this.anims.play('lightEnemy_death',true);
                this.scene.time.delayedCall(1500, ()=>{
                    this.kill();
                }, null, this.scene);
            }else{
                console.log("i de here");
                this.anims.play('darkbandit_death',true)
                    .on("animationcomplete", ()=>{
                        this.kill();
                    })
            }
        }
    }
    
}