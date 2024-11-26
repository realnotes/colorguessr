var round = 0;
var color = [0,0,0];
var error = 0;
var scores = [];

var roundEl = document.getElementById('round');
var colorEl = document.getElementById('color');
var rEl = document.getElementById('r');
var gEl = document.getElementById('g');
var bEl = document.getElementById('b');
var startEl = document.getElementById('start');
var guessEl = document.getElementById('guess');
var resultsEl = document.getElementById('results');
var actualEl = document.getElementById('actual');
var scoreEl = document.getElementById('score');
var yourEl = document.getElementById('your');
var yourColorEl = document.getElementById('yourColor');

function next(){
	if (round > 9){
  	guessEl.style.display='none';
  	finalScore = 0;
  	for (const score of scores){
    	finalScore += score;
    };
    finalScore /= scores.length;
    scoreEl.innerText='Game complete! Final score: '+finalScore+'%';
    return;
  }
	round += 1;
	roundEl.innerText = 'Round '+round;
  color = [
  	Math.floor(Math.random()*256),
    Math.floor(Math.random()*256),
    Math.floor(Math.random()*256)
  ];
  colorEl.style.backgroundColor = 'rgb('
  	+color[0]+','+color[1]+','+color[2]+')';
	rEl.value = 0;
  gEl.value = 0;
  bEl.value = 0;
  guessEl.innerText='Guess';
  guessEl.onclick=guess;
  resultsEl.style.display='none';
  yourColorEl.style.backgroundColor='rgb(0,0,0)';
}

function start(){
  round = 0;
	color = [0,0,0];
	error = 0;
	scores = [];
  startEl.innerText = 'Restart';
  guessEl.style.display = 'inline-block';
  yourColorEl.style.backgroundColor='rgb(0,0,0)';
  next();
}

function guess(){
	rError = Math.abs(rEl.value-color[0]);
  gError = Math.abs(gEl.value-color[1]);
  bError = Math.abs(bEl.value-color[2]);
  rPoints = Math.exp(-rError/50);
  gPoints = Math.exp(-gError/50);
  bPoints = Math.exp(-bError/50);
  score = Math.round((rPoints+gPoints+bPoints)/3*100);
  actualEl.innerText = 
  	'Actual color: R: '+color[0]+', G: '+color[1]
    +', B: '+color[2];
  scoreEl.innerText = 'Score: '+score+'%';
  scores.push(score);
  guessEl.innerText='Next';
  guessEl.onclick=next;
  resultsEl.style.display='block';
  yourColorEl.style.backgroundColor='rgb('
  	+rEl.value+','+gEl.value+','+bEl.value+')';
}
