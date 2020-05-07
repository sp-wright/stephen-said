var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

/////////////////////////// SEQUENCE CREATOR

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  sounds(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

/////////////////////////// USER INPUTS

$("body").keypress(function() {
  if (level === 0) {
    nextSequence();
  }
})

$(".btn").click(function(event) {
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  sounds(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
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
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

/////////////////////////// EFFECTS

function sounds(i) {
      var audio = new Audio("sounds/"+i+".mp3");
      audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed")
  }, 50);
}
