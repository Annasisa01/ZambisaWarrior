class EyeMonster extends Entity{
    constructor(scene, x, y, textureKey,type, damage){
        super(scene,x,y,textureKey,type);

        this.x = x;
        const anims = scene.anims;
        this.causedDamage = false;
        this.damage = damage;
        this.textureKey = textureKey;
        this.inRange = false;
        this.attacking = false;
        this.idle = false;
        this.aheadOfPlayer = true;
        this.health = 30;
        this.fightingRange = 120;
        this.contactedPlayer = false;
        this.attackTimer = 0;

        // I can use this timer to set difficulty of the game
        this.maxTimer = 300/this.scene.game.config.globals.level;
    }
}