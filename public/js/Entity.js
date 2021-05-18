class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, textureKey, type){
        super(scene,x,y,textureKey,type);

        this.scence = scene;
        this.textureKey = textureKey;
        this.scence.add.existing(this);
        this.scence.physics.world.enableBody(this,0);
        this.type = type;
        this.isDead = false;
    }

    kill(){
        if(!this.isDead){
            this.isDead = true;
            this.destroy();
            console.log("entity dead");
        }
    }
}