class PausedScene extends Phaser.Scene{
    constructor(){
        super('PausedScene');
    }

    preload(){
        // Loading the background image
        this.load.image('background','ImageAssets/home_jungle.jpg');
        this.load.image("checkbox", "ImageAssets/check1.png");
        this.load.image("checkedbox","ImageAssets/check2.png");
    }

    create(){
        // instance variable used for spacing objects
        this.spacing = 150;

        // Rectangular background for all pause scene objects
        this.rectBackground = this.add.rectangle(window.innerWidth/2,window.innerHeight/2, window.innerWidth/2.3,450,0xf7e094);

        // Paused text for header
        this.pauseText = this.add.text(this.rectBackground.x,this.rectBackground.y-this.spacing,"Paused",{
            fontFamily: 'Papyrus',
            fontSize: '90px',
            color: '#000000',
        }).setOrigin(0.5);

        // get music manager from system gloabal variable musicManager
        this.musicManager = this.sys.game.config.globals.musicManager;

        this.musicButton = this.add.image(this.rectBackground.x - this.spacing * 1, this.rectBackground.y - this.spacing/2, 'checkedbox');
        this.musicText = this.add.text(this.rectBackground.x - this.spacing * 0.5, this.rectBackground.y - this.spacing/1.75, 'Music Enabled', {fontFamily: 'Papyrus', fill: '0x000000', fontSize: 24 });
        
        this.soundButton = this.add.image(this.rectBackground.x - this.spacing * 1, this.rectBackground.y , 'checkedbox');
        this.soundText = this.add.text(this.rectBackground.x - this.spacing * 0.5, this.rectBackground.y - this.spacing * 0.075, 'SFX Enabled', {fontFamily: 'Papyrus', fill: '0x000000', fontSize: 24 });
        
        this.musicButton.setInteractive();
        this.soundButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
            console.log("Music btn clicked");
            this.musicManager.musicOn = !this.musicManager.musicOn;
            this.updateAudio();
        }.bind(this));
        
        this.soundButton.on('pointerdown', function () {
        this.musicManager.soundOn = !this.musicManager.soundOn;
        this.updateAudio();
        }.bind(this));

        this.updateAudio();

        this.pause = this.input.keyboard.addKey('P');
        this.pause.on('down', ()=>{
            switch (this.game.config.globals.level) {
                case 1:
                    this.scene.switch('LevelOne');
                    break;
            
                default:
                    break;
            }
            
        });
    }

    updateAudio() {
        if (this.musicManager.musicOn === false) {
            console.log("I suppose de here");
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
}