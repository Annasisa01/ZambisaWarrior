class EndGameScene extends Phaser.Scene{
    constructor(){
        super('EndGameScene');
    }
    init(data){
        this.currentGold = data.au;
        console.log("State is "+data.state);
        this.currentState = data.state;
        this.cuurentXp = Math.floor((data.ekia *117) + (this.currentGold * 0.25))
        this.game.config.globals.totalGold += this.currentGold;
        localStorage.setItem('totalGold', this.game.config.globals.totalGold);
        console.log(this.game.config.globals.totalGold);
    }
    preload(){
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        this.load.image('background','ImageAssets/home_jungle.jpg');

    }
    create(){
        if (this.currentState == "Player died") {
            this.displayText = "Game Over"
            this.lastBtn = "Home"
        }else if (this.currentState == "Level complete") {
            localStorage.setItem("level",++this.scene.game.config.globals.level)
            this.displayText = "Level Completed"
            this.lastBtn = "Next level"
        }
        this.displayText
        this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5).setScale(2.5,2.8);
        this.add.text(window.innerWidth/2, window.innerHeight/3.5, this.displayText, {fontFamily: 'Papyrus',fontSize: '100px', fill: '#000000'}).setOrigin(0.5)

        this.add.text(window.innerWidth/2 - 80, window.innerHeight/3+60, "Au: ", {fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)
        this.add.text(window.innerWidth/2 + 150, window.innerHeight/3+60,this.currentGold+"Au",{fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)


        this.add.text(window.innerWidth/2 - 100, window.innerHeight/2, "Total: ", {fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)
        this.add.text(window.innerWidth/2 + 150, window.innerHeight/2,this.cuurentXp+"Xp",{fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)

        this.restartBtn = new Button(this,window.innerWidth/2 -150,window.innerHeight/2+50 , "Play again", 10)

        this.nextBtn = new Button(this,window.innerWidth/2 + 60,window.innerHeight/2+50 , this.lastBtn, 10)

        this.exit = new Button(this,window.innerWidth/2- 50,window.innerHeight/2+120 , "Exit game", 10)

        // this.add.text(window.innerWidth/2, window.innerHeight/2+80, "Enter your name below", {fontFamily: 'Papyrus',fontSize: '50px', fill: '#000000'}).setOrigin(0.5)

        // var inputText = this.add.rexInputText(window.innerWidth/2, window.innerHeight/2+150, 400, 50, {fontFamily: 'Papyrus',fontSize: '30px',align: 'center',color: '#000000',backgroundColor: '#ffffff'});

    }
    update(){

    }
}