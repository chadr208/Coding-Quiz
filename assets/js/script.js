// DEPENDENCIES =====================================================================
var timeEl = document.querySelector('#time');
var timeBoxEl = document.querySelector('#time-box');
var startButtonEl = document.querySelector('#start-button');
var questionEl = document.querySelector('.question');
var instructionsEl = document.querySelector('.instructions');
var choicesEl = document.querySelector('.choices');
var formEl = document.querySelector(".submit-form");
var submitEl = document.querySelector('#submit');
var initialsInputEl = document.querySelector("#initials-input");
var scoreboardEl = document.querySelector('#scoreboard');
var scoreboardButtonsEl = document.querySelector("#scoreboard-buttons");
var clearScoreboardButtonEl = document.querySelector('#clear-scoreboard-button');
var backButtonEl = document.querySelector('#back-button');
var wrongEl = document.querySelector('#wrong');
var correctEl = document.querySelector('#correct');
var choicesButtonsEl = [];



// DATA
//Contains questions, choices, and correct answer.
var challenges = [
    {
        question: "Which one of the following tags is used for inserting the largest heading in HTML?",
        a: "1. <H3>",
        b: "2. <H1)",
        c: "3. <H5>",
        d: "4. <H6>",
        correct: "3. <H1>"
    },

    {
        question: "The condition in an if / else statement is enclosed with ______.",
        a: "1. quotes",
        b: "2. curly brackets",
        c: "3. parenthesis",
        d: "4. square brackets",
        correct: "2. curly brackets"
    },

    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        a: "1. commas",
        b: "2. curly brackets",
        c: "3. quotes",
        d: "4. parenthesis",
        correct: "3. quotes"
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        a: "1. JavaScript",
        b: "2. terminal/bash",
        c: "3. for loops",
        d: "4. console.log",
        correct: "4. console.log"
    },

    {
        question: "Arrays in JavaScript can be used to store _____.",
        a: "1. numbers and strings",
        b: "2. other arrays",
        c: "3. booleans",
        d: "4. all the above",
        correct: "4. all the above"
    }
];

var currentQuestion = 0; // Location of the current question in the array
var score = 0;
var time = 90;   
var userInitials = localStorage.getItem('initials') || '';
var userScores = localStorage.getItem('scores') || '';
var scoreList = [];
var initialsList = [];
var timeInterval;
var feedbackTimeInterval;




//FUNCTIONS

function setTime() {
    timeBoxEl.setAttribute('class', 'time-show');

    //sets interval in variable
    timeInterval = setInterval(function () {
        time--;
        timeEl.textContent = time;

        if(time === 0){
            timeBoxEl.setAttribute('class', 'time-hide');
            clearInterval(timeInterval);

            //game over go to the scoreboard
            scoreRecordScreen();
        }

    }, 1000);
}

//Display "wrong" for 2 seconds if the wrong answer is selected.
//Display "correct" for 2 seconds if the correct answer is selected. 
function feedbackTime(currentEl){
    
    clearInterval(feedbackTimeInterval);
    
    currentEl.setAttribute('class', 'feedback-show');

    var feedbackTime = 1;
    feedbackTimeInterval = setInterval(function () {
        feedbackTime--;

        if(feedbackTime === 0){
            currentEl.setAttribute('class', 'feedback-hide');
            clearInterval(feedbackTimeInterval);
        }
    }, 1000);
}

//Quiz starts
function startListener(){
    //start time
    setTime();

    buildLi();
    //hide the quiz instructions
    instructionsEl.setAttribute('class', 'instructions instructions-hide');
    //disable and hide the start button 
    startButtonEl.disabled;
    startButtonEl.parentElement.setAttribute('class', 'start-box start-box-hide');
    //Select answer for first question
    nextQuestion();

}

//add the li elements to the ul element
function buildLi(){
    for(var i = 0; i < 4; i++){
       //create button
        var buttonEl = document.createElement('button');
        //add button to the array for access later
        choicesButtonsEl[i] = buttonEl;
        //create li element and append to the parent
        var liEl = document.createElement('li');
        liEl.setAttribute('class', 'choices-list');
        liEl.appendChild(buttonEl);
        choicesEl.appendChild(liEl);

        buttonEl.addEventListener('click', choicesListener);

        //change the question css
        questionEl.setAttribute('id', 'quiz-question');
    }
}


//Start game function display's the first question to the player
function nextQuestion(){
    //Display the question 
    questionEl.textContent = challenges[currentQuestion].question;
    //Display the choices 
    choicesButtonsEl[0].textContent = challenges[currentQuestion].a;
    choicesButtonsEl[1].textContent = challenges[currentQuestion].b;
    choicesButtonsEl[2].textContent = challenges[currentQuestion].c;
    choicesButtonsEl[3].textContent = challenges[currentQuestion].d;

    //update "currentQuestion" variable
    currentQuestion++;
}

//when the user clicks one of the question's choices, event listeners will trigger
function choicesListener(event){
    //Check to see if correct or incorrect 
    var usersChoice = event.target.innerHTML;
    if(usersChoice === challenges[currentQuestion-1].correct){
        //If selected is true, THEN player score increases
        score++;
        //Displays "Correct" 
        wrongEl.setAttribute('class', 'feedback-hide');
        correctEl.setAttribute('class', 'feedback-hide');
        feedbackTime(correctEl);
    }
    //If selected choice is incorrect, THEN time is deducted. 
    else{
        time -= 15;
        //Display "wrong"
        wrongEl.setAttribute('class', 'feedback-hide');
        correctEl.setAttribute('class', 'feedback-hide');
        feedbackTime(wrongEl);
    }
    //If not on the current question THEN go to next question
    if(currentQuestion != challenges.length){
        nextQuestion();
    }
    //Else the quiz is completed.
    else{
        //Go to the scoreboard. 
        timeBoxEl.setAttribute('class', 'time-hide');
        clearInterval(timeInterval);

        //Game over go to the scoreboard
        scoreRecordScreen();
    }
}

//end of game screen
function scoreRecordScreen(){
    //Response from quiz to user at end of quiz.
    questionEl.textContent = "Complete!";
    instructionsEl.textContent = "Your final score is " + score;
    instructionsEl.setAttribute('class', 'instructions instructions-show end-screen');

    //Hide the buttons
    choicesEl.setAttribute('id', 'choices-hide');
    //Display the form element
    formEl.setAttribute('id', 'show-form');

}

function submitListener(event){
    event.preventDefault();
    
    //users input
    var updatedLocal = '';
    var updatedScores = '';
    var userInput = initialsInputEl.value;
    if(userInitials === ''){
        updatedLocal = userInput;
        updatedScores = score;
    }else{
        updatedLocal = userInitials +  "-" + userInput;
        updatedScores = userScores + '-' + score;
    }
    
    
    //IF player doesnt input initials THEN display N/A
    if(userInput === ""){
        localStorage.setItem('initials', (updatedLocal + "N/A"));
        localStorage.setItem('scores', updatedScores);
    }
    //Record player scores
    else{
        localStorage.setItem('initials', updatedLocal);
        localStorage.setItem('scores', updatedScores)
    }
    
    userInitials = localStorage.getItem('initials');
    userScores = localStorage.getItem('scores');

    //Local storage is updated, show the scoreboard
    scoreboard();
}

// Last screen showing scores
function scoreboard(){
    //Store local data into arrays
    scoreList = userScores.split('-');
    initialsList = userInitials.split('-');
    //turn strings to numbers to sort
    for (var i = 0; i < scoreList.length; i++){
        scoreList[i] = +(scoreList[i]);
    }

    // QuestionEl.textContent = "Scoreboard";
    instructionsEl.setAttribute('class', 'instructions instructions-hide end-screen');
    formEl.setAttribute('id', 'hide-form');


    //Create li element and append to the parent to build the scoreboard
    for(var i = scoreList.length - 1; i >= 0; i--){
        
        var liEl = document.createElement('li');
        liEl.setAttribute('class', 'scoreboard-li');
        liEl.textContent = scoreList.length-(i) + ". " + initialsList[i] + " - " + scoreList[i];
        scoreboardEl.appendChild(liEl);
    }

    //Display the back and clear scoreboard buttons
    scoreboardButtonsEl.setAttribute('class', 'scoreboard-buttons-show');

}

//Clears the scoreboard 
function clearScoreboardListener(){
    
    localStorage.clear();

    scoreboardEl.remove();
}
//Refreshes the page
function backListener(){
    location.reload();
}

// USER INTERACTIONS

// Player clicks start button
startButtonEl.addEventListener('click', startListener);
// Player clicks choice
submitEl.addEventListener('click', submitListener)
// Player clicks clear to clear scoreboard saved data from local. 
clearScoreboardButtonEl.addEventListener('click', clearScoreboardListener);
//Player goes back to home page
backButtonEl.addEventListener('click', backListener);