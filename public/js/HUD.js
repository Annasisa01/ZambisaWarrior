class HUD{
    constructor(scene, x, y, health,shield, rage){
        // Setting the scene of this class to the current scene
        this.scene = scene;
        // Setting player health to current predefined health
        this.currentHealth = health;
        // Setting player shield to amount received
        this.currentShield = shield;
        // Setting player rage to amount received
        this.currentRage = this.scene.game.config.globals.power;

        // Setting shieldAmount 
        this.shieldAmount = 100;
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
        // const healthBarBackground = new Phaser.Geom.Rectangle(x+100, y+4, this.currentHealth+4, 20);
        const healthBarBackground2 = new Phaser.Geom.Rectangle(x+102, y+6, this.currentHealth, 15);
        const healthBarFill = new Phaser.Geom.Rectangle(x+102, y+6, this.currentHealth, 10);

        // Creating shapes for the shield in the HUD
        const shieldBackground = new Phaser.Geom.Rectangle(x+100, y+24, this.shieldAmount+5, 8);
        const shieldFill = new Phaser.Geom.Rectangle(x+102, y+25,  this.shieldAmount, 6);
        
        // Creating shapes for the powerup in the HUD
        const powerupBackground = new Phaser.Geom.Rectangle(x+410, y+10, 104, 20);
        const powerupBackground2 = new Phaser.Geom.Rectangle(x+412, y+12, 100, 15);
        const powerupFill = new Phaser.Geom.Rectangle(x+412, y+12, this.currentRage, 15);

        // Creating the healthbar
        this.graphics.fillStyle(0xffffff, 0.5);
        this.graphics.fillRoundedRect(x+100, y+4, this.currentHealth+5, 20,{
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
        this.sheildGraphics.fillRectShape(shieldBackground);
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
        this.health = this.scene.add.text(x-5, y+2, 'Health:', {fontFamily: 'Papyrus', fontSize: '30px', fill: '#000',strokeThickness: 5}).setScrollFactor(0);

        // Adding text for score
        this.scoreText = this.scene.add.text(x, y+ 70, 'Gold: '+ this.score, {fontFamily: 'Papyrus', fontSize: '30px', fill: '#000',strokeThickness: 5 }).setScrollFactor(0);

        // Adding title text for the powerup
        this.text2 = this.scene.add.text(x+250, y+2, 'Invincibility:', {fontFamily: 'Papyrus',fontSize: '30px', fill: '#000',strokeThickness: 5}).setScrollFactor(0);

        this.player = JSON.parse(localStorage.getItem('check_existence'));
        this.scene.add.text(x+550, 20,"Current Player: "+this.player[0][0],{fontFamily: 'Papyrus',fontSize: '30px', fill: '#000',strokeThickness:5}).setScrollFactor(0);
        this.scene.add.text(x+900, 20,"Current Level: "+this.scene.game.config.globals.level,{fontFamily: 'Papyrus',fontSize: '30px', fill: '#000',strokeThickness: 5}).setScrollFactor(0);
    }

    // update function
    updateHUD(health,shield,rage){
        this.newGraphics.clear();
        this.newSheildGraphics.clear();
        this.newPowerupGraphics.clear();
        this.scoreText.setText('Gold: ' + this.score);
        if (!rage) {
            if (this.currentRage < 100) {
                this.currentRage += 0.01;
                this.powerupFill = new Phaser.Geom.Rectangle(this.x+412, this.y+12, this.currentRage, 15);
            }
        }else if (rage) {
            this.currentRage -= 0.1;
            this.powerupFill = new Phaser.Geom.Rectangle(this.x+412, this.y+12, this.currentRage, 15);
        }
        if (health < 0) {
            this.healthBarFill = new Phaser.Geom.Rectangle(this.x+102, this.y+6, 0, 15);
        }else{
            this.healthBarFill = new Phaser.Geom.Rectangle(this.x+102, this.y+6, health, 15);
        }
        if (shield < 0) {
            this.shieldFill = new Phaser.Geom.Rectangle(this.x+102, this.y+25, 0, 10);
        } else {
            this.shieldFill = new Phaser.Geom.Rectangle(this.x+102, this.y+25,  this.shieldAmount*(shield/this.scene.game.config.globals.shield), 6);
        }

    
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(this.healthBarFill);

        this.newSheildGraphics.fillStyle(0x7d7d7d, 1);
        this.newSheildGraphics.fillRectShape(this.shieldFill);

        this.newPowerupGraphics.fillStyle(0xff0025, 1);
        this.newPowerupGraphics.fillRectShape(this.powerupFill);  
    }
}