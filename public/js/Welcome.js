class Welcome extends Phaser.Scene{
    constructor(){
        super('Welcome');
    }
    preload(){
        // Loading the text box plugin
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);

        // Loading the background music
        this.load.audio('homethemesong', 
            'assets/audio/forest.mp3'
        );

        this.load.audio('levelbgsong',
            'assets/audio/dave.mp3'
        );

        this.load.audio('victory',
            'assets/audio/Victory.ogg'
        );

        this.load.audio('loss',
            'assets/audio/Lost.ogg'
        );

        // Loading the background image
        this.load.image('background','ImageAssets/home_jungle.jpg');

        // Loading the different levels for the first parallax background
        this.load.image('level4','assets/FORESTBACKGROUND/Layers/ground.png');
        this.load.image('level2','assets/FORESTBACKGROUND/Layers/mountains.png');
        this.load.image('level5','assets/FORESTBACKGROUND/Layers/plant.png');
        this.load.image('level3','assets/FORESTBACKGROUND/Layers/plateau.png');
        this.load.image('level1','assets/FORESTBACKGROUND/Layers/sky.png');

        // Loading the different levels for the second parallax background
        this.load.image('Bluelevel10','assets/FORESTBACKGROUND/BlueBGLayer/10_Sky.png');
        this.load.image('Bluelevel9','assets/FORESTBACKGROUND/BlueBGLayer/09_Forest.png');
        this.load.image('Bluelevel8','assets/FORESTBACKGROUND/BlueBGLayer/08_Forest.png');
        this.load.image('Bluelevel7','assets/FORESTBACKGROUND/BlueBGLayer/07_Forest.png');
        this.load.image('Bluelevel6','assets/FORESTBACKGROUND/BlueBGLayer/06_Forest.png');
        this.load.image('Bluelevel5','assets/FORESTBACKGROUND/BlueBGLayer/05_Particles.png');
        this.load.image('Bluelevel4','assets/FORESTBACKGROUND/BlueBGLayer/04_Forest.png');
        this.load.image('Bluelevel3','assets/FORESTBACKGROUND/BlueBGLayer/03_Particles.png');
        this.load.image('Bluelevel2','assets/FORESTBACKGROUND/BlueBGLayer/02_Bushes.png');
        this.load.image('Bluelevel1','assets/FORESTBACKGROUND/BlueBGLayer/01_Mist.png');

        // Loading the different levels for the third parallax background
        this.load.image('TheDawn1','assets/FORESTBACKGROUND/TheDawn/1.png');
        this.load.image('TheDawn2','assets/FORESTBACKGROUND/TheDawn/2.png');
        this.load.image('TheDawn3','assets/FORESTBACKGROUND/TheDawn/3.png');
        this.load.image('TheDawn4','assets/FORESTBACKGROUND/TheDawn/4.png');
        this.load.image('TheDawn5','assets/FORESTBACKGROUND/TheDawn/5.png');
        this.load.image('TheDawn6','assets/FORESTBACKGROUND/TheDawn/6.png');
        this.load.image('TheDawn7','assets/FORESTBACKGROUND/TheDawn/7.png');
        this.load.image('TheDawn8','assets/FORESTBACKGROUND/TheDawn/8.png')

        // Loading the sprites for all the characters
        this.load.atlas("player", "ImageAssets/player.png", "ImageAssets/player.json");
        this.load.atlas("lightenemy", "ImageAssets/lightbandit.png","ImageAssets/lightbandit.json");
        this.load.atlas("darkenemy", "ImageAssets/darkbandit.png", "ImageAssets/darkbandit.json");
        this.load.atlas("eyemonster", "ImageAssets/eyemonster.png","ImageAssets/eyemonster.json");
        this.load.atlas("goblinmonster", "ImageAssets/goblinmonster.png","ImageAssets/goblinmonster.json");
        this.load.atlas("mushroommonster", "ImageAssets/mushroommonster.png","ImageAssets/mushroommonster.json");


        // Loading the the sprite needed for the maps and HUD
        this.load.image('tiles','assets/sheet.png');
        this.load.image('tiles2','assets/spritesheet_ground.png');
        this.load.image('items','assets/spritesheet_tiles.png');
        this.load.image('watersheet','assets/WaterTileset.png');
        this.load.image('addons','assets/adds.png');
        this.load.image("eye", "ImageAssets/eyes.png");
        this.load.spritesheet('waterfallsheet','assets/WaterTileset.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('wind','ImageAssets/wind.png', { frameWidth: 60, frameHeight: 45 })
        this.load.spritesheet('gold','ImageAssets/gold.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('health','ImageAssets/health_gem.png',{frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('shield','ImageAssets/shield_gem.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('powerup','ImageAssets/powerup_gem.png', { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON('grassmap','assets/world.json');
        this.load.tilemapTiledJSON('map2','assets/level2.json');
        this.load.tilemapTiledJSON('map3','assets/level3.json')



        // Loading audio files for SFX
        this.load.audioSprite('sfx', 'assets/audio/fx1.json', [
            'assets/audio/Soundtrack1.ogg',
            'assets/audio/Soundtrack1.wav'
        ]);
        this.load.audioSprite('sfx2', 'assets/audio/fx2.json', [
            'assets/audio/Soundtrack2.mp3',
            'assets/audio/Soundtrack2.wav'
        ]);

        // Check boxes for enabling and disabling sound
        this.load.image("checkbox", "ImageAssets/check1.png");
        this.load.image("checkedbox","ImageAssets/check2.png");
}

    create(){
        // Background Image
        // Creating the background image and placing it at the center of the screen
        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        // Scaling the image the fit the whole screen
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);
        

        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000,0.75);
        this.graphics.fillRoundedRect(window.innerWidth*0.25,window.innerHeight*0.25,window.innerWidth*0.5,innerHeight*0.5, 20);
        this.eyes = this.add.image(window.innerWidth/2,window.innerHeight*0.25,'eye').setOrigin(0.5).setScale(0.5);
        this.question = this.add.text(window.innerWidth/2,window.innerHeight*0.45,"Who is playing?",{
            fontFamily: 'Papyrus',
            fontSize: '70px',
            color: "#f7e094"
        }).setOrigin(0.5);

        this.container = this.add.container(window.innerWidth/2,this.eyes.y + 200 )
                var inputText = this.add.rexInputText(0, 40 *0.48, window.innerWidth*0.45, 40, {fontFamily: 'Papyrus',fontSize: '30px',align: 'center',color: '#000000',backgroundColor: '#ffffff',placeholder:"Please enter a username"});
                var submitBtn = this.add.text(inputText.x , 80, "Submit",{fontFamily: 'Papyrus',fontSize: '30px',align: 'center',color: '#000000'}).setOrigin(0.5)
                    .setPadding(30,10,30,10)
                    .setInteractive()
                    .on("pointerdown", ()=>{
                        var words = inputText.text.split('')
                        if (inputText.text == "") {
                            alert("please enter a user name to continue")
                        }
                        else if(words.length > 8){
                            alert("Username must be less than or equal to 8 characters")
                        }
                        else{
                            this.addPlayer(inputText.text);
                            this.cameras.main.fadeOut(1500);
                            this.cameras.main.once('camerafadeoutcomplete', function () {
                                this.scene.scene.start('LevelDisp',{level: 0, name: inputText.text});
                            });
                        }
                    })

        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x6fb83b,1);
        this.graphics.fillRoundedRect(submitBtn.x - 80,submitBtn.y - 35,160,70, 10);
        this.container.add(inputText);
        this.container.add(this.graphics)
        this.container.add(submitBtn);

    }

    addPlayer(name){
        checkExistence(name)
        this.time.delayedCall(500, ()=>{
            
            if (localStorage.getItem('check_existence') == 'Player not found') {
                console.log("Trying to add new player");
                var check = new XMLHttpRequest();
                check.onload = function () {
                    console.log(this.responseText);
                    checkExistence(name)
                }
                check.open("POST", "add_player.php");
                check.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                check.send('name='+name+' &gold= 0 &highscore= 0 &level= 1');
            }else{
                var tempPlayer = JSON.parse(localStorage.getItem('check_existence'));
                console.log("Player info found");
                console.log("Welcome back "+tempPlayer[0][0]);
            }
        }, null, this);  // delay in ms
        
    }

}