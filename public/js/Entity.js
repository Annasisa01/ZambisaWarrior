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
        this.x = x;
        // const anims = scene.anims;
    }

    // Fucntion that destroys gameobjects when health is 0
    kill(p){
        if(!this.isDead){
            this.isDead = true;
            /*
                if game object type is 'Player', start the EndGameScene scene
                Else, increase the amount of enemies destroyed
            */
            if (this.type == 'Player') {
                this.scene.scene.start('EndGameScene',{state: "Player died",au: 0, ekia: 0});
                this.destroy()
            } else {
                Entity.enemiesDestroyed++;
                this.destroy()
            }
        }
    }
}