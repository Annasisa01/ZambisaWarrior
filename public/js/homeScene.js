class HomeScene extends Phaser.Scene{
    constructor(){
        super('HomeScene');
    }
    preload(){
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        this.load.audio('theme', [
            'assets/audio/forest.ogg',
            'assets/audio/forest.mp3'
        ]);
        this.load.image('background','ImageAssets/home_jungle.jpg');

        this.load.atlas("player", "ImageAssets/player.png", "ImageAssets/player.json");
        this.load.atlas("lightenemy", "ImageAssets/lightbandit.png","ImageAssets/lightbandit.json");
        this.load.atlas("darkenemy", "ImageAssets/darkbandit.png", "ImageAssets/darkbandit.json");
        this.load.atlas("eyemonster", "ImageAssets/eyemonster.png","ImageAssets/eyemonster.json");
    }

    create(){
        console.log("Window innerHeight is "+window.innerHeight);
        this.musicManager = this.sys.game.config.globals.musicManager;
        if (this.musicManager.musicOn === true && this.musicManager.bgMusicPlaying === false) {
            this.bgmusic = this.sound.add('theme', { volume: 0.5, loop: true });
            if (!this.sound.locked)
            {
                // already unlocked so play
                this.bgmusic.play()
            }
            else
            {
                // wait for 'unlocked' to fire and then play
                this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                    this.bgmusic.play()
                })
            }
            // this.bgmusic.play();
            this.musicManager.bgMusicPlaying = true;
            this.sys.game.config.globals.bgMusic = this.bgmusic;
        }
        
        this.spacingY = 0;
        const space = 50;

        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);

        
        this.zambisa = this.add.text(window.innerWidth/2,window.innerHeight/4,"Zambisa",{
            fontFamily: 'Papyrus',
            fontSize: '90px',
            color: '#000000',
        }).setOrigin(0.5);
        this.warrior = this.add.text(window.innerWidth/2, window.innerHeight/3.3,"WARRIOR",{
            fontFamily: 'serif',
            fontSize: '50px',
            color: '#000000',
        }).setOrigin(0.5);


        this.newGameBtn = new Button(this,window.innerWidth/2 -55,window.innerHeight/3 + this.spacingY, "New game", 10);
        this.spacingY += space;
        this.continueBtn = new Button(this,window.innerWidth/2 - 55,window.innerHeight/3 + this.spacingY, "Continue", 10);
        this.spacingY += space;
        this.instructionsBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Instructions", 10);
        this.spacingY += space;
        this.exitBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Leaderboard", 10);
        this.spacingY += space;
        this.optionBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Options", 10);
        this.spacingY += space;
        this.exitBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Exit", 10);

        
    }
    update(){
        
    }
}