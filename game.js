var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var highScore = 0;

/////////////////////////// SEQUENCE CREATOR

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  sounds(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  if(level>highScore){
    highScore++;
  }
  $(".high-score").text("High Score = " + highScore);
}

/////////////////////////// USER INPUTS

$(".start-btn").click(function() {
  if (level === 0) {
    nextSequence();
  }
  $(".start-btn").hide();
});

$(".btn").click(function(event) {
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  sounds(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

/////////////////////////// RULES

$(".rules").hide();

$(".rules-btn").click(function(){
  $(".rules").slideToggle();
});


/////////////////////////// VERIFICATION

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000)
      userClickedPattern = [];
    }
  } else {
    sounds("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, you reached level "+ level+ "!");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  $(".start-btn").show();
}

/////////////////////////// EFFECTS

function sounds(i) {
  var audio = new Audio("sounds/" + i + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 50);
}
