window.onload = function()
{
    var game;
    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'phaser-game',
        pixelArt: true,
        audio:{
            // disableWebAudio: true
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 390 },
                debug: true
            }
        },
        scene: SceneMain
    };

    game = new Phaser.Game(config);
}