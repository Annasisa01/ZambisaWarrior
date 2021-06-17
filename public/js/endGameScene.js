class EndGameScene extends Phaser.Scene{
    static currentGold
    constructor(){
        super('EndGameScene');
    }
    /*
        Init function to recieve data from the previous scene as a parameter
        data is an array that has: 
            1. The current state of the game (i.e., Level complete or Level failed)
            2. AU which holds the total amount of gold acquired during play
            3. Ekia which has the total number of enemies killed during play
        instance variable currentState is set to state recieved from data
        class variable currentGold is set to amount of gold recieved from data
        instance variable currentXp is set to the multiplication of enemies destroyed by a constant
        added to the multiplication of the class variable currentGold by a constant
    */
    init(data){
        EndGameScene.currentGold = data.au;
        this.currentState = data.state;
        this.currentXp = Math.floor((data.ekia *117) + (EndGameScene.currentGold * 0.25))
    }


    // Create function creates all the objects to be rendered in this scene
    create(){
        /*
            Set the display header text to Game Over if the current state 
            passed from the init function is "Player died" and set the 
            lastBtn to "Home".

            Otherwise, if the current state is "Level complete" and if the level
            completed is greater than or equals to the level stored on local storage,
            increment the current level and then store it on local storage, else just 
            increment the level then set the display text to "Level completed" and the
            lastbtn to "Next level"
        */
        if (this.currentState == "Player died") {
            this.displayText = "Game Over"
            this.lastBtn = "Home"
        }else if (this.currentState == "Level complete") {
            if (this.game.config.globals.level >= localStorage.getItem('level')) {
                localStorage.setItem("level",this.game.config.globals.level+1);
            }
            //  else{
            //     this.game.config.globals.level++;
            // }
            this.displayText = "Level Completed"
            this.lastBtn = "Next level"
        }

        /* 
            Adding background image to this scene
            Scale image using a fraction of the image width and height to the window
            width and height respectively
        */
        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);


        // Adding all text for this scene
        this.add.text(window.innerWidth/2, window.innerHeight/3.5, this.displayText, {fontFamily: 'Papyrus',fontSize: '100px', fill: '#000000'}).setOrigin(0.5);
        this.add.text(window.innerWidth/2 - 80, window.innerHeight/3+60, "Au: ", {fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5);
        this.add.text(window.innerWidth/2 + 150, window.innerHeight/3+60,EndGameScene.currentGold+"Au",{fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5);
        this.add.text(window.innerWidth/2 - 100, window.innerHeight/2, "Total: ", {fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5);
        this.add.text(window.innerWidth/2 + 150, window.innerHeight/2,this.currentXp+"Xp",{fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5);

        // Adding buttons to navigate the endgame scene
        // restartBtn would allow the player start the completed level again
        this.restartBtn = new Button(this,window.innerWidth/2 -150,window.innerHeight/2+50 , "Play again", 10);
        // nextBtn would start the next level
        this.nextBtn = new Button(this,window.innerWidth/2 + 60,window.innerHeight/2+50 , this.lastBtn, 10);
        // exit allows the to quit the game
        this.exit = new Button(this,window.innerWidth/2- 50,window.innerHeight/2+120 , "Quit", 10);

    }
}