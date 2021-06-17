var controls, cam;
const scaleValue = 3;

// Global method used for creating the parallax background
const createAlligned = (scene, count, texture, scrollFactor ) => {
    let x = 0;
    for (let i = 0; i < count; i++) {
        // Create image from the texture that was passed as a variable
        const m = scene.add.image(x, scene.scale.height, texture);
        m.setOrigin(0,1);
        m.setScale(0.67,0.7);
        m.setScrollFactor(scrollFactor);
        x += m.width*0.67;
    }
}

class SceneMain extends Phaser.Scene{
    constructor(key,tempMap,pos) {
        super(key);
        this.map = tempMap;
        this.playerPos = pos;
        // instance variable used for spacing objects
        this.spacing = 150;
    }
    
    create() {
        this.anims.resumeAll();
        this.physics.world.resume();
        this.gamePaused = false;
        // Importing sound manager
        this.soundManager = this.sys.game.config.globals.musicManager;
        // initializing sounds for sfx to instance variables
        this.music = this.sound.addAudioSprite('sfx');
        this.music2 = this.sound.addAudioSprite('sfx2');

        // Creating static groups for diferrent game objects
        this.golds = this.physics.add.staticGroup();
        this.shields = this.physics.add.staticGroup();
        this.powerups = this.physics.add.staticGroup();
        this.water = this.physics.add.staticGroup();

        // Creating a group for all enemies
        this.enemies = this.physics.add.group({
            collideWorldBounds: true,
            runChildUpdate: true
        });
        
        // Creating gold rotate animation
        this.anims.create({
            key: 'goldRotate',
            frames: this.anims.generateFrameNames('gold'),
            frameRate: 8,
            repeat: -1
        });

        // Creating powerup rotate animation
        this.anims.create({
            key: 'powerupRotate',
            frames: this.anims.generateFrameNames('powerup'),
            frameRate: 8,
            repeat: -1
        });

        // Creating shield rotate animation
        this.anims.create({
            key: 'shieldRotate',
            frames: this.anims.generateFrameNames('shield'),
            frameRate: 8,
            repeat: -1
        });

        // Creating waterfall animation
        this.anims.create({
        key: 'waterfall',
        frames: this.anims.generateFrameNumbers('waterfallsheet',{start: 2, end: 4}) ,
        frameRate: 8,
        repeat: -1   
        });

        // Creating portal rotate animation
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('waterfallsheet',{start: 156, end: 157}) ,
            frameRate: 8,
            repeat: -1   
        });

        // this.anims.create({
        //     key
        // })

        // Playing sound when entering the game
        if (this.soundManager.soundOn) {
            this.music.play('upper');
            this.music.setVolume(0.05)
        }
        
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
        // createAlligned(this, 12, 'level5', 1);


        // Map objects from Tiled.
        const map = this.make.tilemap({key:this.map});
        var tiles = map.addTilesetImage('grassworld','tiles');
        var watertiles = map.addTilesetImage('WaterTileset', 'watersheet');
        var tilesets = [tiles,watertiles];

        // Creating layer from tiled map
        var layer = map.createLayer('ground',tilesets);
        // Set layer to collide with other game objects
        layer.setCollisionByProperty({ collides: true });
        // Set world bounds to height and width of the layer
        this.physics.world.setBounds(0, 0, layer.width, layer.height);
        // Creating a fade in effect for the level
        this.cameras.main.fadeIn(5000);
        // Set bounds for the camera
        this.cameras.main.setBounds(0, -(window.innerHeight - layer.height), layer.width, height);

        ///////////////////////////////////////////////////
        //Creating a new player
        this.player = new Player(this, 100, this.playerPos, 'player', 100);
        this.player.setScale(scaleValue);
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, layer);
        this.player.setDepth(100);
        

        // Set camera to follow player
        cam = this.cameras.main.startFollow(this.player);


        // Creating game objects from object layer 
        // Objects would be creating using the x and y positions from the object layer
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
                case 'mushroomPos':
                    var mushroom = new Mushroom(this, x, y, 'mushroommonster',20);
                    mushroom.body.setSize(this.width,this.height,true);
                    mushroom.setScale(scaleValue);
                    this.enemies.add(mushroom);
                    this.physics.add.collider(this.enemies, layer);
                    break;
                case 'eyemonsterPos':
                    var eyemonster = new EyeMonster(this, x, y, 'eyemonster', 15);
                    eyemonster.body.setSize(this.width,this.height,true);
                    eyemonster.setScale(scaleValue);
                    this.enemies.add(eyemonster);
                    this.physics.add.collider(this.enemies, layer);
                    break;
                case 'goblinPos':
                    var goblin = new Goblin(this, x, y, 'goblinmonster', 20);
                    goblin.body.setSize(this.width,this.height,true);
                    goblin.setScale(scaleValue);
                    this.enemies.add(goblin);
                    this.physics.add.collider(this.enemies, layer);
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
        });

        // setting the velocity of all the objects in the enemies group
        this.enemies.children.iterate((child)=>{
            /*
                Get a random direction for enemey to move to
                Set enemey speed to positive if facing right
                And to negative if facing left 
            */
            let dir = Math.floor(Math.random()*2)
            switch (dir) {
                case 0:
                    this.flipX = true;
                    child.body.setVelocityX(child.speed)
                    break;
                case 1:
                    this.flipX = false;
                    child.body.setVelocityX(-child.speed)
                    break;
                default:
                    break;
            }
            
        })
        // this.enemies.setVelocityX(100);

        // creating overlap functions between the player and collectable game objects
        this.physics.add.overlap(this.player, this.shields, this.useShield, null, this);
        this.physics.add.overlap(this.player, this.powerups, this.usePowerUp, null, this);
        this.physics.add.overlap(this.player, this.golds, this.collectCoins, null, this);
   
        //setting up overlap functions between the player and enenmies
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
        //setting up overlap functions between the player and water objects
        this.physics.add.overlap(this.player, this.water, this.handlePlayerWaterOverlap, null, this);

        //HUD
        this.hud = new HUD(this, 20, 20, this.player.health, this.player.sheild, this.player.rage);

        this.pauseContainer = this.add.container(window.innerWidth/2, window.innerHeight/2).setAlpha(0).setScrollFactor(0).setDepth(200)
        
        this.rectBackground = this.add.rectangle(0,0, window.innerWidth/2.3,450, 0xf7e094);
        this.pauseContainer.add(this.rectBackground);

        // Paused text for header
        this.pauseText = this.add.text(this.rectBackground.x,this.rectBackground.y-this.spacing,"Paused",{
            fontFamily: 'Papyrus',
            fontSize: '90px',
            color: '#000000',
        }).setOrigin(0.5);
        this.pauseContainer.add(this.pauseText);

        // get music manager from system gloabal variable musicManager
        this.musicManager = this.sys.game.config.globals.musicManager;

        this.musicButton = this.add.image(this.rectBackground.x - this.spacing, this.rectBackground.y - this.spacing/2, 'checkedbox').setInteractive().setScrollFactor(0)
        this.musicButton.on('pointerdown', function () {
            console.log("Music btn clicked");
            this.musicManager.musicOn = !this.musicManager.musicOn;
            this.updateAudio();
        }.bind(this));
        this.musicText = this.add.text(this.rectBackground.x - this.spacing * 0.5, this.rectBackground.y - this.spacing/1.75, 'Music Enabled', {fontFamily: 'Papyrus', fill: '0x000000', fontSize: 24 });

        this.soundButton = this.add.image(this.rectBackground.x - this.spacing, this.rectBackground.y , 'checkedbox')
        .setInteractive().setScrollFactor(0)
        .on('pointerdown', function () {
            console.log("Sound btn clicked");
            this.musicManager.soundOn = !this.musicManager.soundOn;
            this.updateAudio();
        }.bind(this));
        this.soundText = this.add.text(this.rectBackground.x - this.spacing * 0.5, this.rectBackground.y - this.spacing * 0.075, 'SFX Enabled', {fontFamily: 'Papyrus', fill: '0x000000', fontSize: 24 });

        this.updateAudio();

        this.pauseContainer.add(this.musicButton);
        this.pauseContainer.add(this.soundButton);
        this.pauseContainer.add(this.musicText);
        this.pauseContainer.add(this.soundText);

        this.updateAudio();
        
        this.resumeText = this.add.text(this.rectBackground.x, this.rectBackground.y + this.spacing * 0.5, "Press 'P' to resume",{fontFamily: 'Papyrus',fontSize: '30px',align: 'center',color: '#000000'}).setOrigin(0.5)
        this.pauseHome = this.add.text(this.rectBackground.x - this.spacing * 0.5, this.rectBackground.y + this.spacing, "Home",{fontFamily: 'Papyrus',fontSize: '30px',align: 'center',color: '#000000',backgroundColor: '#6fb83b'})
        .setPadding(30,10,30,10)
        .setInteractive().setScrollFactor(0)
        .on("pointerdown",()=>{
            this.anims.resumeAll();
            this.physics.world.resume();
            this.scene.start('HomeScene');
        })
        this.pauseContainer.add(this.resumeText);
        this.pauseContainer.add(this.pauseHome);

        this.pause = this.input.keyboard.addKey('P');
        this.pause.on('down', ()=>{
            if (!this.gamePaused) {
                this.anims.pauseAll();
                this.physics.world.pause();
                this.pauseContainer.setAlpha(1)
            }else{
                this.pauseContainer.setAlpha(0)
                this.anims.resumeAll();
                this.physics.world.resume();
            }
            this.gamePaused = !this.gamePaused
            // this.scene.switch('PausedScene');
        });

    }

    updateAudio(){
        if (this.musicManager.musicOn === false) {
            this.musicButton.setTexture('checkbox');
            this.sys.game.config.globals.bgMusic.stop();
            this.musicManager.bgMusicPlaying = false;
          } else {
            this.musicButton.setTexture('checkedbox');
            if (this.musicManager.bgMusicPlaying === false) {
              this.sys.game.config.globals.bgMusic.play();
              this.musicManager.bgMusicPlaying = true;
            }
          }
           
          if (this.musicManager.soundOn === false) {
            this.soundButton.setTexture('checkbox');
          } else {
            this.soundButton.setTexture('checkedbox');
          }
    }

    // Create a region in the game where the player can enter to complete the level
    endGameRegion(){
        if (this.player.body.blocked.down) {
            this.scene.start('EndGameScene',{state: "Level complete",au: this.hud.score, ekia: Entity.enemiesDestroyed});
        }
    }

    // Callback function to handle picking up coins
    collectCoins (player, gold)
    {
        if (this.soundManager.soundOn) {
            this.music.play('coin');
            this.music.setVolume(0.05)
        }
        gold.visible = false;
        gold.body.enable = false;
        this.hud.score += 10;
    }

    // Callback function to handle picking up shield
    useShield(player,shield){
        if (this.soundManager.soundOn) {
            this.music.play('Rise1');
            this.music.setVolume(0.3);
        }
        shield.visible = false;
        shield.body.enable = false;
        if (player.shield <= 50) {
            player.shield += 50;
        }else{
            player.shield = 100;
        }
    }

    // Callback function to handle picking up powerup
    usePowerUp(player, powerup){
        if (this.soundManager.soundOn) {
            this.music.play('Rise1');
            this.music.setVolume(0.3);
        }
        powerup.visible = false;
        powerup.body.enable = false;
        if (player.rage <= 50) {
            player.rage += 50;
        } else {
            player.rage = 100;
        }
    }

    // Callback functoin to handle water overlap
    handlePlayerWaterOverlap(p,e){
        p.setTint(0xff0000);
        this.time.addEvent({
            delay: 3000,
            callback: () =>{
                p.clearTint();
                p.health -= 0.009;
            },
            callbackscope: this,
            loop: false
        });
    } // End of handlePlayerWaterOverlap

    // Callback function to handle player collision with enemy
    handlePlayerEnemyCollision(p,e){
        let sprite = p;
        let enemies = e;
        let sound = this.music2;
        let currentAnim = sprite.anims.currentAnim;
        let currentFrame = sprite.anims.currentFrame;
        var frameCount = sprite.anims.getTotalFrames();
        sprite.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
            if ((currentAnim.key == "attack2" || currentAnim.key == "dashA") && sprite.inRange) {
                if (currentFrame.index == frameCount && sprite.attacked) {
                    sprite.attacked = false;
                    this.enemies.children.iterate((child) => {
                        if (child.inRange) {
                            if (this.soundManager.soundOn) {
                                sound.play('attack1');
                                sound.setVolume(0.3)
                            }
                            child.health -= 10;
                        }
                    });
                }
            }            
        });
        this.enemies.children.iterate((child) =>{
            if (!this.player.rage) {
                if (child.causedDamage) {
                    child.causedDamage = false;
                    if (this.soundManager.soundOn) {
                        sound.play('attack1');
                    }
                    if (this.player.shield <= 0) {
                        this.player.health -= child.damage;
                    }else{
                        this.player.shield -= 50;
                    }
                }
            }
                
        })
    }// End of handlePlayerEnemyCollision

    update(time,delta) {
        if (!this.gamePaused) {
            // Update player and HUD only if player is alive
            if (!this.player.isDead) {
                if (this.hud.currentRage <= 0) {
                    this.player.rage = false
                    this.player.clearTint();
                    this.player.setAlpha(1);
                }
                this.hud.updateHUD(this.player.health, this.player.shield,this.player.rage);
                if (this.player.health <= 0) {
                    this.player.playdeath(this.hud);
                }else {
                    this.player.update();
                }
            }

            // Iterate through all the children
            this.enemies.children.iterate((child) => {
                if (this.player.health > 0) {
                    // Making sure child is not dead
                    if (!child.isDead) {
                        // Check if child is ahead or behind the player
                        if (this.player.x > child.x ) {
                            child.aheadOfPlayer = false;
                        }else{
                            child.aheadOfPlayer = true;
                        }
                        // Validating the fighting range between child and player
                        if (Math.abs(child.x - this.player.x)  <= child.fightingRange && Math.abs(child.y - this.player.y)  < 80) {
                            child.contactedPlayer = true;
                            this.player.inRange = true;
                            child.inRange = true;
                        }else{
                            // Change state if contact range exceeded
                            if (child.contactedPlayer && Math.abs(child.x - this.player.x) > 200 || Math.abs(child.y - this.player.y)  >= 80) {
                                child.contactedPlayer = false;
                            }
                            child.inRange = false;
                        }
                    }
                }else{
                    child.attacking = false
                }
            });
        }
    }//End of update
     
}