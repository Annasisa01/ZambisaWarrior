var attacking = false;
var facingRight =  true;
class Player extends Entity{
    constructor(scene, x, y, textureKey, health,speed,shield){
        super(scene, x, y, textureKey,"Player");
        const anims = scene.anims;
        this.maxHealth = health
        this.health = this.maxHealth;
        this.shield = shield;
        this.speed = speed;
        this.rage = false;
        this.attacked = false;
        this.playingDeath = false;

        //Creating attack1 animation
        anims.create({
            key: 'attack',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Warrior_Attack_", start: 1, end: 9, zeroPad: 2, suffix: ".png"}),
            frameRate: 25,
        });

        //Creating attack2 animation
        anims.create({
            key: 'attack2',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Warrior_Attack_", start: 1, end: 12, zeroPad: 2, suffix: ".png"}),
            frameRate: 20,
        });

        //Creating idle animation
        anims.create({
            key: 'idle',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Warrior_Idle_", start: 1, end: 5, zeroPad: 1, suffix: ".png"}),
            frameRate: 8,
            repeat: -1
        });

        // Creating move animation
        anims.create({
            key: 'move',
            frames: anims.generateFrameNames(this.textureKey,  {prefix: "Warrior_Run_", start: 1, end: 8, zeroPad: 1, suffix: ".png"}),
            frameRate: 12,
        });

         // Creating jump animation
         anims.create({
            key: 'jump',
            frames: anims.generateFrameNames(this.textureKey,  {prefix: "Warrior_Jump_", start: 1, end: 3, zeroPad: 1, suffix: ".png"}),
            frameRate: 6,
            repeat: -1
        });

        // Creating dash attack animation
        anims.create({
            key: 'dashA',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Warrior_Dash-Attack_", start: 1, end: 9, zeroPad: 1, suffix: ".png"}),
            frameRate: 25
        });

        anims.create({
            key: 'death',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Warrior_Death_", start: 1, end: 9, zeroPad: 1, suffix: ".png"}),
            frameRate: 8
        });

        // this.anims.play("idle");

        // initialize keyboard controls
        //Keyspace is being mapped to attack animation
        this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Library for key that are going to be used
        const {LEFT, RIGHT, UP, DOWN, W, A, S, D} = Phaser.Input.Keyboard.KeyCodes
        this.keys = scene.input.keyboard.addKeys({
            up: 'UP',
            left: 'LEFT',
            right: 'RIGHT',
            down: 'DOWN',
            w: 'W',
            a: 'A',
            s: 'S',
            d: 'D'
        }); 
        //Event listener for attack animation
        //Sets the attacking boolean to true
        this.keySpace.on('down', function(){
            // console.log("I am here");in
            attacking = true;
        })

        this.keys.d.on('down',()=>{
            this.delayDone();
            attacking = true;
            this.anims.play("dashA",true);
            if (this.body.blocked.right) {
                this.x -= 100;
            }else if (this.body.blocked.left) {
                this.x += 100;
            }
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function(){
                    attacking = false;
                    this.delayDone();
                    this.anims.play("idle",true);
                });
                this.attacked = true;
        });

        this.keys.s.on('down', ()=>{
            this.delayDone();
            this.rage = true;
            this.setTint(0x857e4c);
            this.setAlpha(0.5);
        });

    }

    //This function resets the anchor and the body size of the sprite
    //I use it for trim the sprite.
    delayDone() {
        this.setOrigin(0.5,1);
        this.body.setSize(this.width,this.height,true);
    }

    playdeath(p){
        this.delayDone()
        this.anims.play('death',true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
            this.kill(p)
        })
    }

    //Update function
    update(){
        this.delayDone();
        // if (this.rage < 100) {
        //     this.rage += 0.01;
        // }
        if (this.health < this.maxHealth && this.health > 0) {
            this.health += 0.04;
        }
        this.delayDone();
        //Speed of the sprite when moving
        if(!attacking){
            if (this.keys.right.isDown  && !this.keys.left.isDown)
            {
                this.delayDone();
                this.flipX = false;
                this.body.setVelocityX(this.speed/1);
                if(this.body.blocked.down){
                    this.anims.play('move', true);
                }
            }
            else if (this.keys.left.isDown && !this.keys.right.isDown)
            {
                // if (this.keys.left.isDown && !this.keys.right.isDown){
                    this.delayDone();
                    this.flipX = true;
                    this.body.setVelocityX(-this.speed);
                    if(this.body.blocked.down){
                        this.anims.play('move', true);
                    }
                // }
                
                
            }
            else if( this.body.blocked.down){
                this.delayDone();
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
                this.anims.play('idle', true);
            }
            if (this.keys.up.isDown ) {
                if(this.body.blocked.down){
                    this.body.setVelocityY(-this.speed)
                    this.anims.play("jump",true);
                    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function() {
                        this.body.setVelocityY(0)
                        this.anims.play("idle",true);
                    })
                }
            }
            else if (this.keys.down.isDown) {
            }
        }
        else{
            if (this.keySpace.isDown) {
                if (this.body.blocked.down) {
                    this.body.setVelocityX(0);
                }
                this.anims.play("attack2",true);
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function(){
                    attacking = false;
                    this.delayDone();
                    this.anims.play("idle",true);
                });
                this.attacked = true;
            }
        }
    }
}