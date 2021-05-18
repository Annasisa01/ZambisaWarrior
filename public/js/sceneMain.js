// const e = require("express");

var cursors,ground,controls, cam;
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
       
        // Map objects
        this.load.image('tiles','assets/sheet.png');
        this.load.image('watersheet','assets/WaterTileset.png');
        this.load.spritesheet('gold','ImageAssets/gold.png', { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('grassmap','assets/world.json');


        this.load.audio('theme', [
            'assets/audio/forest.ogg',
            'assets/audio/forest.mp3'
        ]);

        this.load.audioSprite('sfx', 'assets/audio/fx1.json', [
            'assets/audio/Soundtrack1.ogg',
            'assets/audio/Soundtrack1.wav'
        ]);

        this.sound;
        this.golds;
        this.enemies;
    }
    
    create() {
        this.score = 0;
        this.scoreText;
        this.scoreText = this.add.text(200, 20, 'Score: 0', { fontSize: '18px', fill: '#000' }).setScrollFactor(0).setDepth(100);
        this.golds = this.physics.add.staticGroup();
        this.enemies = this.physics.add.group({
            collideWorldBounds: true,
            runChildUpdate: true
        });
        //Creating star rotate animation
        this.anims.create({
            key: 'goldRotate',
            frames: this.anims.generateFrameNames('gold'),
            frameRate: 8,
            repeat: -1
        });
        this.sound.playAudioSprite('sfx','upper');
        
        ground = this.physics.add.staticGroup();
        const width = this.scale.width;
        const height = this.scale.height;

        // Sky background
        var sky = this.add.image(window.innerWidth/2,window.innerHeight/2,'level1');
        sky.setScale(0.67,0.7);
        sky.setScrollFactor(0);

        // Mountain background
        createAlligned(this, 3, 'level2', 0.25);

        // Forest background
        createAlligned(this,6, 'level3', 0.5);


        // Map objects from Tiled.
        const map = this.make.tilemap({key:'grassmap'});
        var tiles = map.addTilesetImage('grassworld','tiles');
        var watertiles = map.addTilesetImage('WaterTileset', 'watersheet');
        var tilesets = [tiles,watertiles];
        var layer = map.createLayer('ground',tilesets);
        layer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, layer.width, layer.height);
        this.cameras.main.setBounds(0, 0, layer.width, height);

        ///////////////////////////////////////////////////
        //Creating a new player
        this.player = new Player(this, 100, 604, 'player', 100);
        this.player.setScale(scaleValue);
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, layer);
        this.player.setDepth(100);
        // Set camera to follow player
        cam = this.cameras.main.startFollow(this.player);

        // Leaves
        createAlligned(this, 12, 'level5', 1);
        
        

        

        const objectsLayer = map.getObjectLayer('enemyLocations');
        objectsLayer.objects.forEach(objData => {
            const {x = 0, y = 0, name, width = 0, height = 0} = objData

            switch (name) {
                case 'startPos':
                    const e = new LightEnemy(this, x, y, 'lightenemy', 10);
                    e.body.setSize(this.width,this.height,true);
                    e.setScale(scaleValue);
                    // e.body.setCollideWorldBounds(true);
                    // this.physics.add.collider(e, layer);
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
                    this.physics.add.overlap(this.player, rect, ()=>{
                        console.log("Overlap!!!");
                    }, null, this);
                    break;
            
                default:
                    break;
            }
        })
        this.enemies.setVelocityX(100);
        // console.log(this.enemies.getVelocityX);
        // this.enemies.setCollideWorldBounds(true);

        this.physics.add.overlap(this.player, this.golds, this.collectStar, null, this);
        

        

        ///////////////////////////////////////////////////
        //Creating a new light enemy
        // this.enemy = new LightEnemy(this, 300, 604, 'lightenemy', 10);
        // this.enemy.body.setSize(this.width,this.height,true);
        // this.enemy.setScale(scaleValue);
        // this.enemy.body.setCollideWorldBounds(true);
        // this.physics.add.collider(this.enemy, layer);

        //Adding enemies
        // this.enemies = this.add.group();
        // for (let i = 0; i < 8; i++) {
        //     const e = new LightEnemy(this, 300 + 1000 * i, 604, 'lightenemy', 10);
        //     e.body.setSize(this.width,this.height,true);
        //     e.setScale(scaleValue);
        //     e.body.setCollideWorldBounds(true);
        //     this.enemies.add(e);
        // }
        // this.physics.add.collider(this.enemies, layer);

        ////////////////////////////////////////////////////////
        //Collision
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);

        ///////////////////////////////////////////////////////
        //Health Bar
        this.healthBar = new HealthBar(this, 20, 20, 100);

    }

    collectStar (player, gold)
    {
        // gold.disableBody(true, true);
        gold.visible = false;
        gold.body.enable = false;

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    myfunction(e){
        console.log("timer has started");
        // console.log(e);
        this.enemies.add(e);

        console.log(this.enemies);
    }
    
    handlePlayerEnemyCollision(p,e){
        let sprite = this.player;
        let sound = this.sound;
        let currentAnim = this.player.anims.currentAnim;
        let currentFrame = this.player.anims.currentFrame;
        var frameCount = sprite.anims.getTotalFrames();
            
            this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
                if (currentAnim.key == "attack" && sprite.inRange) {
                    if (currentFrame.index == frameCount && this.player.attacked) {
                        // sound.playAudioSprite('sfx','coin');
                        this.player.attacked = false;
                        this.enemies.children.iterate((child) => {
                            console.log("i am here");
                            console.log(child.health);
                            if (child.inRange) {
                                child.health -= 10;
                            }
                        });
                        // e.health -= 10;
                        // this.healthBar.updateHealth(p.health);
                        // if (this.enemies.health <= 0 ) {
                            // e.kill();
                            // this.cameras.main.shake(50, 0.02);
                            // this.cameras.main.fade(2000, 0, 0, 0);
                            // this.cameras.main.once('camerafadeoutcomplete', () =>{
                            //     this.scene.restart();
                            // });
                        // }
                    }
                }
                // e.kill();             
            });
            
            //For changing tint effect
            // p.setTint(0xff0000);
            // this.time.addEvent({
            //     delay: 500,
            //     callback: () =>{
            //         p.clearTint();
            //     },
            //     callbackscope: this,
            //     loop: false
            // });
            
        // }
        
    }

    update(time,delta) {
        this.player.update();
        // if (!this.enemy.isDead) {
        //     this.enemy.update();
        // }
        
        this.enemies.children.iterate((child) => {
            // console.log('child is => ', child);
            if (!child.isDead) {
                // child.update();
                // if (child.x < 310) {
                //     console.log("enemy position is "+child.x);
                // }
                if (child.x - this.player.x  <= 120 || this.player.x - child.x >= 120) {
                    // console.log("i am in range checker");
                    this.player.inRange = true;
                    child.inRange = true;
                    // console.log(child.inRange);
                }
                
            }
        });
        // console.log("inRange is "+this.player.inRange);
    }//End of update
     
}