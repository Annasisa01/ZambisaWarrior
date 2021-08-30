class LevelDisplay extends Phaser.Scene{
    constructor(){
        super('LevelDisp');
    }
    // Recieves the current level from the previous scene
    init(data){
        this.currentLevel = data.level
        this.name = data.name
    }

    create(){
        if(this.currentLevel == 0){
            var tempPlayer = JSON.parse(localStorage.getItem('check_existence'));
            this.game.config.globals.highscore = parseInt(tempPlayer[0][1]);
            this.game.config.globals.totalGold = parseInt(tempPlayer[0][2]);
            this.game.config.globals.level = parseInt(tempPlayer[0][3]);
            this.game.config.globals.speed = parseInt(tempPlayer[0][4]);
            this.game.config.globals.health = parseInt(tempPlayer[0][5]);
            this.game.config.globals.shield = parseInt(tempPlayer[0][6]);



            this.add.text(window.innerWidth/2, window.innerHeight/2, "Welcome, "+tempPlayer[0][0], {fontFamily: 'Bradley Hand',fontSize: '80px', fill: '#ffffff'}).setOrigin(0.5)
            this.time.delayedCall(2000, ()=>{
                this.scene.start('HomeScene');
            },null,this);
            
        }else{
            // Add text displaying the level
            this.add.text(window.innerWidth/2, window.innerHeight/2, "Level "+this.currentLevel, {fontFamily: 'Bradley Hand',fontSize: '80px', fill: '#ffffff'}).setOrigin(0.5)
            this.time.delayedCall(2000, ()=>{
                // Swith statement handling what scene to start
                switch (this.currentLevel) {
                    case 1:
                        this.scene.start('LevelOne');
                        break;
                    case 2:
                        this.scene.start('LevelTwo');
                        break;
                    case 3:
                        this.scene.start('LevelThree');
                        break;
                    default:
                        break;
                }
                
            },null, this
            );
        }
        
    }
}