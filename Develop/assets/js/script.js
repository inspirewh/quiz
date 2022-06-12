const sectionLanding = document.getElementById('section-landing');
const startGameButton = document.getElementById('start-game');
const sectionTimer = document.getElementById('section-timer');
const timerEl = document.getElementById('timer');
const sectionQuestion = document.getElementById('section-question');
const sectionEndGame = document.getElementById('section-end')
const questionTitleEl = document.getElementById('question-title')
const questionChoices = document.getElementById('question-choices')

let = timeRemaining = 60;
let = timer;

//store the questions inside an array (each questions has and a choice (answer)) Object is the best way of displaying


//generate the question show question by index (render question)
function renderQuestion(questionIndex){
    //get the question
    const question = questions[questionIndex]
    //create the structure to replicate the section in java generate the li 
    //(insert title)
    questionTitleEl.textContent = question.title;

    //set the choices.
    const choices = question.choices;
    questionChoices.textContent = "";
    //clear out existing question


    for (let index = 0; index < choices.length; index++) {
        const choice = choices[index];
       // <li><button class="answer-1">answer 1</button></li>
       const li = document.createElement('li');

       const button = document.createElement('button');

       button.setAttribute('class', 'question-choice')
       button.textContent = choice.title;

       li.appendChild(button);
       questionChoices.append(li);


    }
}

// when user click on the start button 
startGameButton.addEventListener('click', function (event){
    //start the timer
    //set timer to be time remaining
    timerEl.textContent = timeRemaining;
    startTimer();
    //show the question
    sectionQuestion.classList.remove('hide)')
    //hide the landing
    sectionLanding.classList.add('hide');

    renderQuestion(0);

})

function endGame(){
    //Show the end game screen and hide question section and show end game screen)
    sectionEndGame.classList.remove('hide');
    //hide welcome screen
    sectionLanding.classList.add('hide');
    //hide question section 
    sectionQuestion.classList.add('hide');
    //hide timer
    sectionTimer.classList.add('hide');
    //stop the timer
    clearInterval(timerId);
}

function startTimer(){
    // TIMER 
    // show the timer - "unhide"
    sectionTimer.classList.remove('hide');
    //once the timer starts we will subtract 1 from the current timer count 
    timerId = setInterval(function(){
        timeRemaining = timeRemaining - 1;
        //update the dom for every passing sec
        timerEl.textContent = timeRemaining;
        //if the timer expires during the game (not yet completed) (when time remaining is less than or equal to zero timer has expired)
        if (timeRemaining <= 0){
        //end game
        endGame();
      }
    }, 1000);
    

}


//QUESTIONS

//user click on choice

//if user clicks on correct answer
//give feedback
//move onto the next quetsion

//if user click on incorrect answer
//deduct 10 sec away from timer
//show wrong feedback 
//move onto the next quetsion

//if user click on the choice of a final question 
//end game

//END GAME
//render the highscore in the DOM

// user types initials into the input box

// user hits enter key
// get the user initials and high score 
//save

// if user did not type in anything in input box 
//do not save show an error message in the dom

// user clicks save button
// get the user initials and high score 
//save

//once we save go to highscore page

//HIGHSCORE PAGE

//generate the highscore list
//if the user clicks on the back to home button
//go back to the landing page