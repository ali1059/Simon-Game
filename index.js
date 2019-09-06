var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = 0;


 $(document).keypress(function(){
   if(started == 0){
 randomSequence();
 started = 1;
}
});


$(".btn").click(function(){

  var choosenColor=$(this).attr("id");
  userClickedPattern.push(choosenColor);
  playSound(choosenColor);
  animatePress(choosenColor);
  checkSequence(userClickedPattern.length-1);
});



function animatePress(clickedBtn){

  $("#"+clickedBtn).addClass("pressed");
  setTimeout(function(){
    $("#"+clickedBtn).removeClass("pressed");
  },100);

}

function randomSequence() {

  var n = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[n];
  gamePattern.push(randomColor);
  console.log("#" + randomColor);
  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  level++;
  $("h1").text("Level "+level);
  playSound(randomColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}

function checkSequence(last){

  console.log(gamePattern,"<=>"+userClickedPattern);
  if(userClickedPattern[last] === gamePattern[last]){
    if(gamePattern.length === userClickedPattern.length){
  setTimeout(function(){ randomSequence(); },1000);
  userClickedPattern = [];
}
}
else {
  $("h1").text("GameOver, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },500);
  playSound("wrong");
  started = 0;
  level=0;
  gamePattern = [];
}
}
