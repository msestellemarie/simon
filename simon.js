var colorArray = [];
var count = 1;
var playerArray = [];
var playerTurn = false;
var strict = false;

function randomColor(){
  var colors = ["red","green","blue","yellow"];
  var randomNumber = Math.floor(Math.random()*4);
  return colors[randomNumber];
}

function addColor(){
  var newColor = randomColor();
  colorArray.push(newColor);
  setTimeout(function(){
    computerMove(0);
  }, 1000);
}

function computerMove(index){
  if(index !== colorArray.length){
    switch(colorArray[index]){
      case "red":
        $(".red").addClass("selected");
        redSound.play();
        break;
      case "green":
        $(".green").addClass("selected");
        greenSound.play();
        break;
      case "blue":
        $(".blue").addClass("selected");
        blueSound.play();
        break;
      case "yellow":
        $(".yellow").addClass("selected");
        yellowSound.play();
        break;
    }
    setTimeout(function(){
      $(".board").removeClass("selected");
      setTimeout(function(){
        computerMove(index + 1);
      },500);
    }, 500);
  }
  else {
    $(".game").addClass("player");
    playerTurn = true;
  }
}

function playerMove(color){
  playerArray.push(color);
  if(playerArray.length === colorArray.length){
    playerTurn = false;
    $(".game").removeClass("player");
  }
  compareMoves();
}

function compareMoves(){
  var matches = 0;
  for(var i=0; i<playerArray.length; i++){
    if(playerArray[i] === colorArray[i]){
      matches += 1;
    }
    else if(playerArray[i] !== colorArray[i] && strict === true){
      playerTurn = false;
      $(".game").removeClass("player");
      playerArray = [];
      $(".counter").text("!!");
      setTimeout(function(){
        reset();
        addColor();
      },2000);
      break;
    }
    else if(playerArray[i] !== colorArray[i] && strict === false){
      playerTurn = false;
      $(".game").removeClass("player");
      playerArray = [];
      $(".counter").text("!!");
      setTimeout(function(){
        $(".counter").text(count);
        computerMove(0);
      },2000);
      break;
    }
  }
  if(matches === colorArray.length){
    playerArray = [];
    count += 1;
    $(".counter").text(count);
    gameStatus();
  }
}

function gameStatus(){
  if(count === 20){
    $(".counter").text("🎉");
    setTimeout(function(){
      reset();
      addColor();
    },2000);
  }
  else {
    addColor();
  }
}

function reset(){
  colorArray = [];
  count = 1;
  playerArray = [];
  playerTurn = false;
  strict = false;
  $(".game").removeClass("player");
  $(".counter").text(count);
  $(".strict-off").show();
  $(".strict-on").hide();
}

$(document).ready(function(){
  $(".reset").hide();
  $(".reset-label").hide();
  $(".strict-on").hide();

  $(".start").click(function(){
    $(".reset").show();
    $(".reset-label").show();
    $(".start").hide();
    $(".start-label").hide();
    $(".counter").text(count);
    greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    greenSound.play();
    greenSound.pause();
    redSound.play();
    redSound.pause();
    blueSound.play();
    blueSound.pause();
    yellowSound.play();
    yellowSound.pause();
    addColor();
  });

  $(".strict-off").click(function(){
    $(".strict-off").hide();
    $(".strict-on").show();
    strict = true;
  });

  $(".strict-on").click(function(){
    $(".strict-on").hide();
    $(".strict-off").show();
    strict = false;
  });

  $(".reset").click(function(){
    reset();
    addColor();
  });

  $(".red").click(function(){
    if(playerTurn){
      var redSoundClone = redSound.cloneNode();
      redSoundClone.play();
      playerMove("red");
    }
  });

  $(".green").click(function(){
    if(playerTurn){
      var greenSoundClone = greenSound.cloneNode();
      greenSoundClone.play();
      playerMove("green");
    }
  });

  $(".blue").click(function(){
    if(playerTurn){
      var blueSoundClone = blueSound.cloneNode();
      blueSoundClone.play();
      playerMove("blue");
    }
  });

  $(".yellow").click(function(){
    if(playerTurn){
      var yellowSoundClone = yellowSound.cloneNode();
      yellowSoundClone.play();
      playerMove("yellow");
    }
  });
});
