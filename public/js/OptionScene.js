class OptionScene extends Phaser.Scene{
    constructor(){
        super('OptionScene');
    }
    preload(){
        this.load.image("checkbox", "ImageAssets/check1.png");
        this.load.image("checkedbox","ImageAssets/check2.png");
    }
    create(){
      this.spacing = 40;
      const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);
      this.option = this.add.text(window.innerWidth/2,window.innerHeight/3,"Options",{
          fontFamily: 'Papyrus',
          fontSize: '90px',
          color: '#000000',
      }).setOrigin(0.5);

      this.rectBackground = this.add.rectangle(window.innerWidth/3,window.innerHeight/3 + 60,window.innerWidth/3,300,0xf7e094).setOrigin(0);

      // console.log(window.innerHeight/3,this.rectBackground.height);
      this.musicManager = this.sys.game.config.globals.musicManager;
      
      this.musicButton = this.add.image(window.innerWidth/3 + this.spacing, this.rectBackground.y + this.spacing, 'checkedbox');
      this.musicText = this.add.text(window.innerWidth/3 + this.spacing*2, this.rectBackground.y + this.spacing*0.7, 'Music Enabled', {fontFamily: 'Papyrus', fill: '0x000000', fontSize: 24 });
      
      this.soundButton = this.add.image(window.innerWidth/3 + this.spacing, this.rectBackground.y + this.spacing * 3.5, 'checkedbox');
      this.soundText = this.add.text(window.innerWidth/3 + this.spacing*2, this.rectBackground.y + this.spacing * 3.2, 'SFX Enabled', {fontFamily: 'Papyrus', fill: '0x000000', fontSize: 24 });
      
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

      this.menuButton = new Button(this,window.innerWidth/2 -55, this.soundText.y + this.spacing * 2, "Home", 10);
      this.menuButton.graphics.fillStyle(0x6fb83b,1)
      this.menuButton.graphics.fillRoundedRect(this.menuButton.x, this.menuButton.y, 150, 40, this.menuButton.radius);

      this.updateAudio();
    }
    updateAudio() {
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
}