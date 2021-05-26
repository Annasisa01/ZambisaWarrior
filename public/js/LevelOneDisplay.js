class LevelOneDisp extends Phaser.Scene{
    constructor(){
        super('LevelOneDisp');
    }
    init(data){
        this.currentLevel = data.level
    }
    preload(){

    }
    create(){
        this.add.text(window.innerWidth/2, window.innerHeight/2, "Level "+this.currentLevel, {fontFamily: 'Bradley Hand',fontSize: '80px', fill: '#ffffff'}).setOrigin(0.5)
        this.time.delayedCall(2000, ()=>{
            switch (this.currentLevel) {
                case 1:
                    this.scene.start('SceneMain');
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