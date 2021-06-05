var controls, cam;
class LevelTwo extends Phaser.Scene{
    constructor(){
        super('LevelTwo');
    }

    preload()
    {
        
    }

    create() {
        // Setting the global variable level to current level: 2
        this.game.config.globals.level = 2

        // initializing sounds for sfx to class variables
        this.music = this.sound.addAudioSprite('sfx');
        this.music2 = this.sound.addAudioSprite('sfx2');

        // Creating static groups for diferrent game objects
        this.golds = this.physics.add.staticGroup();
        this.shields = this.physics.add.staticGroup();
        this.health = this.physics.add.staticGroup();
        this.powerups = this.physics.add.staticGroup();
        this.water = this.physics.add.staticGroup();

        // Creating a group for all enemies
        this.enemies = this.physics.add.group({
            collideWorldBounds: true,
            runChildUpdate: true
        });
        
        //Creating gold rotate animation
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

        // Creating health orb animation
        this.anims.create({
            key: 'healthRotate',
            frames: this.anims.generateFrameNames('health'),
            frameRate: 8,
            repeat: -1
        })

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
        this.map = this.make.tilemap({key:'map2'});
        var tiles = this.map.addTilesetImage('grassworld','tiles');
        var watertiles = this.map.addTilesetImage('WaterTileset', 'watersheet');
        var tilesets = [tiles,watertiles];
        var layer = this.map.createLayer('ground',tilesets);
        layer.setCollisionByProperty({ collides: true });
        this.physics.world.setBounds(0, 0, layer.width, layer.height);
        this.cameras.main.fadeIn(5000);
        this.cameras.main.setBounds(0, -(window.innerHeight - layer.height), layer.width, height);

        ///////////////////////////////////////////////////
        //Creating a new player
        this.player = new Player(this, 100, 404, 'player', 100);
        this.player.setScale(scaleValue);
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, layer);
        this.player.setDepth(100);
        

        // Set camera to follow player
        cam = this.cameras.main.startFollow(this.player);


        this.objectsLayer = this.map.getObjectLayer('objectLocations');
        // console.log(this.map);
        // console.log(this.objectsLayer);
        this.objectsLayer.objects.forEach(objData => {
            const {x = 0, y = 0, name, width = 0, height = 0} = objData

            switch (name) {
                case 'startPos':
                    var e = new LightEnemy(this, x, y, 'lightenemy',"LightEnemy", 25);
                    e.body.setSize(this.width,this.height,true);
                    e.setScale(scaleValue);
                    this.enemies.add(e);
                    this.physics.add.collider(this.enemies,layer);
                    break;
                case 'startPos2':
                    var de = new LightEnemy(this,x,y, 'darkenemy', "DarkEnemy", 30)
                    de.body.setSize(this.width,this.height,true);
                    de.setScale(scaleValue);
                    this.enemies.add(de);
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
                case 'health':
                    const health = this.add.sprite(x, y, 'health');
                    health.setScale(2);
                    health.anims.play('healthRotate', true);
                    this.health.add(health);
                    break;
                // case 'water':
                //     const water = this.add.sprite(x, y, 'watersheet');
                //     water.setDepth(200);
                //     water.anims.play('waterfall', true);
                //     this.water.add(water);
                //     break;
                // case 'endPos':
                //     this.endPoint = this.add.sprite(x, y, 'watersheet').setScale(3);
                //     this.physics.add.existing(this.endPoint);
                //     this.endPoint.body.allowGravity = false;
                //     this.endPoint.body.immovable = true;
                //     this.endPoint.angle = 90
                //     this.endPoint.anims.play('portal', true);
                //     this.physics.add.overlap(this.player,this.endPoint, this.endGameRegion, null, this);
                //     break;
                default:
                    break;
            }
        })
        this.enemies.setVelocityX(100);


        this.physics.add.overlap(this.player, this.shields, this.useShield, null, this);
        this.physics.add.overlap(this.player, this.powerups, this.usePowerUp, null, this);
        this.physics.add.overlap(this.player, this.golds, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.health, this.collectHealth, null, this);
   
        ////////////////////////////////////////////////////////
        //Collision
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
        this.physics.add.overlap(this.player, this.water, this.handlePlayerWaterOverlap, null, this);

        ///////////////////////////////////////////////////////
        //Health Bar
        this.healthBar = new HUD(this, 20, 20, this.player.health, this.player.sheild, this.player.rage);

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

    collectHealth(player, health){
        this.music.play('Rise1');
        this.music.setVolume(0.3);
        health.visible = false;
        health.body.enable = false;
        if (player.health <= 50) {
            player.health += 50;
        }else{
            player.health = 100;
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
            
            if (child.causedDamage) {
                child.causedDamage = false
                console.log("Chil attacking is "+child.attacking);
                console.log("i am about to cause damage here");
                sound.play('attack1');
                if (this.player.shield <= 0) {
                    this.player.health -= child.damage;
                    console.log('about to cause damage');
                }else{
                    this.player.shield -= 50;
                    console.log('about to cause damage');
                }
            }
    })
    }

    update(time,delta) {
        if (!this.player.isDead) {
            this.healthBar.updateHUD(this.player.health, this.player.shield,this.player.rage);
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
                    if (Math.abs(child.x - this.player.x)  <= child.fightingRange && Math.abs(child.y - this.player.y)  < 80) {
                        // console.log("Child and player's y's are  ",child.y," ",this.player.y);
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