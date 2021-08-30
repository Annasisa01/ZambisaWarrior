const BTNWIDTH = 150;
const BTNHEIGHT = 40;
const TEXTBOXWIDTH = 300;
const TEXTBOXHEIGHT = 40;
var displayWord;
class Button{
    constructor(scene, x, y, text, radius){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.text = text;
        this.radius = radius;
        
        // Adding graphics to this scene
        this.graphics = this.scene.add.graphics();
        this.graphics.fillStyle(0xf7e094,1);

        // Creating a rounded rectangle for the button
        this.graphics.fillRoundedRect(this.x, this.y, BTNWIDTH, BTNHEIGHT, this.radius);
        // Creating a stroke rounded rectangle to serve as outline for the button
        this.graphics.strokeRoundedRect(this.x, this.y, BTNWIDTH, BTNHEIGHT, this.radius);

        // Creating the text that would display on the button
        // Setting event listeners for the text to serve as the main button
        displayWord = this.scene.add.text(x+75, y+20, this.text, {fontFamily: 'Papyrus',fontSize: '18px', fill: '#000000'})
            .setOrigin(0.5)
            .setPadding(30,10,30,10)
            .setInteractive()
            .on('pointerdown', this.handleButtons)
            .on('pointerover', this.handleHoverButtons)
    }
g
    // Fucntion to handle all button creation
    // And property assignment
    handleButtons(){
        // Check what button was clicked
        // Set all the properties concerned with the particular button
        switch (this.text) {
            case "Instructions":
                this.scene.scene.start('InstructionScene');
                break;
            case "New game":
                if (confirm("All saved progress would be lost.\nAre you sure you want to proceed?")) {
                    this.scene.game.config.globals.level = 1;
                    this.scene.game.config.globals.highscore = 0;
                    this.scene.game.config.globals.totalGold = 0;
                    this.scene.game.config.globals.speed = 300;
                    this.scene.game.config.globals.health = 100;
                    this.scene.game.config.globals.shield = 100;
                    updatePlayer(JSON.parse(localStorage.getItem('check_existence'))[0][0],
                    this.scene.game.config.globals.highscore,
                    this.scene.game.config.globals.totalGold,
                    this.scene.game.config.globals.level,
                    this.scene.game.config.globals.health,
                    this.scene.game.config.globals.speed,
                    this.scene.game.config.globals.shield);  
                    checkExistence(JSON.parse(localStorage.getItem('check_existence'))[0][0]);
                    this.scene.cameras.main.fadeOut(1500);
                    this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                        this.scene.scene.start('LevelDisp',{level: this.scene.game.config.globals.level});
                    });
                }
                break;
            case "Continue":
                if (this.scene.game.config.globals.level != 1 && this.scene.game.config.globals.level < 4) {
                    var tempPlayer = JSON.parse(localStorage.getItem('check_existence'));
                    this.scene.game.config.globals.level = parseInt(tempPlayer[0][3]);
                    console.log("current level is "+this.scene.game.config.globals.level);
                    this.scene.cameras.main.fadeOut(1500);
                    this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                        switch (this.scene.game.config.globals.level) {
                            case 2:
                                this.scene.scene.start('LevelDisp',{level: 2});
                                break;
                            case 3:
                                console.log("i AM AT LEVEL 3");
                                this.scene.scene.start('LevelDisp',{level: 3});
                                break;
                            default:
                                break;
                        }
                    });
                }
                break;
            case "Leaderboard":
                var arr = JSON.parse(localStorage.getItem("leaderboard"));
                console.log("Leaderboard Btn clicked");
                this.scene.scene.start('LeaderBoard',{leaderboard: arr});
                break;
            case "Shop":
                this.scene.scene.start('Shop');
                break;
            case "Options":
                this.scene.scene.start('OptionScene');
                break;
            case "Home":
                if (this.scene.scene.key == 'EndGameScene') {
                    if (localStorage.getItem("player_state") == "Alive") {
                        this.scene.game.config.globals.totalGold += EndGameScene.currentGold;
                        localStorage.setItem('totalGold', this.scene.game.config.globals.totalGold);
                        localStorage.setItem("level",++this.scene.game.config.globals.level);
                        updatePlayer(JSON.parse(localStorage.getItem('check_existence'))[0][0],
                        this.scene.game.config.globals.highscore,
                        this.scene.game.config.globals.totalGold,
                        this.scene.game.config.globals.level,
                        this.scene.game.config.globals.health,
                        this.scene.game.config.globals.speed,
                        this.scene.game.config.globals.shield);                    }
                    this.scene.scene.start('HomeScene');
                }else if (this.scene.scene.key == 'Shop') {
                    updatePlayer(JSON.parse(localStorage.getItem('check_existence'))[0][0],
                    this.scene.game.config.globals.highscore,
                    this.scene.game.config.globals.totalGold,
                    this.scene.game.config.globals.level,
                    this.scene.game.config.globals.health,
                    this.scene.game.config.globals.speed,
                    this.scene.game.config.globals.shield);             
                    this.scene.scene.start('HomeScene');   
                }
                else{
                    console.log("Home Btn in OptoinScene clicked");
                    this.scene.scene.start('HomeScene');
                }
                break;
            case "Quit":
                this.scene.game.destroy(true);
                break;
            case "Play again":
                switch (this.scene.game.config.globals.level) {
                    case 1:
                        this.scene.cameras.main.fadeOut(1500);
                        this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                            this.scene.scene.start('LevelDisp',{level: 1});
                        });
                        break;
                    case 2:
                        this.scene.cameras.main.fadeOut(1500);
                        this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                            this.scene.scene.start('LevelDisp',{level: 2});
                        });
                        break;
                    case 3:
                        this.scene.cameras.main.fadeOut(1500);
                        this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                            this.scene.scene.start('LevelDisp',{level: 3});
                        });
                    default:
                        break;
                }
                break;
            case "Next level":
                this.scene.game.config.globals.totalGold += EndGameScene.currentGold;
                localStorage.setItem('totalGold', this.scene.game.config.globals.totalGold);
                localStorage.setItem("level",++this.scene.game.config.globals.level);
                updatePlayer(JSON.parse(localStorage.getItem('check_existence'))[0][0],
                this.scene.game.config.globals.highscore,
                this.scene.game.config.globals.totalGold,
                this.scene.game.config.globals.level,
                this.scene.game.config.globals.health,
                this.scene.game.config.globals.speed,
                this.scene.game.config.globals.shield);
                switch (this.scene.game.config.globals.level) {
                    case 2:
                        this.scene.cameras.main.fadeOut(1500);
                        this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                            this.scene.scene.start('LevelDisp',{level: 2});
                        });
                        break;
                    case 3:
                        this.scene.cameras.main.fadeOut(1500);
                        this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                            this.scene.scene.start('LevelDisp',{level: 3});
                        });
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    }

    handleHoverButtons(){
        // displayWord.setColor("0xffffff");
        // console.log("i am hovering");
    }
}