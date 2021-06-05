class HUD{
    constructor(scene, x, y, health,shield, rage){
        // Setting the scene of this class to the current scene
        this.scene = scene;
        // Setting player health to current predefined health
        this.currentHealth = health;
        // Setting player shield to amount received
        this.currentShield = shield;
        // Setting player rage to amount received
        this.currentRage = rage
        // Setting shieldAmount 
        this.shieldAmount = 50;
        // Setting the location of the HUD
        this.x = x;
        this.y = y;

        this.score = 0;
        this.scoreText;


        // Creating graphics for the healthbar in the HUD
        this.graphics = this.scene.add.graphics().setScrollFactor(0);
        this.graphics2 = this.scene.add.graphics().setScrollFactor(0);
        this.newGraphics = this.scene.add.graphics().setScrollFactor(0);

        // Creating graphics for the shield in the HUD
        this.sheildGraphics = this.scene.add.graphics().setScrollFactor(0);
        this.sheildGraphics2 = this.scene.add.graphics().setScrollFactor(0);
        this.newSheildGraphics = this.scene.add.graphics().setScrollFactor(0);

        // Creating graphics for the powerup in the HUD
        this.powerupGraphics = this.scene.add.graphics().setScrollFactor(0);
        this.powerupGraphics2 = this.scene.add.graphics().setScrollFactor(0);
        this.newPowerupGraphics = this.scene.add.graphics().setScrollFactor(0);

        // Creating shapes for the healthbar in the HUD
        const healthBarBackground = new Phaser.Geom.Rectangle(x+70, y+4, 104, 14);
        const healthBarBackground2 = new Phaser.Geom.Rectangle(x+72, y+6, 100, 10);
        const healthBarFill = new Phaser.Geom.Rectangle(x+72, y+6, this.currentHealth, 10);

        // Creating shapes for the shield in the HUD
        const shieldBackground = new Phaser.Geom.Rectangle(x+70, y+18, 104, 14);
        const shieldFill = new Phaser.Geom.Rectangle(x+72, y+20,  this.shieldAmount, 6);
        
        // Creating shapes for the powerup in the HUD
        const powerupBackground = new Phaser.Geom.Rectangle(x+310, y+4, 104, 14);
        const powerupBackground2 = new Phaser.Geom.Rectangle(x+312, y+6, 100, 10);
        const powerupFill = new Phaser.Geom.Rectangle(x+312, y+6, 10, 10);

        // Creating the healthbar
        this.graphics.fillStyle(0xffffff, 0.5);
        this.graphics.fillRoundedRect(x+70, y+4, 110, 14,{
            tl:0,
            tr:10,
            bl:0,
            br:10
        });
        this.graphics2.fillStyle(0xff0025, 1);
        this.graphics2.fillRectShape(healthBarBackground2);
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(healthBarFill);

        // Creating the shield
        this.sheildGraphics.fillStyle(0xffffff, 0.5);
        this.sheildGraphics.fillRoundedRect(x+70, y+18, 60, 10,{
            tl:0,
            tr:10,
            bl:0,
            br:10
        });
        this.newSheildGraphics.fillStyle(0x7d7d7d, 1);
        this.newSheildGraphics.fillRectShape(shieldFill);

        // Creating the powerup
        this.powerupGraphics.fillStyle(0xffffff, 0.5);
        this.powerupGraphics.fillRectShape(powerupBackground);
        this.powerupGraphics2.fillStyle(0x3587e2, 0.5);
        this.powerupGraphics2.fillRectShape(powerupBackground2);
        this.newPowerupGraphics.fillStyle(0xff0025, 1);
        this.newPowerupGraphics.fillRectShape(powerupFill);        

        // Adding title text for the healthbar
        this.scene.add.text(x, y+2, 'Health', {fontFamily: 'Papyrus', fontSize: '18px', fill: '#000'}).setScrollFactor(0);

        // Adding text for score
        this.scoreText = this.scene.add.text(x, y+ 50, 'Au: '+ this.score, {fontFamily: 'Papyrus', fontSize: '18px', fill: '#000' }).setScrollFactor(0);

        // Adding title text for the powerup
        this.scene.add.text(x+260, y+2, 'Rage', {fontFamily: 'Papyrus',fontSize: '18px', fill: '#000'}).setScrollFactor(0);
    }
    updateHUD(health,shield,rage){
        this.newGraphics.clear();
        this.newSheildGraphics.clear();
        this.newPowerupGraphics.clear();
        this.scoreText.setText('Au: ' + this.score)
        if (health < 0) {
            this.healthBarFill = new Phaser.Geom.Rectangle(this.x+72, this.y+6, 0, 10);
        }else{
            this.healthBarFill = new Phaser.Geom.Rectangle(this.x+72, this.y+6, health, 10);
        }
        if (shield < 0) {
            this.shieldFill = new Phaser.Geom.Rectangle(this.x+72, this.y+20, 0, 10);
        } else {
            this.shieldFill = new Phaser.Geom.Rectangle(this.x+72, this.y+20,  this.shieldAmount*(shield/100), 6);
        }
        if (shield < 0) {
            this.powerupFill = new Phaser.Geom.Rectangle(this.x+312, this.y+6, 10, 10);
        } else {
            this.powerupFill = new Phaser.Geom.Rectangle(this.x+312, this.y+6, rage, 10);
        }
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(this.healthBarFill);

        this.newSheildGraphics.fillStyle(0x7d7d7d, 1);
        this.newSheildGraphics.fillRectShape(this.shieldFill);

        this.newPowerupGraphics.fillStyle(0xff0025, 1);
        this.newPowerupGraphics.fillRectShape(this.powerupFill);  
    }
}