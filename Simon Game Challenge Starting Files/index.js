var level = 1;
var length = 2;
var color= ["green","red","yellow","blue"];
$(".start-button").on("click",function(){
    $(this).addClass("pressed")
    setTimeout(()=>{
        $(this).removeClass("pressed")},100)
    $(this).hide();
    startLevel()
})
function startLevel(){
    $(".score").text("High Score: "+(level-1)).slideDown(500);
    let sequence = nextSequence(length);
    playSequence(sequence);
    clickSequence(sequence);
}
function nextSequence(length)
{
    var sequence=[];
    for(let i = 0 ; i<length;i++){
        var randomElement = Math.floor(Math.random()*4) ;
        sequence.push(color[randomElement]);
    }
    return sequence ;
}
function playSequence(sequence , index = 0 ){   //color sequence
    if(index >=sequence.length) return;
    var audio = new Audio("sounds/"+sequence[index]+".mp3");
    audio.play();
    $("#"+sequence[index]).animate({
        opacity:0.25,
    },300).animate({opacity : 1},300,function () {
        playSequence(sequence , index+1);
    })
}

function clickSequence(colorSequence ){
    var currentIndex = 0 ;
    $(".btn").off("click").on("click",function(){
        var userColor=$(this).attr("id");
        $(this).addClass("pressed");
        var audio = new Audio("sounds/" + userColor + ".mp3");
        audio.play();
        setTimeout(()=>{
            $(this).removeClass("pressed")}
            ,100
        )
    if(userColor !==colorSequence[currentIndex]){
        gameOver();
    }
    else{
        currentIndex++;
    }
    if(currentIndex==colorSequence.length)
    {
        length=level+length;
        level++;
    setTimeout(()=>{
        $(".level-title").text("Level "+level);
        startLevel()
    },1000)}
})
}
function gameOver() {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200)
    $(".level-title").html("gameover");
    $(".score").text("High Score: 0").slideDown(500);
    $(".start-button").html("<h1 class='level-title'> ReStart</h1>").show();
    level = 1;
    length = 2;
}
