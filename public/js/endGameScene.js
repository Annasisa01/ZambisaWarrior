class EndGameScene extends Phaser.Scene{
    static currentGold
    constructor(){
        super('EndGameScene');
    }
    init(data){
        EndGameScene.currentGold = data.au;
        console.log("State is "+data.state);
        this.currentState = data.state;
        this.currentXp = Math.floor((data.ekia *117) + (EndGameScene.currentGold * 0.25))
    }
    preload(){
        this.load.image('background','ImageAssets/home_jungle.jpg');

    }
    create(){
        if (this.currentState == "Player died") {
            this.displayText = "Game Over"
            this.lastBtn = "Home"
        }else if (this.currentState == "Level complete") {
            if (this.game.config.globals.level >= localStorage.getItem('level')) {
                localStorage.setItem("level",++this.game.config.globals.level);
            }else{
                this.game.config.globals.level++;
            }
            
            // this.game.config.globals.totalGold += this.currentGold;
            // localStorage.setItem('totalGold', this.game.config.globals.totalGold);
            // console.log(this.game.config.globals.totalGold);
            this.displayText = "Level Completed"
            this.lastBtn = "Next level"
        }
        this.displayText
        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);


        this.add.text(window.innerWidth/2, window.innerHeight/3.5, this.displayText, {fontFamily: 'Papyrus',fontSize: '100px', fill: '#000000'}).setOrigin(0.5)

        this.add.text(window.innerWidth/2 - 80, window.innerHeight/3+60, "Au: ", {fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)
        this.add.text(window.innerWidth/2 + 150, window.innerHeight/3+60,EndGameScene.currentGold+"Au",{fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)


        this.add.text(window.innerWidth/2 - 100, window.innerHeight/2, "Total: ", {fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)
        this.add.text(window.innerWidth/2 + 150, window.innerHeight/2,this.currentXp+"Xp",{fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)

        this.restartBtn = new Button(this,window.innerWidth/2 -150,window.innerHeight/2+50 , "Play again", 10)

        this.nextBtn = new Button(this,window.innerWidth/2 + 60,window.innerHeight/2+50 , this.lastBtn, 10)

        this.exit = new Button(this,window.innerWidth/2- 50,window.innerHeight/2+120 , "Exit game", 10)

        // this.add.text(window.innerWidth/2, window.innerHeight/2+80, "Enter your name below", {fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)

    }
    update(){

    }
}