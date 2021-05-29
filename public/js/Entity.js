class Entity extends Phaser.GameObjects.Sprite{
    static enemiesDestroyed = 0;
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
            if (this.type == 'Player') {
                this.scene.scene.start('EndGameScene',{state: "Player died",au: 0, ekia: 0});
                this.destroy()
            } else {
                console.log(++Entity.enemiesDestroyed);
                this.destroy()
            }
            // switch (this.type) {
            //     case 'Player':
            //         this.scene.scene.start('EndGameScene',{state: "Player died",au: 0, ekia: 0});
            //         this.destroy()
            //         break;
            //     case 'LightEnemy':
            //         console.log(++Entity.enemiesDestroyed);
            //         this.destroy()
            //         break;
            //     default:
            //         break;
            // }
        }
    }
}