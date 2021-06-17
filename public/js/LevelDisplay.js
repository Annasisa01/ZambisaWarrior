class LevelDisplay extends Phaser.Scene{
    constructor(){
        super('LevelDisp');
    }
    // Recieves the current level from the previous scene
    init(data){
        this.currentLevel = data.level
    }

    create(){
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