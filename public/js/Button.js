class Button{
    constructor(scene, x, y, text, radius){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.text = text;
        this.radius = radius;
        
        this.graphics = this.scene.add.graphics();

        // const buttonBackground = new Phaser.Geom.Rectangle(this.x, this.y, 110, 40);

        this.graphics.fillStyle(0xf7e094,1);
        this.graphics.lineStyle(2, 0x000000, 1);
        this.graphics.fillRoundedRect(this.x, this.y, 150, 40, this.radius);
        this.graphics.strokeRoundedRect(this.x, this.y, 150, 40, this.radius);

        this.displayWord = this.scene.add.text(x+75, y+20, this.text, {fontFamily: 'Papyrus',fontSize: '18px', fill: '#000000'})
            .setOrigin(0.5)
            .setPadding(30,10,30,10)
            .setInteractive()
            .on('pointerdown', this.handleHomeButtons)
            .on('pointerover', this.handleHoverButtons)
    }

    handleHomeButtons(){
        switch (this.text) {
            case "Instructions":
                console.log("Instruction Btn");
                this.scene.scene.start('InstructionScene');
                break;
            case "New game":
                console.log("New game Btn");
                this.scene.cameras.main.fadeOut(1500);
                this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                    this.scene.scene.start('LevelOneDisp',{level: 1});
                });
                break;
            case "Continue":
                console.log("Continue Btn");
                if (this.scene.game.config.globals.level != 1) {
                    this.scene.cameras.main.fadeOut(1500);
                    this.scene.cameras.main.once('camerafadeoutcomplete', function () {
                        switch (this.scene.game.config.globals.level) {
                            case 2:
                                this.scene.scene.start('LevelOneDisp',{level: 2});
                                break;
                            case 3:
                                this.scene.scene.start('LevelOneDisp',{level: 3});
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
            case "Exit game":
                console.log("Exit Btn");
                this.scene.game.destroy(true);
                break;
            case "Play again":
                switch (this.scene.game.config.globals.level) {
                    case 1:
                        this.scene.scene.start("SceneMain")
                        break;
                
                    default:
                        break;
                }
                break;
            case "Next level":
                console.log(this.scene.game.config.globals.level);
                switch (this.scene.game.config.globals.level) {
                    case 2:
                        this.scene.scene.start("LevelTwo")
                        break;
                    case 3:
                        this.scene.scene.start("LevelThree")
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    }

    handleHoverButtons(){
        // this.displayWord.setColor('#ffffff');
    }

    update(){
        
    }
}