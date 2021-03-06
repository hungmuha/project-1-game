$(document).ready(function(){

var boxHeight;
var boxWidth;
//paddle 1
var paddley;
var paddleh;
var paddlew;
//paddle 2
var paddley2;
var paddleh2;
var paddlew2;
var intervalId;
//var in rect paddle
var a;
var b;
var c;
var d;
//var for the ball
var x=250;
var y=150;
var z;
//direction for the ball
dx=Math.ceil(Math.random()*(4-1)+1); //random direction for the ball
dy=Math.floor(Math.random()*(4-1)+1);
var touch=0;   //define touch of the ball in order to start the speeding up the balls based on bounce

//for canvas 
var canvas;
var ctx;
//players score
var p1Score=0;
var p2Score=0;

//function to time in order to speed up ball
function speed(){
	if (touch > 4 && touch%2==0){
		faster();
	}
	if (touch > 4 && touch%2!=0){
		faster1();
	}
}
function faster(){
	dx++;
	dy--;
}

function faster1(){
	dx--;
	dy++;
}

//scoreboard function to show score
function scoreB(){
	document.getElementById("score1").textContent=p1Score;
	document.getElementById("score2").textContent=p2Score;
	if(p1Score==3){
		alert ("player 1 win the game!!! Select 'Again' to play again");
	}
	if(p2Score==3){
		alert ("player 2 win the game!!! Select 'Again' to play again");
	}
}

function init(){ //game board created
	ctx= $("#gameBoard")[0].getContext('2d');
	boxHeight=$("#gameBoard").height();
	boxWidth=$("#gameBoard").width();
	// invervalId= window.requestAnimationFrame(draw); //trying out animation
	intervalId=setInterval(draw,10);
	return intervalId;
}

function initPaddle(){ //paddle 1 created
	paddley=boxHeight/2;
	paddleh=125;
	paddlew=10;

}

function initPaddle2(){ //paddle 2 created
	paddley2=boxHeight/2;
	paddleh2=125;
	paddlew2=10;
}

window.addEventListener("keypress",key); //keyboard movement function for player 2
function key(event){
	var k = event.keyCode;
	if (k==108 && paddley+paddleh<boxHeight){
		paddley+=50;
	}
	if (k==111 && paddley>=0){
		paddley-=50;
	}
}

window.addEventListener("keypress",key2); //keyboard movement function function for player 1
function key2(event){
	var s = event.keyCode;
	if (s==97 && paddley2+paddleh2<boxHeight){
		paddley2+=50;
	}
	if (s==113 && paddley2>=0){
		paddley2-=50;
	}
}

function draw(){ //function that draw everything in canvas
	clear();
	arc(x,y,10);
	var player1= rect(boxWidth-paddlew,paddley,paddlew,paddleh);
	var player2= rect(0,paddley2,paddlew2,paddleh2);

	if(x+dx<0){
		if(y>paddley2 && y<paddley2+paddleh2){
			dy=2*((y-(paddley2+paddleh2/2))/paddleh2); //function that change direction of ball when hit paddle
			dx=-dx;
			touch++;
			speed();
		}else{
			console.log("player 1 win");
			p1Score++;
			scoreB();
			clearInterval(intervalId);
			touch=0;
		}
	}else if(x+dx>boxWidth){
		if(y>paddley && y<paddley+paddleh){
			dy=2*((y-(paddley+paddleh/2))/paddleh); //function that change direction of ball when hit paddle
			dx=-dx;
			touch++;
			speed();
		}else{
			console.log("player 2 win");
			p2Score++;
			scoreB();
			clearInterval(intervalId);
			touch=0;
		}
	}
	if(y+dy>boxHeight||y+dy<0){
		dy=-dy;
	}
	
	x+=dx;
	y+=dy;
}

function clear(){ //create clear box in canvas 
	ctx.clearRect(0,0,boxHeight,boxWidth);
}

function arc(x,y,z) { //create the ball
	ctx.beginPath();
	ctx.arc(x,y,z,0,2*Math.PI,true);
	ctx.closePath();
	ctx.fill();	
}
function rect(a,b,c,d){ //create the paddle
	ctx.beginPath();
	ctx.fillStyle="#FFF05F";
	ctx.rect(a,b,c,d);
	ctx.closePath();
	ctx.fill();
}

var clearB=document.getElementById("clearBoard"); //RESET button
clearB.addEventListener("click",reset);

function reset(){ //reset function that start everything again
	x=250;
	y=150;
	paddley=boxHeight/2;  //reset the position of the ball
	paddleh=125;
	paddlew=10;
	paddley2=boxHeight/2;
	paddleh2=125;
	paddlew2=10;
	dx=Math.ceil(Math.random()*(4-1)+1); 
	dy=Math.floor(Math.random()*(4-1)+1);
	setTimeout(start,2000);
}

var playA= document.getElementById("restart"); //START button function tos tart game
playA.addEventListener("click",restart);

//start function activated when user click the START button
function restart(){
	p1Score=0;
	p2Score=0;
	setTimeout(reset,2000);
}
function start(){
	init();
	initPaddle();
	initPaddle2();
	scoreB();
}


})