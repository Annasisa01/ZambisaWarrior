var controls, cam;
class LevelTwo extends SceneMain{
    constructor(){
        super('LevelTwo','map2',400);
    }

    create() {
        super.create();
        // Setting the global variable level to current level: 2
        this.game.config.globals.level = 2
    }

}
