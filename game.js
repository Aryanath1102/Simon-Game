let gamePattern=[];
let buttonColours=["red", "blue", "green", "yellow"];
let userclickedpattern=[];

let started = false;
let level = 0;
$(document).keypress(function(){
//  if(!started){
//     $("#level-title").text("Level"+level);
//  nextSequence();
//  started=true;
// }
if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
    let userchosencolor=$(this).attr("id");
    userclickedpattern.push(userchosencolor);
    playSound(userchosencolor);
    animatePress(userchosencolor);
    checkAnswer(userclickedpattern.length-1);
    
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userclickedpattern[currentLevel]){
    
        if(userclickedpattern.length===gamePattern.length){
            setTimeout(function(){
            nextSequence()
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);
      
        startover();
    }

}

function nextSequence(){
    userclickedpattern=[];
    level++;
    $("#level-title").text("Level "+level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour){
   $("btn").addClass("pressed");
   setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
   },100);
 
}
function startover(){
    level=0;
    gamePattern=[];
    started=false;
}