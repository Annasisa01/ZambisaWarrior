class InstructionScene extends Phaser.Scene{
    constructor(){
        super('InstructionScene');
    }

    preload(){
        this.load.image('leftArrow','ImageAssets/left_arrow.png');
        this.load.image('rightArrow','ImageAssets/right_arrow.png');
        this.load.image('upArrow','ImageAssets/up_arrow.png');
    }

    create(){
        this.spacing = 40;
        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);

        this.Instructions = this.add.text(window.innerWidth/2,window.innerHeight/3.5,"Instructions",{
            fontFamily: 'Papyrus',
            fontSize: '90px',
            color: '#000000',
        }).setOrigin(0.5);

        this.add.rectangle(window.innerWidth/3.5,window.innerHeight/3.5 + this.spacing, window.innerWidth/2.3,450,0xf7e094).setOrigin(0);

        this.add.circle(380, 255, 5, 0x000000);
        this.add.text(400, 245,"Press the up arrow key to jump",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});
        this.add.image(700, 255,'upArrow');

        this.add.circle(380, 290, 5, 0x000000);
        this.add.text(400, 280,"Press the left arrow key move left",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});
        this.add.image(715, 290,'leftArrow');

        this.add.circle(380, 325, 5, 0x000000);
        this.add.text(400, 315,"Press the right arrow key to move right",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});
        this.add.image(760,325,'rightArrow');

        this.add.circle(380, 360, 5, 0x000000);
        this.add.text(400, 350,"Press the Space key for light attack",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});
        // this.add.image(510, 310,'upArrow');

        this.add.circle(380, 395, 5, 0x000000);
        this.add.text(400, 385,"Press the D key for dash attack",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});
        // this.add.image(510, 310,'upArrow');

        // this.add.circle(220, 310, 5, 0x000000);
        this.add.text(window.innerWidth/2, 430,"Note",{fontStyle: 'bold',fontFamily: 'Papyrus',fontSize: '40px', fill: '#000000'}).setOrigin(0.5);

        this.add.circle(380, 450, 5, 0x000000);
        this.add.text(400, 440,"A player's health starts at 100. When a player is hurt, the \nplayer's health gradually increases by a small amount.",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});

        this.add.circle(380, 510, 5, 0x000000);
        this.add.text(400, 500,"A player's shield starts at 100. When a player picks up a \ngrey orb, the player's shield increases by 50",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});

        this.add.circle(380, 570, 5, 0x000000);
        this.add.text(400, 560,"A player's rage starts at 0. When a player picks up a \nred orb, the player's rage increases by 50",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});

        this.newButton = new Button(this,window.innerWidth/2 -55,625 , "Home", 10);
        // this.menuButton.graphics.clear();
        this.newButton.graphics.fillStyle(0x6fb83b,1)
        this.newButton.graphics.fillRoundedRect(this.newButton.x, this.newButton.y, 150, 40, this.newButton.radius);
    }
}