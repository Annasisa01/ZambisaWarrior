const BTNWIDTH = 150;
const BTNHEIGHT = 40;
const TEXTBOXWIDTH = 300;
const TEXTBOXHEIGHT = 40;
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
        this.displayWord = this.scene.add.text(x+75, y+20, this.text, {fontFamily: 'Papyrus',fontSize: '18px', fill: '#000000'})
            .setOrigin(0.5)
            .setPadding(30,10,30,10)
            .setInteractive()
            .on('pointerdown', this.handleButtons)
            .on('pointerover', this.handleHoverButtons)
    }

    // Fucntion to handle all button creation
    // And property assignment
    handleButtons(){
        // Check what button was clicked
        // Set all the properties concerned with the particular button
        switch (this.text) {
            case "Instructions":
                console.log("Instruction Btn");
                this.scene.scene.start('InstructionScene');
                break;
            case "New game":
                console.log("New game Btn");
                this.container = this.scene.add.container(window.innerWidth*0.75,this.scene.newGameBtn.y ).setAlpha(1)
                const INPUTTEXT = this.scene.add.rexInputText(-BTNWIDTH/3, BTNHEIGHT *0.48, TEXTBOXWIDTH, TEXTBOXHEIGHT, {fontFamily: 'Papyrus',fontSize: '30px',align: 'center',color: '#000000',backgroundColor: '#ffffff',placeholder:"Please enter username"});
                const SUBMITBTN = this.scene.add.text(INPUTTEXT.x - 40, TEXTBOXHEIGHT, "Submit",{fontFamily: 'Papyrus',fontSize: '30px',align: 'center',color: '#000000',backgroundColor: '#f7e094'})
                    .setPadding(30,10,30,10)
                    .setInteractive()
                    .on("pointerdown", ()=>{
                        console.log("Submit btn clicked");
                        if (INPUTTEXT.text == "") {
                            alert("please enter a user name to continue")
                        }else{
                            this.scene.cameras.main.fadeOut(1500);
                            this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                                this.scene.scene.start('LevelDisp',{level: 1});
                            });
                        }
                    })
                this.container.add(INPUTTEXT);
                this.container.add(SUBMITBTN);
                break;
            case "Continue":
                console.log("Continue Btn");
                if (this.scene.game.config.globals.level != 1) {
                    this.scene.cameras.main.fadeOut(1500);
                    this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                        switch (this.scene.game.config.globals.level) {
                            case 2:
                                this.scene.scene.start('LevelDisp',{level: 2});
                                break;
                            case 3:
                                this.scene.scene.start('LevelDisp',{level: 3});
                                break;
                            default:
                                break;
                        }
                    });
                }
                break;
            case "Leaderboard":
                console.log("Leaderboard Btn clicked");
                this.scene.scene.start('LeaderBoard');
                break;
            case "Options":
                console.log("Option Btn");
                this.scene.scene.start('OptionScene');
                break;
            case "Home":
                console.log("Home Btn in OptoinScene clicked");
                this.scene.scene.start('HomeScene');
                break;
            case "Quit":
                console.log("Quit Btn");
                this.scene.game.destroy(true);
                break;
            case "Play again":
                console.log("Current level "+this.scene.game.config.globals.level);
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
                console.log("Next btn clicked");
                this.scene.game.config.globals.totalGold += EndGameScene.currentGold;
                localStorage.setItem('totalGold', this.scene.game.config.globals.totalGold);
                localStorage.setItem("level",++this.scene.game.config.globals.level);
                console.log("current level is "+this.scene.game.config.globals.level);
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

    handleHoverButtons(p){
        // p.setColor(0xffffff);
        console.log("i am hovering");
    }
}