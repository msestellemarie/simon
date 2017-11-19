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
  console.log(colorArray);
  lightMove();
}

function lightMove(){
  for(var each in colorArray){
    switch(colorArray[each]){
      case "red":
        $(".red").addClass("selected");
        break;
      case "green":
        $(".green").addClass("selected");
        break;
      case "blue":
        $(".blue").addClass("selected");
        break;
      case "yellow":
        $(".yellow").addClass("selected");
        break;
    }
    setTimeout(function(){
      $(".board").removeClass("selected");
    }, 1000);
  }
  playerTurn = true;
}

function playerMove(color){
  if(playerTurn){
    playerArray.push(color);
    if(playerArray.length === colorArray.length){
      playerTurn = false;
      compareMoves();
    }
  }
}

function compareMoves(){
  var matches = 0;
  for(var i=0; i<playerArray.length; i++){
    if(playerArray[i] === colorArray[i]){
      matches += 1;
    }
  }
  playerArray = [];
  if(matches === colorArray.length){
    count += 1;
    $(".counter").text(count);
    gameStatus();
  }
  else if(matches !== colorArray.length && strict === true){
    alert("Bummer, you lost!");
    reset();
    addColor();
  }
  else if(matches !== colorArray.length && strict === false){
    alert("Oops, you made a mistake!");
    lightMove();
  }
}

function gameStatus(){
  if(count === 21){
    alert("Congrats, you win!!");
    reset();
  }
  addColor();
}

function reset(){
  colorArray = [];
  count = 1;
  playerArray = [];
  playerTurn = false;
  $(".counter").text(count);
}

$(document).ready(function(){
  $(".reset").hide();

  $(".start").click(function(){
    $(".reset").show();
    $(".start").hide();
    $(".counter").text(count);
    addColor();
  });

  $(".reset").click(function(){
    reset();
    addColor();
  });

  $(".red").click(function(){
    playerMove("red");
  });

  $(".green").click(function(){
    playerMove("green");
  });

  $(".blue").click(function(){
    playerMove("blue");
  });

  $(".yellow").click(function(){
    playerMove("yellow");
  });

  $(".strict-off").click(function(){
    strict = false;
  });

  $(".strict-on").click(function(){
    strict = true;
  });
});
