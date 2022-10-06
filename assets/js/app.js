const sectionLanding = document.getElementById('section-landing');
const startGameButton = document.getElementById('start-game');
const sectionTimer = document.getElementById('section-timer');
const timerEl = document.getElementById('timer');
const sectionQuestion = document.getElementById('section-question');
const sectionEndGame = document.getElementById('section-end')
const questionTitleEl = document.getElementById('question-title')
const questionChoices = document.getElementById('question-choices')
const saveBtn = document.getElementById('saveBtn')
const highScoresList = document.getElementById('section-highscore')
//feedbackEl
const result = document.getElementById('result');
//finalscoreEl
let finalResult = document.getElementById('result-span');
let inputInitials = document.getElementById('input-initials');
//clearhighscore
const clearScoresBtn = document.getElementById('clearScoresBtn'); 
let scoreList = document.getElementById('scoreList');
const homeBtn = document.getElementById('homeBtn'); 
let = timeRemaining = 60;
let = timer;
let resultList = [];
//finalscore
let finalScore = 0;
let correctAns = 0;

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
        // if the user clicks on the correct answer
       const button = document.createElement('button');
        
       button.setAttribute('class', 'question-choice')
       button.textContent = choice.title;
       
       //if user clicks on correct answer
       //give feedback
       //move onto the next quetsion
       button.addEventListener('click', function(){
        let answerFeedback = "";   
        if(choice.isAnswer) {
          // give feedback - answer is correct
          finalScore = finalScore + 10;
          answerFeedback = "True"
          console.log("result", answerFeedback);
        } else {
            //if user click on incorrect answer
            //deduct 10 sec away from timer
            //show wrong feedback 
            //move onto the next quetsion
            timeRemaining = timeRemaining - 10;
            answerFeedback = "False";
            console.log("result", answerFeedback)
        }
        //if user click on the choice of a final question 
        //end game
        const nextQuestionIndex = questionIndex + 1;

        if (nextQuestionIndex >= questions.length) {
            return endGame()
        }
        result.innerHTML = answerFeedback;
        setTimeout(
            () => {
              result.innerHTML = "";
              renderQuestion(nextQuestionIndex);
            }, 500);
       });

       li.appendChild(button);
       questionChoices.append(li);
    }
}

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
  });

// when user click on the start button 
startGameButton.addEventListener('click', function (event){
    //start the timer
    timeRemaining = 100;
    timerEl.textContent = timeRemaining;
    inputInitials.value ="";
    scoreList.innerHTML = "";
    //set timer to be time remaining
    startTimer();
    //show the question
    sectionQuestion.classList.remove('hide')
    //hide the landing
    sectionLanding.classList.add('hide');

    renderQuestion(0);

})


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
          clearInterval(timerId);
          //end game
          endGame();
        }
      }, 1000);
    

}

function endGame(){
    //Show the end game screen and hide question section and show end game screen)
    sectionEndGame.classList.remove('hide');
    //hide welcome screen
    sectionLanding.classList.add('hide');
    //hide question section 
    sectionQuestion.classList.add('hide');
    
    finalScore = correctAns;
    finalResult.textContent = finalScore;
    
    //hide timer
    sectionTimer.classList.add('hide');
    //stop the timer
    clearInterval(timerId);
    timerEl.textContent=0;
}
//render the highscore in the DOM
saveBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const playerInitials = inputInitials.value.trim();
  const lastScore = {
      player: playerInitials,
      score: finalScore,
  }
  // Pushes latest score to array
  resultList.push(lastScore);
  // Calls function to save scores to local storage
  saveScore();
  // Renders out the scores
  highScoresList.classList.remove('hide');
  renderScores();
}) 

// user hits enter key
// get the user initials and high score 
// user clicks save button
//save score/result to local storage
//Then retrieve score/result from local storage 
// then render the score/result retrieved from the local storage into the DOM 
//display highest score first to lowest score

function saveResult () {
  localStorage.setItem("Highscore:", JSON.stringify(resultList));
}

function getResultList () {
  const storedResult = JSON.parse(localStorage.getItem("Highscore:"));
  if (storedResult !== null) {
    resultList = storedResult;
  }
}

function renderResult () {
  resultList.sort ((a, b) => {
    return b.score - a.score;
  })
}

// create Highscore table to display thee highscores

let table = document.createElement('table');
let row = document.createElement('row');
let headers = ['Name', 'Score'];

headers.forEach (headerText => {
  let header = document.createElement('tableHeader');
  let textNode = document.createTextNode(headerText);
  header.appendChild(textNode);
  headerRow.appendChild(header)
});

table.appendChild(headerRow);



  function storeHighScore(event) {
    event.preventDefault();
    let initials = inputInitials.value;
    if (initials === "") {
      alert("Quiz complete, please enter your initials!");
     return;
    }
    highScoresList.classList.remove('hide');
    sectionLanding.classList.add('hide');
    sectionQuestion.classList.add('hide');
    sectionTimer.classList.add('hide');
    sectionEndGame.classList.add('hide');
   
    let savedHighScore = localStorage.getItem('highScore');
    let highScoreList;
    if (savedHighScore === null) {
      highScoreList = [];
    } else {
      highScoreList = JSON.parse(savedHighScore);
    }
    var userResult = {
      initials: initials,
      score: finalResult.textContent
    };

    highScoreList.push(userResult);
    console.log("highScoresList" + highScoreList);
    
    localStorage.setItem('highScore', JSON.stringify(highScoresList));
    console.log("Add HighScore");
    showHighScore();
    
}

//once we save go to highscore page
//generate the highscore list
function showHighScores() {
    highScoresList.classList.remove('hide');
    sectionLanding.classList.add('hide');
    sectionQuestion.classList.add('hide');
    sectionTimer.classList.add('hide');
    sectionEndGame.classList.add('hide');
    console.log("Add Highscore1");
    let storedHighScores = localStorage.getItem('highScore');
    console.log("inside populateHighScores1" + storedHighScores);
    if (storedHighScores === null) {
        return;
    }
    var savedHighScore = JSON.parse(storedHighScores);
    console.log(savedHighScore.length);
    for (let i = 0; i < savedHighScore.length; i++) {
        var newHighScore = document.createElement("p");
        newHighScore.innerHTML = savedHighScore[i].initials + ": " + savedHighScores[i].score;
        list.appendChild(newHighScore);
    }
}

//if the user clicks on the back to home button
//go back to the landing page
homeButton.addEventListener('click', function (){reload = location.reload()});

clearScoresBtn.addEventListener("click", function(){
  if (resultList != null) {
    sectionHighScores.innerHTML = '';
    resultList = [];
    localStorage.setItem('highscore', JSON.stringify(resultList))
}

});


//QUESTIONS






// user types initials into the input box


// if user did not type in anything in input box 
//do not save show an error message in the dom



//HIGHSCORE PAGE
