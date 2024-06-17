function checkExistence(name) {
    const check = new XMLHttpRequest();
    check.onload = function () {
      // console.log(this.responseText);
      localStorage.setItem('check_existence', this.responseText);
    }
    check.open("POST", "check_existence.php");
    check.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    check.send('name=' + encodeURIComponent(name));
}


function updatePlayer(name,highscore,gold,level,health,speed,shield){
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function(){
    console.log(this.responseText);
    localStorage.setItem('update_status', this.responseText);
  }
  xhttp.open("POST", "update_player.php");
  xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhttp.send('name='+name+"&highscore="+highscore+"&gold="+gold+"&level="+level+"&health="+health+"&speed="+speed+"&shield="+shield);
}


