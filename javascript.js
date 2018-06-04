var playing=false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if we click on the start/reset 
document.getElementById("startreset").onclick=function(){
	//if we are playing 
	if (playing == true){
		location.reload();   //reload page
	}
	//if we are not playing 
	else {

		// change mode to playing 
		playing=true;
		//set score to zero 
		score = 0;
		document.getElementById("scoreValue").innerHTML=score;
		
		// show countdown box 
		show("timeremaining");
		timeremaining= 60;
		document.getElementById("timeremainingvalue").innerHTML=timeremaining;

		//hide game over box 
		hide("gameover");

		//change button to reset
		document.getElementById("startreset").innerHTML="Reset Game";
		
		//start countdown 

		startCountdown();

		// generate question and answer 
		generateQA();
	}
}

// Clicking on an answer box
for (i=1; i<5; i++){

	document.getElementById("box"+i).onclick=function(){
	// check if we are playing 
		if (playing==true){				// if yes playing 
			if ( this.innerHTML == correctAnswer) {
				// user clicked correct Answer 
				score++; 
				document.getElementById("scoreValue").innerHTML=score;

				// show correct box and hide wrong box 
				hide("wrong");
				show("correct");
				setTimeout(function(){
					hide("correct");
				}, 1000);

				// Generate new question if the answer is correct 
				generateQA();
			}
			// Wrong Answer 
			else {

				hide("correct");
				show("wrong");
				setTimeout(function(){
					hide("wrong");
				}, 1000);
			}
		}

	}
}

//start counter
function startCountdown(){
	action=setInterval(function(){
		timeremaining-=1;
		document.getElementById("timeremainingvalue").innerHTML=timeremaining;
		if (timeremaining == 0){
			// Game over 
			stopCountdown();
			show("gameover");
			document.getElementById("gameover").innerHTML="<p> Game Over! </p> <p> Your score is " + score + ".</p>";
			hide("timeremaining");
			hide("correct");
			hide("wrong");
			playing=false;
			document.getElementById("startreset").innerHTML="Start Game";
		}
	}, 1000);
}

// Stop counter 
function stopCountdown(){
	clearInterval(action);
}

// hide an element 
function hide(Id){
	document.getElementById(Id).style.display="none";
}

// show an element 
function show(Id){
	document.getElementById(Id).style.display="block";
}

// generate Q&A 

function generateQA(){
	var x = 1 + Math.round(9 * Math.random());
	var y = 1 + Math.round(9 * Math.random());
	correctAnswer = x * y;
	document.getElementById("question").innerHTML= x + " x " + y;
	var correctPosition = 1 + Math.round(3 * Math.random());

	// fill one box with one correct answer 
	document.getElementById("box"+correctPosition).innerHTML=correctAnswer;

	// fill other boxes with wrong answers 

	var answers = [correctAnswer];
	for (i=1; i<5; i++){
		if (i != correctPosition){

			var wrongAnswer; 

			do {
				wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
			} while (answers.indexOf(wrongAnswer) > -1 );

			document.getElementById("box"+i).innerHTML=wrongAnswer;
			answers.push(wrongAnswer);
		}
	}

}