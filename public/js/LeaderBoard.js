class LeaderBoard extends Phaser.Scene{
    constructor(){
        super('LeaderBoard');
    }

    init(data){
        this.arr = data.leaderboard;
    }

    preload(){
        loadLeaderBoard;
    }

    create(){
        // var arr;
        // this.time.delayedCall(1000, ()=>{
        //     arr = JSON.parse(localStorage.getItem("leaderboard"));
        //     console.log(arr);
        // }, null, this);  // delay in ms
        
        this.ySpacing = 45;
        this.xSpacing = 300;

        const image = this.add.image(window.innerWidth/2,window.innerHeight/2,'background').setOrigin(0.5);
        const scaleX = window.innerWidth / image.width;
        const scaleY = window.innerHeight / image.height;
        image.setScale(scaleX,scaleY);

        this.graphics1 = this.add.graphics();
        this.graphics1.fillStyle(0xf7e094,0.75);
        this.graphics1.fillRoundedRect(window.innerWidth*0.35,window.innerHeight/3 - 80,window.innerWidth*0.3,100, 20);
        this.leaderboard = this.add.text(window.innerWidth/2,window.innerHeight/3 -25,"Leaderboard Table",{
            fontFamily: 'serif',
            fontSize: '40px',
            color: '#000000',
        }).setOrigin(0.5);

        // this.add.rectangle(window.innerWidth/4,window.innerHeight/3 + 30,window.innerWidth/2,300,0xf7e094,0.75).setOrigin(0);
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000,1);
        this.graphics.fillRoundedRect(window.innerWidth/4,window.innerHeight/3 + 30,window.innerWidth/2,300, 20);


        
        for (let i = 0; i < this.arr.length; i++) {
            var temp = '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16)
            console.log(this.arr[i][0]+"\t"+this.arr[i][1]);
            this.add.text(window.innerWidth/3,window.innerHeight/2.3+this.ySpacing*i,(i+1)+".",{
                fontFamily: 'serif',
                fontSize: '35px',
                color: '#ffffff'
            }).setOrigin(0,0.5);
            this.add.text(window.innerWidth/3 + 50,window.innerHeight/2.3+this.ySpacing*i,this.arr[i][0],{
                fontFamily: 'Papyrus',
                fontSize: '35px'
            }).setFill(temp).setOrigin(0,0.5);
            this.add.text(window.innerWidth/3 + this.xSpacing,window.innerHeight/2.3+this.ySpacing*i,this.arr[i][1],{
                fontFamily: 'Papyrus',
                fontSize: '35px',
                color: '#000000'
            }).setFill(temp).setOrigin(0,0.5);
        }

        this.menuButton = new Button(this,window.innerWidth/2 -55, 500 , "Home", 10);
        this.menuButton.graphics.fillStyle(0x6fb83b,1)
        this.menuButton.graphics.fillRoundedRect(this.menuButton.x, this.menuButton.y, 150, 40, this.menuButton.radius);
    }
    
}

function loadLeaderBoard(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        console.log("Saving the server's response to local storge");
        localStorage.setItem('leaderboard', this.responseText);
    }
    xhttp.open("POST", "leaderboard.php");
    xhttp.send();
  }