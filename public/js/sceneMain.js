// const e = require("express");
// var enemiesDestroyed = 0;
var cursors,ground,controls, cam;
var moveValue = 400;
var doingAction = false;
const scaleValue = 3;
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


        this.load.atlas("player", "ImageAssets/player.png", "ImageAssets/player.json");

        this.load.atlas("lightenemy", "ImageAssets/lightbandit.png","ImageAssets/lightbandit.json");

        this.load.atlas("darkenemy", "ImageAssets/darkbandit.png", "ImageAssets/darkbandit.json")
       
        // Map objects
        this.load.image('tiles','assets/sheet.png');
        this.load.image('watersheet','assets/WaterTileset.png');
        this.load.spritesheet('waterfallsheet','assets/WaterTileset.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('gold','ImageAssets/gold.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('shield','ImageAssets/shield_gem.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('powerup','ImageAssets/powerup_gem.png', { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('grassmap','assets/world.json');


        this.load.audio('theme', [
            'assets/audio/forest.ogg',
            'assets/audio/forest.mp3'
        ]);

        this.load.audioSprite('sfx', 'assets/audio/fx1.json', [
            'assets/audio/Soundtrack1.ogg',
            'assets/audio/Soundtrack1.wav'
        ]);

        this.load.audioSprite('sfx2', 'assets/audio/fx2.json', [
            'assets/audio/Soundtrack2.mp3',
            'assets/audio/Soundtrack2.wav'
        ]);
    }
    
    create() {
        this.game.config.globals.level = 1
        this.music = this.sound.addAudioSprite('sfx');
        this.music2 = this.sound.addAudioSprite('sfx2');
        this.golds = this.physics.add.staticGroup();
        this.shields = this.physics.add.staticGroup();
        this.powerups = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group({
            collideWorldBounds: true,
            runChildUpdate: true
        });
        this.water = this.physics.add.staticGroup();
        //Creating star rotate animation
        this.anims.create({
            key: 'goldRotate',
            frames: this.anims.generateFrameNames('gold'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'powerupRotate',
            frames: this.anims.generateFrameNames('powerup'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'shieldRotate',
            frames: this.anims.generateFrameNames('shield'),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
        key: 'waterfall',
        frames: this.anims.generateFrameNumbers('waterfallsheet',{start: 2, end: 4}) ,
        frameRate: 8,
        repeat: -1   
        });

        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('waterfallsheet',{start: 156, end: 157}) ,
            frameRate: 8,
            repeat: -1   
            });
        // this.music = this.sound.playAudioSprite('sfx','upper');
        this.music.play('upper');
        this.music.setVolume(0.05)
        
        ground = this.physics.add.staticGroup();
        const width = this.scale.width;
        const height = this.scale.height;

        // Sky background
        var sky = this.add.image(window.innerWidth/2,window.innerHeight/2,'level1');
        const scaleX = window.innerWidth / sky.width;
        const scaleY = window.innerHeight / sky.height;
        sky.setScale(scaleX,scaleY);
        sky.setScrollFactor(0);

        // Mountain background
        createAlligned(this, 3, 'level2', 0.25);

        // Forest background
        createAlligned(this,6, 'level3', 0.5);

        // Leaves
        createAlligned(this, 12, 'level5', 1);


        // Map objects from Tiled.
        const map = this.make.tilemap({key:'grassmap'});
        var tiles = map.addTilesetImage('grassworld','tiles');
        var watertiles = map.addTilesetImage('WaterTileset', 'watersheet');
        var tilesets = [tiles,watertiles];
        var layer = map.createLayer('ground',tilesets);
        layer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, layer.width, layer.height);
        this.cameras.main.fadeIn(5000);
        this.cameras.main.setBounds(0, -(window.innerHeight - layer.height), layer.width, height);

        ///////////////////////////////////////////////////
        //Creating a new player
        this.player = new Player(this, 100, 604, 'player', 100);
        this.player.setScale(scaleValue);
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, layer);
        this.player.setDepth(100);
        

        // Set camera to follow player
        cam = this.cameras.main.startFollow(this.player);


        const objectsLayer = map.getObjectLayer('objectLocations');
        objectsLayer.objects.forEach(objData => {
            const {x = 0, y = 0, name, width = 0, height = 0} = objData

            switch (name) {
                case 'startPos':
                    const e = new LightEnemy(this, x, y, 'lightenemy',"LightEnemy", 25);
                    e.body.setSize(this.width,this.height,true);
                    e.setScale(scaleValue);
                    this.enemies.add(e);
                    this.physics.add.collider(this.enemies,layer);
                    break;
                case 'gold':
                    const star = this.add.sprite(x, y, 'gold')
                    star.anims.play('goldRotate',true);
                    this.golds.add(star);
                    break;
                case 'invisibleWalls':
                    var rect = this.add.rectangle(x, y, width, height);
                    this.physics.add.existing(rect);
                    rect.body.allowGravity = false;
                    rect.body.immovable = true;
                    this.physics.add.collider(this.enemies,rect);
                    break;
                case 'powerup':
                    const powerup = this.add.sprite(x, y,'powerup');
                    powerup.setScale(2);
                    powerup.anims.play('powerupRotate', true);
                    this.powerups.add(powerup);
                    break;
                case 'shield':
                    const shield = this.add.sprite(x, y, 'shield');
                    shield.setScale(2);
                    shield.anims.play('shieldRotate', true);
                    this.shields.add(shield);
                    break;
                case 'water':
                    const water = this.add.sprite(x, y, 'watersheet');
                    water.setDepth(200);
                    water.anims.play('waterfall', true);
                    this.water.add(water);
                    break;
                case 'endPos':
                    this.endPoint = this.add.sprite(x, y, 'watersheet').setScale(3);
                    this.physics.add.existing(this.endPoint);
                    this.endPoint.body.allowGravity = false;
                    this.endPoint.body.immovable = true;
                    this.endPoint.angle = 90
                    this.endPoint.anims.play('portal', true);
                    this.physics.add.overlap(this.player,this.endPoint, this.endGameRegion, null, this);
                default:
                    break;
            }
        })
        this.enemies.setVelocityX(100);


        this.physics.add.overlap(this.player, this.shields, this.useShield, null, this);
        this.physics.add.overlap(this.player, this.powerups, this.usePowerUp, null, this);
        this.physics.add.overlap(this.player, this.golds, this.collectStar, null, this);
   
        ////////////////////////////////////////////////////////
        //Collision
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
        this.physics.add.overlap(this.player, this.water, this.handlePlayerWaterOverlap, null, this);

        ///////////////////////////////////////////////////////
        //Health Bar
        this.healthBar = new HealthBar(this, 20, 20, this.player.health, this.player.sheild, this.player.rage);

    }

    endGameRegion(){
        console.log('Overlap');
        if (this.player.body.blocked.down) {
            console.log("Number of enemies destroyed is "+Entity.enemiesDestroyed);
            this.scene.start('EndGameScene',{state: "Level complete",au: this.healthBar.score, ekia: Entity.enemiesDestroyed});
        }
    }

    collectStar (player, gold)
    {
        this.music.play('coin');
        this.music.setVolume(0.3)
        gold.visible = false;
        gold.body.enable = false;
        this.healthBar.score += 10;
    }

    useShield(player,shield){
        this.music.play('Rise1');
        this.music.setVolume(0.3);
        shield.visible = false;
        shield.body.enable = false;
        if (player.shield <= 50) {
            player.shield += 50;
        }else{
            player.shield = 100;
        }
    }

    usePowerUp(player, powerup){
        this.music.play('Rise1');
        this.music.setVolume(0.3);
        powerup.visible = false;
        powerup.body.enable = false;
        if (player.rage <= 50) {
            player.rage += 50;
        } else {
            player.rage = 100;
        }
    }

    handlePlayerWaterOverlap(p,e){
        p.setTint(0xff0000);
        // setInterval(this.drown(p), 5000)
        this.time.addEvent({
            delay: 3000,
            callback: () =>{
                p.clearTint();
                p.health -= 0.009;
            },
            callbackscope: this,
            loop: false
        });
        // console.log(p.health);
    }

    handlePlayerEnemyCollision(p,e){
        let sprite = p;
        let enemies = e;
        let sound = this.music2;
        let currentAnim = sprite.anims.currentAnim;
        let currentFrame = sprite.anims.currentFrame;
        var frameCount = sprite.anims.getTotalFrames();
        sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
            if ((currentAnim.key == "attack" || currentAnim.key == "dashA") && sprite.inRange) {
                if (currentFrame.index == frameCount && sprite.attacked) {
                    sprite.attacked = false;
                    this.enemies.children.iterate((child) => {
                        if (child.inRange) {
                            sound.play('attack1');
                            child.health -= 10;
                        }
                    });
                }
            }            
        });
        this.enemies.children.iterate((child) =>{
                if (child.anims.currentAnim.key == 'lightEnemy_attack') {
                    child.causedDamage = true
                    child.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
                        if (child.inRange && child.causedDamage) {
                            sound.play('attack1');
                            child.causedDamage = false
                            // console.log('player shield is '+ this.player.shield);
                            if (this.player.shield <= 0) {
                                sprite.health -= child.damage;
                                // console.log('health is ',sprite.health);
                            }else{
                                sprite.shield -= 50;
                                // console.log('shield is', sprite.shield);
                            }
                        }
                    })
                }
        })
    }

    drown(p){
        p.health -= 0.5;
    }

    update(time,delta) {
        if (!this.player.isDead) {
            this.healthBar.updateHealth(this.player.health, this.player.shield,this.player.rage);
            if (this.player.health <= 0) {
                this.player.playdeath(this.healthBar);
            }else {
                this.player.update();
            }
        }
        this.enemies.children.iterate((child) => {
            if (this.player.health > 0) {
                if (!child.isDead) {
                    if (this.player.x > child.x ) {
                        child.aheadOfPlayer = false;
                    }else{
                        child.aheadOfPlayer = true;
                    }
                    if (Math.abs(child.x - this.player.x)  <= 80 ) {
                        child.contactedPlayer = true;
                        this.player.inRange = true;
                        child.inRange = true;
                    }else{
                        if (child.contactedPlayer && Math.abs(child.x - this.player.x) > 200) {
                            child.contactedPlayer = false;
                        }
                        child.inRange = false;
                    }
                }
            }else{
                child.attacking = false
            }
            
        });
    }//End of update
     
}