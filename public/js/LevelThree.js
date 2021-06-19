class LevelThree extends SceneMain{
    constructor(){
        super("LevelThree",'map3',400);
    }

    create() {
        super.create();
        // Setting the global variable level to current level: 2
        this.game.config.globals.level = 3
    }
}