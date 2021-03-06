class HomeScene extends Phaser.Scene{
    constructor(){
        super('HomeScene');
    }
    preload(){
        loadLeaderBoard();
    }

    create(){
        // Initializing a class variable to the musicManager object from the main.js
        this.musicManager = this.sys.game.config.globals.musicManager;
        if (this.musicManager.musicOn === true && this.musicManager.bgMusicPlaying === true) {
            this.sys.game.config.globals.bgMusic.stop();
            this.sys.game.config.globals.bgMusic = this.sound.add('homethemesong', { volume: 0.5, loop: true });
            this.sys.game.config.globals.bgMusic.play()
        }
        else if (this.musicManager.musicOn === true && this.musicManager.bgMusicPlaying === false) {
            // Adding the background music object to a class variable
            this.bgmusic = this.sound.add('homethemesong', { volume: 0.5, loop: true });
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
            // Changing the state of the bgMusicPlaying global variable to true
            this.musicManager.bgMusicPlaying = true;
            // Initializing the global bgMusic to the current class bgmusic object
            this.sys.game.config.globals.bgMusic = this.bgmusic;
        }
        // Initializing space class variable for difference between 
        this.spacingY = 0;
        // space constant to be added to the space class variable
        const space = 50;

        // Background Image
        // Creating the background image and placing it at the center of the screen
        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        // Scaling the image the fit the whole screen
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);

        // Title
        // Creating text for the title on the homescreen
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

        // Creating Buttons
        // newGameBtn is used to initalize a new game
        // This would clear all the current data(profile) saved from the last game.
        this.newGameBtn = new Button(this,window.innerWidth/2 -55,window.innerHeight/3 + this.spacingY, "New game", 10);
        this.spacingY += space;

        // continueBtn is used to continue the game from the current highest level reached.
        this.continueBtn = new Button(this,window.innerWidth/2 - 55,window.innerHeight/3 + this.spacingY, "Continue", 10);
        this.spacingY += space;

        // instructionBtn is used to display the instructions for the game.
        this.instructionsBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Instructions", 10);
        this.spacingY += space;

        // leaderBoardBtn would be used to display the leader board for players who have completed the game
        this.leaderBoardBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Leaderboard", 10);
        this.spacingY += space;

        // leaderBoardBtn would be used to display the leader board for players who have completed the game
        this.shopBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Shop", 10);
        this.spacingY += space;

        // optionBtn is used to acces the scene where you can off or on background music or sfx
        this.optionBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Options", 10);
        this.spacingY += space;

        // exitBtn is exit the game
        this.exitBtn = new Button(this, window.innerWidth/2 - 55, window.innerHeight/3 + this.spacingY, "Quit", 10);
    }

    

}