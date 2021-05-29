window.onload = function()
{
    const musicManager = new Music();
    var level = parseInt(localStorage.getItem('level')) || 1;
    if (level == 1) {
        localStorage.setItem('level', level)
    }
    var totalGold = parseInt(localStorage.getItem('totalGold')) || 0;
    var totalXp = parseInt(localStorage.getItem('totalXp')) || 0;
    console.log("Initial level is "+level);
    console.log("Initial gold is "+totalGold);
    console.log("Initial Xp is "+totalXp);
    var game;
    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x000000,
        parent: 'phaser-game',
        pixelArt: true,
        dom: {
            createContainer: true
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 390 },
                debug: false
            }
        },
        scene: [ HomeScene, LevelOneDisp, OptionScene, InstructionScene, LeaderBoard, SceneMain, LevelTwo, EndGameScene]
    };

    game = new Phaser.Game(config);
    game.config.globals = {musicManager,bgMusic: null, level, totalGold, totalXp}
}