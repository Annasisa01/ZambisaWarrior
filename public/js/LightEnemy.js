var enemiesDestroyed = 0;
class LightEnemy extends Entity{
    constructor(scene, x, y, textureKey, damage){
        super(scene, x, y, textureKey, "LightEnemy");
        // this.scene = scene;
        this.x = x;
        const anims = scene.anims;
        this.causedDamage = false;
        this.damage = damage;
        this.textureKey = textureKey;
        this.inRange = false;
        this.attacking = false;
        this.idle = false;
        this.aheadOfPlayer = true;
        this.health = 30;
        this.fightingRange = 120;
        this.contactedPlayer = false;
        this.attackTimer = 0;

        // I can use this timer to set difficulty of the game
        this.maxTimer = 300/this.scene.game.config.globals.level;

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
        this.speed = 100;
        let dir = Math.floor(Math.random()*2)
        switch (dir) {
            case 0:
                this.flipX = true;
                this.body.setVelocity(this.speed,0);
                break;
            case 1:
                this.flipX = false;
                this.body.setVelocity(-this.speed,0);
                break;
            default:
                break;
        }
    }

    attack(){
        this.anims.play('lightEnemy_attack', true)
        this.on('animationcomplete', ()=>{
            this.attacking = false;
        })
    }

    update(){
        // const {speed} = this;
        this.attackTimer += 1;

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
                    this.anims.play('combatIdle',true)
                    // console.log('setting attakc to true');
                    this.attacking = true
                }else{
                    if (this.attackTimer >= this.maxTimer) {
                        // console.log('Attacking now');
                        this.attack();
                        this.attackTimer = 0;

                    }
                    // console.log(this.attacking);
                }
            }else{
                this.attacking = false;
                this.body.setVelocityX(this.flipX ? 100 : -100);
                this.anims.play('lightEnemy_run',true);
            }
        }
        if (this.health <= 0) {
            enemiesDestroyed++
            this.contactedPlayer = false
            this.anims.play('lightEnemy_death',true);
            this.scene.time.delayedCall(1000, ()=>{
                this.kill();
            }, null, this.scene);  // delay in ms
        }
    }
    
}