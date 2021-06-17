class InstructionScene extends Phaser.Scene{
    constructor(){
        super('InstructionScene');
    }

    preload(){
        // Loading all the images to be used.
        this.load.image('leftArrow','ImageAssets/left_arrow.png');
        this.load.image('rightArrow','ImageAssets/right_arrow.png');
        this.load.image('upArrow','ImageAssets/up_arrow.png');
    }

    create(){
        // Constant used for spacing
        const spacing = 40;
        // Add background image
        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);

        // Add heading text
        this.Instructions = this.add.text(window.innerWidth/2,window.innerHeight/5,"Instructions",{
            fontFamily: 'Papyrus',
            fontSize: '90px',
            color: '#000000',
        }).setOrigin(0.5);

        // Create another background for the instruction texts
        this.rectBackground = this.add.rectangle(window.innerWidth/4,window.innerHeight/4.5 + spacing, window.innerWidth/2,450,0xf7e094).setOrigin(0);

        /*
            Use circle to make bullet point for every instruction
            Use text to add the instruction beside the bullet point
            Insert the icon for the button that's being described
        */
        var circle1 = this.add.circle(this.rectBackground.x + spacing/2, this.rectBackground.y + spacing/2, 5, 0x000000);
        var text1 = this.add.text(circle1.x + spacing/2, circle1.y - spacing * 0.25,"Press the up arrow key to jump",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});
        var image1 = this.add.image(text1.x + text1.width + spacing * 0.5, this.rectBackground.y + spacing/2,'upArrow');

        var circle2 = this.add.circle(circle1.x, circle1.y + spacing * 0.75, 5, 0x000000);
        var text2 = this.add.text(circle2.x + spacing/2, circle2.y - spacing * 0.25,"Press the left arrow key move left",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});
        this.add.image(text2.x + text2.width + spacing * 0.5, circle2.y,'leftArrow');

        var circle3 = this.add.circle(circle1.x, circle2.y + spacing * 0.75, 5, 0x000000);
        var text3 = this.add.text(circle3.x + spacing/2, circle3.y - spacing * 0.25,"Press the right arrow key to move right",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});
        this.add.image(text3.x + text3.width + spacing * 0.5, circle3.y,'rightArrow');

        var circle4 = this.add.circle(circle1.x, circle3.y + spacing * 0.75, 5, 0x000000);
        this.add.text(circle4.x + spacing/2, circle4.y - spacing * 0.25,"Press the Space key for light attack",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});

        var circle5 = this.add.circle(circle1.x, circle4.y + spacing * 0.75, 5, 0x000000);
        this.add.text(circle5.x + spacing/2, circle5.y - spacing * 0.25,"Press the D key for dash attack",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});


        // Sub-heading for the instructions
        var note = this.add.text(window.innerWidth/2, circle5.y + spacing,"Note",{fontStyle: 'bold',fontFamily: 'Papyrus',fontSize: '40px', fill: '#000000'}).setOrigin(0.5);

        // Continuation of the instructions
        var circle6 = this.add.circle(circle5.x, note.y + spacing * 0.75, 5, 0x000000);
        this.add.text(circle6.x + spacing/2, circle6.y - spacing * 0.25,"A player's health starts at 100. When a player is hurt, the \nplayer's health gradually increases by a small amount.",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});

        var circle7 = this.add.circle(circle6.x, circle6.y + spacing * 1.5, 5, 0x000000);
        this.add.text(circle7.x + spacing/2, circle7.y - spacing * 0.25,"A player's shield starts at 100. When a player picks up a \ngrey orb, the player's shield increases by 50",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});

        var circle8 = this.add.circle(circle7.x, circle7.y + spacing * 1.5, 5, 0x000000);
        this.add.text(circle8.x + spacing/2, circle8.y - spacing * 0.25,"A player's rage starts at 0. When a player picks up a \nred orb, the player's rage increases by 50",{fontFamily: 'Papyrus',fontSize: '20px', fill: '#000000'});

        // Add a button that would take us back to the home page
        this.newButton = new Button(this,window.innerWidth/2 -55,circle8.y + spacing * 1.5 , "Home", 10);
        this.newButton.graphics.fillStyle(0x6fb83b,1)
        this.newButton.graphics.fillRoundedRect(this.newButton.x, this.newButton.y, 150, 40, this.newButton.radius);
    }
}