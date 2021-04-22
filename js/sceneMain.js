var player,cursors,ground,controls, cam,r3,keySpace;
var facingRight =  true;
const scaleValue = 4;
var standingHeight = 0;
const createAlligned = (scene, count, texture, scrollFactor ) => {
    let x = 0;
    var temp = scene.textures.get(texture);
    var image = temp.getSourceImage();
    for (let i = 0; i < count; i++) {
        if(texture == "level4"){
            ground.create(x, scene.scale.height, texture).setScale(0.67,0.7).refreshBody().setScrollFactor(scrollFactor);
            ground.setOrigin(0,1);
            x += image.width *0.67;
        }
        else{
            const m = scene.add.image(x, scene.scale.height, texture);
            m.setOrigin(0,1);
            m.setScale(0.67,0.7);
            m.setScrollFactor(scrollFactor);
            x += m.width*0.67;
        }
    }
}

class SceneMain extends Phaser.Scene{
    constructor() {
        super('SceneMain');
    }
    
    preload()
    {
        // Loading parallax background
        this.load.image('level4','assets/FORESTBACKGROUND/Layers/ground.png');
        this.load.image('level2','assets/FORESTBACKGROUND/Layers/mountains.png');
        this.load.image('level5','assets/FORESTBACKGROUND/Layers/plant.png');
        this.load.image('level3','assets/FORESTBACKGROUND/Layers/plateau.png');
        this.load.image('level1','assets/FORESTBACKGROUND/Layers/sky.png');
        
        // Loading player sprites
        // Idle sprite facing right
        this.load.spritesheet(
            'idle', 
            'images/idleSpritesRight.png', 
            {frameWidth: 23, frameHeight: 32}
        );
         // Idle sprite facing left
         this.load.spritesheet(
            'idleL', 
            'images/idleSpritesLeft.png', 
            {frameWidth: 23, frameHeight: 32}
        );
        // Running sprites facing right
        this.load.spritesheet(
            'runningRight',
            'images/runningSpritesRight.png',
            {frameWidth: 23, frameHeight: 32}
        );
        // Running sprites facing left
        this.load.spritesheet(
            'runningLeft',
            'images/runningSpritesLeft.png',
            {frameWidth: 23, frameHeight: 32}
        );
        // Jump facing right
        this.load.spritesheet(
            'jumpFR',
            'images/JumpFacingRight.png',
            {frameWidth: 23, frameHeight: 33}
        );
        // Jump facing left
        this.load.spritesheet(
            'jumpFL',
            'images/JumpFacingLeft.png',
            {frameWidth: 23, frameHeight: 33}
        );
        // Dash attack right
        this.load.spritesheet(
            'dashAttackR',
            'images/DashAttackR.png',
            {frameWidth: 61, frameHeight: 43}
        );
        // Map objects
        this.load.image('tiles','assets/sheet.png');
        this.load.tilemapTiledJSON('grassmap','assets/world.json');
    }
    
    create() {
        
        ground = this.physics.add.staticGroup();
        const width = this.scale.width;
        const height = this.scale.height;

        // Sky background
        var sky = this.add.image(window.innerWidth/2,window.innerHeight/2,'level1');
        sky.setScale(0.67,0.7);
        sky.setScrollFactor(0);

        // Mountain background
        // createAlligned(this, 3, 'level2', 0.25);

        // Forest background
        // createAlligned(this,6, 'level3', 0.5);

        // Ground background
        // createAlligned(this, 9, 'level4', 0.75);
        // ground.setCollisionByProperty({ collides: true });
        // ground.setOrigin(0,1);
        // ground.setScale(0.67,0.7);

        // Map objects from Tiled.
        var map = this.make.tilemap({key:'grassmap'});
        var tiles = map.addTilesetImage('grassworld','tiles');
        var layer = map.createLayer('ground', tiles);
        layer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, layer.width, layer.height);
        this.cameras.main.setBounds(0, 0, width*10, height);

        // Creating player sprites
        player = this.physics.add.sprite(100, 40, 'idle');
        player.setScale(scaleValue);
        r3 = this.add.rectangle(player.x,player.y, player.width*scaleValue, player.height*scaleValue);
        r3.setStrokeStyle(2, 0x1a65ac);
        player.setBounce(0.1);
        this.physics.add.collider(player, layer);
        player.setCollideWorldBounds(true);

        // Leaves
        createAlligned(this, 12, 'level5', 1);
        

        //Creating Stand facing right animation
        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers('idle', {start: 0, end: 4}),
            frameRate: 7,
            repeat: -1
        });
        //Creating Stand facing right animation
        this.anims.create({
            key: 'standL',
            frames: this.anims.generateFrameNumbers('idleL', {start: 0, end: 4}),
            frameRate: 7,
            repeat: -1
        });
        // Creating running right animation
        this.anims.create({
            key: 'moveRight',
            frames: this.anims.generateFrameNumbers('runningRight', {start: 0, end: 7}),
            frameRate: 12,
            repeat: -1
        });
        // Creating  running left animation
        this.anims.create({
            key: 'moveLeft',
            frames: this.anims.generateFrameNumbers('runningLeft', {start: 0, end: 7}),
            frameRate: 12,
            repeat: -1
        });
        // Creating jumping fr animation
        this.anims.create({
            key: 'jumpfr',
            frames: this.anims.generateFrameNumbers('jumpFR', {start: 0 , end: 2}),
            frameRate: 3,
            repeat: -1
        });
        // Creating jumping fl animation
        this.anims.create({
            key: 'jumpfl',
            frames: this.anims.generateFrameNumbers('jumpFL', {start: 0 , end: 2}),
            frameRate: 3,
            repeat: -1
        });
        // Creating dash attack right
        this.anims.create({
            key: 'dashAR',
            frames: this.anims.generateFrameNumbers('dashAttackR', {start: 0, end: 9},),
            frameRate: 15,
            repeat: -1
        });

        // Set camera to follow player
        cam = this.cameras.main.startFollow(player);
        // cam = this.cameras.main;

        // Play initial player animation
        player.anims.play('stand',true);
        

        // initialize keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(time,delta) {
        const speed = 3;
        
        if (this.cursors.left.isDown)
        {
            facingRight = false;
            player.setVelocityX(-300);
            if(player.body.blocked.down){
                player.anims.play('moveLeft', true);
            }
            
        }
         else if (this.cursors.right.isDown)
        {
            facingRight = true;
            player.setVelocityX(300);
            if(player.body.blocked.down){
                player.anims.play('moveRight', true);
            }
        }
        else if(player.body.blocked.down)
        {
            player.setVelocityX(0);
            if(facingRight){
                player.anims.play('stand',true);
            }else{
                player.anims.play('standL',true);
            }
        }

        if (this.cursors.up.isDown && player.body.blocked.down)
        {
            player.setVelocityY(-375);
            if(facingRight){
                player.anims.play('jumpfr',true);
            }else{
                player.anims.play('jumpfl',true);
            }
            
        }

        if (keySpace.isDown)
        {
            player.anims.play('dashAR',true);
        }
        r3.x = player.x;
        r3.y = player.y;
        r3.width = player.width*scaleValue;
        r3.height = player.height*scaleValue;
    }
}