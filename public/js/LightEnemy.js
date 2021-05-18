class LightEnemy extends Entity{
    constructor(scene, x, y, textureKey, damage){
        super(scene, x, y, textureKey, "LightEnemy");

        const anims = scene.anims;
        this.damage = damage;
        this.textureKey = textureKey;
        this.inRange = false;
        this.health = 30;

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
            frameRate: 10,
            repeat: -1
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
                console.log("speed is set");
                break;
            case 1:
                this.flipX = false;
                this.body.setVelocity(-this.speed,0);
                console.log("speed is set");
                break;
            default:
                break;
        }
    }

    setTarget(target){
        this.target = target;
    }

    update(){
        // const {speed} = this;
        const enemyBlocked = this.body.blocked;
        if (enemyBlocked.left) {
            // console.log("Enemy is blocked");
            this.flipX = true
            this.body.setVelocity(this.speed,0);
        }
        else if (enemyBlocked.right) {
            this.flipX = false;
            this.body.setVelocity(-this.speed,0);
        }
        if (this.health <= 0) {
            this.kill();
        }
    }
}