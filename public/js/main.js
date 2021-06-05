window.onload = function()
{
    // constant that controls the background music
    const musicManager = new Music();

    // Retrieving the current level reached from local storage
    // If null (i.e., beginning of the game), initiallize to 1
    var level = parseInt(localStorage.getItem('level')) || 1;
    if (level == 1) {
        localStorage.setItem('level', level)
    }

    // Retrieving the current total gold collected from local storage
    // If null (i.e., beginning of the game), initiallize to 0 
    var totalGold = parseInt(localStorage.getItem('totalGold')) || 0;

    // Retrieving the current total XP earned from local storage
    // If null (i.e., beginning of the game), initiallize to 0 
    var totalXp = parseInt(localStorage.getItem('totalXp')) || 0;

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
        scene: [ HomeScene, LevelOneDisp, OptionScene, InstructionScene, LeaderBoard, SceneMain, LevelTwo, EndGameScene]
    };

    // Creating a new game
    game = new Phaser.Game(config);

    // Creating global variables for the game
    game.config.globals = {musicManager,bgMusic: null, level, totalGold, totalXp}

    if (game.config.physics.arcade.debug) {
        console.log("Level reached is "+level);
        console.log("Initial gold is "+totalGold);
        console.log("Initial Xp is "+totalXp);
    }
}