class Enemies extends Entity{
    constructor(scene,x,y,textureKey,type){
        super(scene,x,y,textureKey,type);
        // const anims = scene.anims;
        this.x = x;
        this.causedDamage = false;
        this.inRange = false;
        this.attacking = false;
        this.idle = false;
        this.aheadOfPlayer = true;
        this.contactedPlayer = false;
        this.attackTimer = 0;
    }
}