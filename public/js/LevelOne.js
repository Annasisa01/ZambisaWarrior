class LevelOne extends SceneMain{
    constructor(){
        super('LevelOne','grassmap',604);
    }
    create(){
        super.create()
        // Setting the global variable level to current level: 1
        this.game.config.globals.level = 1;
    }
}