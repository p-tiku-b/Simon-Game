var clickedButtonList = [];
var checkClickedButtonList = [];
var levelNum = 0;
var started = false;

$(document).keydown(function() { //works only for first keydown
  if (!started) {
    buttonRandom();
    started = true;
  }
});

$(".btn").click(function(event) {
  var clickedButtonID = event.target.id;
  makeAnimation(clickedButtonID);
  checkClickedButtonList.push(clickedButtonID);
  checkSequence();
  if (clickedButtonList.length == checkClickedButtonList.length && levelNum > 0) {
    setTimeout(function() {    // this will work only when user's sequence is correct
      buttonRandom();
    }, 1000);
    checkClickedButtonList = [];
  }
});

function buttonRandom() { //Generating random buttons
  var colorButtons = ["blue", "green", "red", "yellow"];
  levelNum++;
  $("h1").text("Level " + levelNum);
  var num = colorButtons[Math.floor((Math.random() * 4))];
  makeAnimation(num);
  clickedButtonList.push(num);
}

// makeSoundOnClick is called inside makeAnimation
function makeAnimation(clickedButtonID) { //pressed animation
  $("#" + clickedButtonID).addClass("pressed");
  setTimeout(function() {
    $("#" + clickedButtonID).removeClass("pressed");
  }, 100);
  makeSoundOnClick(clickedButtonID);
}

function makeSoundOnClick(clickedButtonID) { // button sound on click
      var audio = new Audio("sounds/" + clickedButtonID + ".mp3");
      audio.play();
}

function checkSequence() { //checking sequence
  for (var i = 0; i < checkClickedButtonList.length; i++) {
    if (clickedButtonList[i] !== checkClickedButtonList[i]) {
      startOver();
      wrongSequence();
    }
  }
}

function wrongSequence(){ //sound and animation of wrong sequence
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
}

function startOver() { //Game Over
  clickedButtonList = [];
  checkClickedButtonList = [];
  levelNum = 0;
  started = false;
  $("h1").text("Gameover, press any key to start again!");
}
