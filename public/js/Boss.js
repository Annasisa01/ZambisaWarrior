class Boss extends Entity{
    constructor(scene, x, y, textureKey, health){
        super(scene, x, y, textureKey, "Boss");
        const anims = scene.anims;
        this.health = health;
        this.shield = 100;
        // this.speed = 300;
        this.rage = false;
        this.attacked = false;
        this.playingDeath = false;

        //Creating attack_leap animation
        anims.create({
            key: 'attack_jab',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Boss_attack_jab (", start: 1, end: 30, zeroPad: 0, suffix: ").png"}),
            frameRate: 18,
        });

        //Creating attack_spin animation
        anims.create({
            key: 'attack_spin',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Boss_attack_spin (", start: 1, end: 30, zeroPad: 0, suffix: ").png"}),
            frameRate: 18,
        });

        //Creating attack_leap animation
        anims.create({
            key: 'attack_leap',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Boss_attack_leap (", start: 1, end: 40, zeroPad: 0, suffix: ").png"}),
            frameRate: 18,
        });

        //Creating idle animation
        anims.create({
            key: 'idle',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Boss_idle (", start: 1, end: 16, zeroPad: 0, suffix: ").png"}),
            frameRate: 8,
            repeat: -1
        });

        // Creating move animation
        anims.create({
            key: 'move',
            frames: anims.generateFrameNames(this.textureKey,  {prefix: "Boss_walk (", start: 1, end: 8, zeroPad: 0, suffix: ").png"}),
            frameRate: 12,
        });

         // Creating jump animation
         anims.create({
            key: 'jump',
            frames: anims.generateFrameNames(this.textureKey,  {prefix: "Boss_jump (", start: 1, end: 25, zeroPad: 0, suffix: ").png"}),
            frameRate: 8,
            repeat: -1
        });

        // Creating dash attack animation
        anims.create({
            key: 'dash',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Boss_dash (", start: 1, end: 8, zeroPad: 0, suffix: ").png"}),
            frameRate: 9
        });

        // Creating death animation
        anims.create({
            key: 'death',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Boss_death (", start: 1, end: 40, zeroPad: 0, suffix: ").png"}),
            frameRate: 8
        });

        // Creating taunt animation
        anims.create({
            key: 'taunt',
            frames: anims.generateFrameNames(this.textureKey, {prefix: "Boss_taunt (", start: 1, end: 18, zeroPad: 0, suffix: ").png"}),
            frameRate: 8
        });

        this.anims.play("idle");
    }

}

        // initialize keyboard controls
        //Keyspace is being mapped to attack animation
        // this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Library for key that are going to be used
        // const {LEFT, RIGHT, UP, DOWN, W, A, S, D} = Phaser.Input.Keyboard.KeyCodes
        // this.keys = scene.input.keyboard.addKeys({
        //     up: 'UP',
        //     left: 'LEFT',
        //     right: 'RIGHT',
        //     down: 'DOWN',
        //     w: 'W',
        //     a: 'A',
        //     s: 'S',
        //     d: 'D'
        // }); 
        //Event listener for attack animation
        //Sets the attacking boolean to true
        // this.keySpace.on('down', function(){
            // console.log("I am here");in
            // attacking = true;
        // })

        // this.keys.d.on('down',()=>{
        //     this.delayDone();
        //     attacking = true;
        //     this.anims.play("dash",true);
        //     if (this.body.blocked.right) {
        //         this.x -= 100;
        //     }else if (this.body.blocked.left) {
        //         this.x += 100;
        //     }
        //         this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function(){
        //             attacking = false;
        //             this.delayDone();
        //             this.anims.play("idle",true);
        //         });
        //         this.attacked = true;
        // });

        // this.keys.s.on('down', ()=>{
        //     this.delayDone();
        //     this.rage = true;
        //     this.setTint(0x857e4c);
        //     this.setAlpha(0.5);
        // });

    // }

    //This function resets the anchor and the body size of the sprite
    //I use it for trim the sprite.




    // delayDone() {
    //     this.setOrigin(0.5,1);
    //     this.body.setSize(this.width,this.height,true);
    // }

    // playdeath(p){
    //     this.delayDone()
    //     this.anims.play('death',true);
    //     this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
    //         this.kill(p)
    //     })
    // }

    

    //Update function
    // update(){
    //     this.delayDone();
    //     // if (this.rage < 100) {
    //     //     this.rage += 0.01;
    //     // }
    //     if (this.health < 100 && this.health > 0) {
    //         this.health += 0.01;
    //     }
    //     this.delayDone();
    //     //Speed of the sprite when moving
    //     if(!attacking){
    //         if (this.keys.right.isDown  && !this.keys.left.isDown)
    //         {
    //             this.delayDone();
    //             this.flipX = false;
    //             this.body.setVelocityX(this.speed);
    //             if(this.body.blocked.down){
    //                 this.anims.play('move', true);
    //             }
    //         }
    //         else 
    //         {
    //             if ((this.keys.left.isDown || this.keys.a.isDown) && !this.keys.right.isDown){
    //                 this.delayDone();
    //                 this.flipX = true;
    //                 this.body.setVelocityX(-300);
    //                 if(this.body.blocked.down){
    //                     this.anims.play('move', true);
    //                 }
    //             }
    //             else if( this.body.blocked.down){
    //                 this.delayDone();
    //                 this.body.setVelocityX(0);
    //                 this.body.setVelocityY(0);
    //                 this.anims.play('idle', true);
    //             }
                
    //         }
    //         if (this.keys.up.isDown ) {
    //             if(this.body.blocked.down){
    //                 this.body.setVelocityY(-this.speed)
    //                 this.anims.play("jump",true);
    //                 this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function() {
    //                     this.body.setVelocityY(0)
    //                     this.anims.play("idle",true);
    //                 })
    //             }
    //         }
    //         else if (this.keys.down.isDown) {
    //         }
    //     }
    //     else{
    //         if (this.keySpace.isDown) {
    //             if (this.body.blocked.down) {
    //                 this.body.setVelocityX(0);
    //             }
    //             this.anims.play("attack2",true);
    //             this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function(){
    //                 attacking = false;
    //                 this.delayDone();
    //                 this.anims.play("idle",true);
    //             });
    //             this.attacked = true;
    //         }
    //     }
    // }
// }