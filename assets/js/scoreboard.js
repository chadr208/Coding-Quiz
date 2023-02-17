//DEPENDENCIES
var scoreboardEl = document.getElementById('scoreboard');
var clearScoreboardButtonEl = document.querySelector('#clear-scoreboard-button');
var backButtonEl = document.querySelector('#back-button');

//DATA 
var userInitials = localStorage.getItem('initials') || '';
var userScores = localStorage.getItem('scores') || '';
var initialsList = userInitials.split('-');
var scoreList = userScores.split('-');

//FUNCTIONS

function loadScoreboard(){

    //reset the scoreboard
    scoreboardEl.innerHTML = '';

    //we have no data so don't build anything
    if(userInitials.length === 0){
        return;
    }

    //we have data so lets start building
    for(var i = scoreList.length - 1; i >= 0; i--){
        
        var liEl = document.createElement('li');
        liEl.setAttribute('class', 'scoreboard-li');
        liEl.textContent = scoreList.length-(i) + ". " + initialsList[i] + " - " + scoreList[i];
        scoreboardEl.appendChild(liEl);
    }

}

function backListener(){
    window.location = '../../index.html';
}

function clearScoreboardListener(){
    localStorage.clear();
    scoreboardEl.innerHTML = '';
}

//USER INTERACTIONS
//user can click 'Go Back' and it will send them to the main page
backButtonEl.addEventListener('click', backListener);

//Clear scoreboard
clearScoreboardButtonEl.addEventListener('click', clearScoreboardListener);

//Initalizations on start-up
loadScoreboard();