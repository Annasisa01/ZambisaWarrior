window.onload = function()
{
    // constant that controls the background music
    const musicManager = new Music();

    var power = 0;

    var game;

    // Creating the configurations for the game
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
        scene: [  Welcome,HomeScene, LevelDisplay, OptionScene, InstructionScene, LeaderBoard,Shop, SceneMain,PausedScene, LevelOne, LevelTwo,LevelThree, EndGameScene]
    };

    // Creating a new game
    game = new Phaser.Game(config);

    // Creating global variables for the game
    game.config.globals = {musicManager,bgMusic: null, power}

    if (game.config.physics.arcade.debug) {
        console.log("Level reached is "+level);
        console.log("Initial gold is "+totalGold);
        console.log("Initial Xp is "+totalXp);
    }
}