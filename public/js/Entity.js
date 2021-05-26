class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, textureKey, type){
        super(scene,x,y,textureKey,type);
        this.scene = scene;
        this.textureKey = textureKey;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this,0);
        this.type = type;
        this.isDead = false;
    }

    kill(p){
        if(!this.isDead){
            this.isDead = true;
            switch (this.type) {
                case 'Player':
                    console.log();
                    this.scene.scene.start('EndGameScene',{state: "Player died",au: 0, ekia: 0});
                    this.destroy()
                    break;
                case 'LightEnemy':
                    this.destroy()
                    break;
                default:
                    break;
            }
        }
    }
}