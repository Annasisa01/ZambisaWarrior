class LeaderBoard extends Phaser.Scene{
    constructor(){
        super('LeaderBoard');
    }

    init(){

    }

    preload(){

    }

    create(){
        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);

        this.leaderboard = this.add.text(window.innerWidth/2,window.innerHeight/3,"Leaderboard Table",{
            fontFamily: 'Papyrus',
            fontSize: '90px',
            color: '#000000',
        }).setOrigin(0.5);

        this.add.rectangle(window.innerWidth/4,window.innerHeight/3 + 30,window.innerWidth/2,300,0xf7e094).setOrigin(0);

        this.add.text(this.leaderboard.x, this.leaderboard.y + 50,"Leaderboard features would be coming in the next version",{
            fontFamily: 'Papyrus',
            fontSize: '25px',
            color: '#000000',
            wordWrap: { width: 700 }
        }).setOrigin(0.5);

        this.menuButton = new Button(this,window.innerWidth/2 -55, 500 , "Home", 10);
        this.menuButton.graphics.fillStyle(0x6fb83b,1)
        this.menuButton.graphics.fillRoundedRect(this.menuButton.x, this.menuButton.y, 150, 40, this.menuButton.radius);
    }
}