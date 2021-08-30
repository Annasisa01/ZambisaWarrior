class Shop extends Phaser.Scene{
    constructor(){
        super('Shop');
    }

    create(){
        this.xSpacing = 30;
        this.ySpacing = 50;
        this.fourHundred = 400;
        // Creating gold rotate animation
        this.anims.create({
            key: 'goldRotate',
            frames: this.anims.generateFrameNames('gold'),
            frameRate: 8,
            repeat: -1
        });


        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);


        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xf7e094,0.9);
        this.graphics.fillRoundedRect(window.innerWidth*0.25,window.innerHeight*0.125,window.innerWidth/2,window.innerHeight*0.75, 20);

        this.shop = this.add.text(window.innerWidth*0.5 + this.xSpacing, window.innerHeight*0.15 + this.ySpacing,"Shop",{
            fontFamily: 'Papyrus',
            fontSize: '90px',
            color: '#000000',
        }).setOrigin(0.5);

        // Adding text to display the amount of gold the player has
        // Add text "Total". Make it left aligned and centered vertically.
        this.totalTxt = this.add.text(window.innerWidth*0.25 + this.xSpacing, this.shop.y, "Total",{
            fontFamily: 'Papyrus',
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0,0.5);
        // Add text "Gold". Make it slightly smaller than text "Total". 
        // Make it left aligned and centered vertically.
        this.goldTxt = this.add.text(this.totalTxt.x + this.xSpacing/2, this.shop.y + this.ySpacing/1.5, "Gold:",{
            fontFamily: 'Papyrus',
            fontSize: '30px',
            color: '#000000'
        }).setOrigin(0,0.5);
        // Add gold rotating gold animation for aesthetics
        var star = this.add.sprite(this.totalTxt.x + this.xSpacing*3.5, this.shop.y + this.ySpacing/1.5, 'gold').setScale(1.5)
        star.anims.play('goldRotate',true);
        // Add the total gold gotten from localStorage as text. 
        // Make it left aligned and centered vertically.
        this.amtTxt = this.add.text(this.totalTxt.x + this.xSpacing*4, this.shop.y + this.ySpacing/1.5, this.game.config.globals.totalGold,{
            fontFamily: 'Papyrus',
            fontSize: '30px',
            color: '#000000'
        }).setOrigin(0,0.5);
        // Done with total gold display.


        // Add items that can be bought from the shop.
        // Add increase recovery item that would increase the 
        // speed of health recovery by 10%
        this.increaseRecovery = this.add.text(window.innerWidth*0.25 + this.xSpacing, this.shop.y + 2*this.ySpacing, "Increase player's health by 10%",{
            fontFamily: 'Papyrus',
            fontSize: '30px',
            color: '#000000',
            wordWrap: { width: 350 }
        }).setOrigin(0,0.5);
        // Add text for the amount that would be deducted 
        // if recovery item is purchased.
        this.price1 = this.add.text(this.increaseRecovery.x + this.increaseRecovery.style.wordWrapWidth + 100, this.increaseRecovery.y, "400", {
            fontFamily: 'Papyrus',fontSize: '30px', fill: '#000000'
        }).setInteractive().setOrigin(0,0.5).setDepth(100).setPadding(30,10,30,10).on('pointerdown', ()=>{
            if (this.game.config.globals.totalGold >= 400) {
                this.game.config.globals.totalGold -= 400;
                this.game.config.globals.health *=1.1;
                this.amtTxt.setText(this.game.config.globals.totalGold);
            }else{
                alert("INSUFFICIENT FUNDS");
            }
        })
        // Adding graphics for price button
        this.pricegraphics = this.add.graphics();
        this.pricegraphics.fillStyle(0x6fb83b,1);
        // Creating a rounded rectangle for the button
        this.pricegraphics.fillRoundedRect(this.price1.x -10, this.price1.y -20, 120, 40, 10);
        // Add gold rotating gold animation for aesthetics
        var star = this.add.sprite(this.increaseRecovery.x + this.increaseRecovery.style.wordWrapWidth + 110, this.increaseRecovery.y, 'gold').setScale(1.5)
        star.anims.play('goldRotate',true);

        // Add increase shield item that would increase the 
        // player's speed shield by 10%
        this.increaseShield = this.add.text(this.increaseRecovery.x , this.increaseRecovery.y + this.ySpacing*1.5, "Increase shield by 50%",{
            fontFamily: 'Papyrus',
            fontSize: '30px',
            color: '#000000',
            wordWrap: { width: 350 }
        }).setOrigin(0,0.5);
        // Add text for the amount that would be deducted 
        // if shield item purchased.
        this.price2 = this.add.text(this.increaseShield.x + this.increaseShield.style.wordWrapWidth + 100, this.increaseShield.y, "400", {
            fontFamily: 'Papyrus',fontSize: '30px', fill: '#000000'
        }).setInteractive().setOrigin(0,0.5).setDepth(100).setPadding(30,10,30,10).on('pointerdown',()=>{
            if (this.game.config.globals.totalGold >= 400) {
                this.game.config.globals.totalGold -= 400;
                this.game.config.globals.shield *=1.5
                this.amtTxt.setText(this.game.config.globals.totalGold);
            }else{
                alert("INSUFFICIENT FUNDS");
            }
        })
        // Adding graphics for the price button
        this.pricegraphics = this.add.graphics();
        this.pricegraphics.fillStyle(0x6fb83b,1);
        // Creating a rounded rectangle for the button
        this.pricegraphics.fillRoundedRect(this.price2.x -10, this.price2.y -20, 120, 40, 10);
        // Add gold rotating gold animation for aesthetics
        var star = this.add.sprite(this.increaseShield.x + this.increaseShield.style.wordWrapWidth + 110, this.increaseShield.y, 'gold').setScale(1.5)
        star.anims.play('goldRotate',true);


        // Add increase player's speed that would increase the 
        // player's speed by 10%
        this.increaseSpeed = this.add.text(this.increaseRecovery.x , this.increaseRecovery.y + this.ySpacing*3, "Increase player's sprint speed by 10%",{
            fontFamily: 'Papyrus',
            fontSize: '30px',
            color: '#000000',
            wordWrap: { width: 350 }
        }).setOrigin(0,0.5);
        this.price3 = this.add.text(this.increaseShield.x + this.increaseShield.style.wordWrapWidth + 100, this.increaseSpeed.y, "400", {
            fontFamily: 'Papyrus',fontSize: '30px', fill: '#000000'
        }).setInteractive().setOrigin(0,0.5).setDepth(100).setPadding(30,10,30,10).on('pointerdown',()=>{
            if (this.game.config.globals.totalGold >= 400) {
                this.game.config.globals.totalGold -= 400;
                this.game.config.globals.speed *= 1.1;
                this.amtTxt.setText(this.game.config.globals.totalGold);
            }else{
                alert("INSUFFICIENT FUNDS");
            }
        });
        // Creating a rounded rectangle for the button
        this.pricegraphics.fillRoundedRect(this.price3.x -10, this.price3.y -20, 120, 40, 10);
        // Add gold rotating gold animation for aesthetics
        var star = this.add.sprite(this.increaseShield.x + this.increaseShield.style.wordWrapWidth + 110, this.increaseSpeed.y, 'gold').setScale(1.5)
        star.anims.play('goldRotate',true);

        // Add increase player's speed that would increase the 
        // player's speed by 10%
        this.fullPower = this.add.text(this.increaseRecovery.x , this.increaseRecovery.y + this.ySpacing*5, "Player starts with full powerup",{
            fontFamily: 'Papyrus',
            fontSize: '30px',
            color: '#000000',
            wordWrap: { width: 350 }
        }).setOrigin(0,0.5);
        this.price4 = this.add.text(this.increaseShield.x + this.increaseShield.style.wordWrapWidth + 100, this.fullPower.y, "400", {
            fontFamily: 'Papyrus',fontSize: '30px', fill: '#000000'
        }).setInteractive().setOrigin(0,0.5).setDepth(100).setPadding(30,10,30,10).on('pointerdown',()=>{
            if (this.game.config.globals.totalGold >= 400) {
                this.game.config.globals.totalGold -= 400;
                this.game.config.globals.power = 99;
                this.amtTxt.setText(this.game.config.globals.totalGold);
            }else{
                alert("INSUFFICIENT FUNDS");
            }
        });
        // Creating a rounded rectangle for the button
        this.pricegraphics.fillRoundedRect(this.price4.x -10, this.price4.y -20, 120, 40, 10);
        // Add gold rotating gold animation for aesthetics
        var star = this.add.sprite(this.increaseShield.x + this.increaseShield.style.wordWrapWidth + 110, this.fullPower.y, 'gold').setScale(1.5)
        star.anims.play('goldRotate',true);


        this.homeBtn = new Button(this,window.innerWidth/2 -55, window.innerHeight*0.8 , "Home", 10);
        this.homeBtn.graphics.fillStyle(0x6fb83b,1)
        this.homeBtn.graphics.fillRoundedRect(this.homeBtn.x, this.homeBtn.y, 150, 40, this.homeBtn.radius);
    }

}