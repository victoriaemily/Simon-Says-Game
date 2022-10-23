let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 1;

let gameStarted = false;


function playSound(identifier){

    var sound = new Audio('sounds/' + identifier + '.mp3');
    sound.play();

}

function animatePress(identifier) {

    $('.' + identifier).addClass("pressed");
    setTimeout(function(){
        $('.' + identifier).removeClass("pressed");
    },300);

}

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] == userPattern[currentLevel]) {
      if (userPattern.length == gamePattern.length){
        setTimeout(function () {
          nextSequence();
          console.log("we are now moving on.")
        }, 2000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence() {

    userPattern = [];
    $("#level-title").text("Level " + level);
    console.log(gamePattern)
    let randomNumber  = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++
    console.log("nextseq" + randomChosenColor)
    
}

function gameOver() {

    $("h1").html("Game over!")
    setTimeout(function(){
        gamePattern = [];
        userPattern = [];
        level = 0;
        $("h1").html("Press any key to restart")
        gameStarted = false;
    },1000);

}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
  

$(".btn").on("click", function(){

    userPattern.push(this.id);
    console.log(this.id);
    playSound(this.id)
    animatePress(this.id)

    checkAnswer(userPattern.length-1)


});

$(document).keypress(function() {
    if (!gameStarted) {

      $("#level-title").text("Level " + level);
      nextSequence();
      gameStarted = true;

    }

  });

