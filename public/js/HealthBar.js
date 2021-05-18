class HealthBar{
    constructor(scene, x, y, health){
        this.scene = scene;
        this.currentHealth = health;
        this.x = x;
        this.y = y;

        this.graphics = this.scene.add.graphics().setScrollFactor(0);
        this.graphics2 = this.scene.add.graphics().setScrollFactor(0);
        this.newGraphics = this.scene.add.graphics().setScrollFactor(0);

        const healthBarBackground = new Phaser.Geom.Rectangle(x+70, y+4, 104, 14);
        const healthBarBackground2 = new Phaser.Geom.Rectangle(x+72, y+6, 100, 10);
        const healthBarFill = new Phaser.Geom.Rectangle(x+72, y+6, this.currentHealth, 10);

        this.graphics.fillStyle(0xffffff, 0.5);
        this.graphics.fillRectShape(healthBarBackground);
        this.graphics2.fillStyle(0xff0025, 1);
        this.graphics2.fillRectShape(healthBarBackground2);
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(healthBarFill);

        this.scene.add.text(x, y+2, 'Health', {fontSize: '18px', fill: '#000'}).setScrollFactor(0);
    }
    updateHealth(health){
        this.newGraphics.clear();
        this.currentHealth = health;
        const healthBarFill = new Phaser.Geom.Rectangle(this.x+72, this.y+6, this.currentHealth, 10);
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(healthBarFill);
    }
}