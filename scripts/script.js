//////////////////// ***** Variables from HTML Document ***** ////////////////////


const playSpot = document.querySelectorAll('.play-spot');  // There are 8 different "play spots", so I used querySelectorAll.
const abbyTheCutestPuppy = document.querySelector('.abby-the-cutest-puppy');  // The "mole", my cute puppy Abby!  Her class gets added/removed from squares during the game.
const timeLeftToPlay = document.getElementById('time-left-to-play');  // The countdown timer that starts at 30 seconds.
const caughtAbby = document.getElementById('times-you-caught-abby');  // The number of times you successfully timed your clicks on Abby.  It starts at 0.  
const preGameScreen = document.getElementById('pre-game-screen');  // The section of the game that is visible at the start. You have to follow Abby to the main game screen.
const gameScreen = document.getElementById('game-screen');  // The section of the game that is made visible after you click the first button, as mentioned above.
const loadEasyGame = document.getElementById('load-easy-game-button');  // Variable for the button that leads you to the easy game board screen.
const loadNormalGame = document.getElementById('load-normal-game-button');  // Variable for the button that leads you to the normal game board screen.
const loadHardGame = document.getElementById('load-hard-game-button');  // Variable for the button that leads you to the hard game board screen.
const startGame = document.getElementById('start-game-button');  // Variable for the button that starts the timer and the moving Abby.
const endGame = document.getElementById('end-game-button');  // Variable for the button that ends the game early before the timer runs out.  Abby doesn't like this!
const postGameScreenGood = document.getElementById('post-game-screen-good');  // Ending section of the game that you see once the game ends if score >= 20.
const postGameScreenBad = document.getElementById('post-game-screen-bad');  // Ending section of the game that you see once the game ends if score <20 or you end early.
const playAgainGood = document.getElementById('reload-game-from-good-result');  // Variable for the button in the "good" screen that refreshes the game.
const playAgainBad = document.getElementById('reload-game-from-bad-result');  // Variable for the button in the "bad" screen that refreshes the game.
const goodOutputMessage = document.getElementById('good-output-message');  // Variable for the good score output message.
const badOutputMessage = document.getElementById('bad-output-message');  // Variable for the bad score output message.

let yourScore = 0; 
let catchSpot;  
let currentTime = 30; 
let previousSpot;  
let timerId = null; 
let easyMode;
let normalMode;
let hardMode;


//////////////////// ***** Functions ***** ////////////////////


// Function to start the game when the "Let's Play!" button is clicked.  The Let's Play button disappears and is replaced with an "I don't want to play anymore!" button.

function gameIsStarting() {

    startGame.style.display = 'none';
    endGame.style.display = 'block';

    if (easyMode == true) {
        moveAbbyEasy();
    } else if (normalMode == true) {
        moveAbbyNormal();
    } else if (hardMode == true) {
        moveAbbyHard();
    }

    countDownTimerId = setInterval(countDownSeconds, 1000);

};

// Function to end the game early when the "I don't want to play anymore!" button is clicked.  Eventually sends you to the bad ending screen after Abby scolds you a bit.

function gameIsEnding() {
        
    alert(`"Hey! What do you think you're doing, human? You said you'd play with me. I expect you to commit until the very end!  I am VERY displeased." -Abby`);
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    gameScreen.style.display = 'none';
    postGameScreenBad.style.display = 'block';

};

// Function for the first button you see in the game that leads you to the game screen, on the opening page where you "follow Abby" after she tells you she wants to play.
    
function openEasyGameScreen() {

    easyMode = true;

    preGameScreen.style.display = 'none';
    gameScreen.style.display = 'block';

};

function openNormalGameScreen() {

    normalMode = true;

    preGameScreen.style.display = 'none';
    gameScreen.style.display = 'block';

};

function openHardGameScreen() {

    hardMode = true;

    preGameScreen.style.display = 'none';
    gameScreen.style.display = 'block';

};

// Function that refreshes the game when the "Let's play again, Abby!" button is clicked.

function letsPlayAgain() {

    location.reload();

};

// Function that calculates a random time with the parameters of min & max to make sure the time calculated isn't ridiculously low.  Math.floor to round number down & Math.random to randomly generate a number within the range.

/* function randomTime(min, max) {

    return Math.floor(Math.random() * (max - min) + min);  

}; */


function moveAbbyEasy() {  

	timerId = setInterval(randomPlaySpot, 900);

};

function moveAbbyNormal() {

    timerId = setInterval(randomPlaySpot, 600);

}

function moveAbbyHard() {

    timerId = setInterval(randomPlaySpot, 400);

}

// Function to count down from 30 seconds at game start.  Displays the current time remaning in the text at the top.  When the time reaches 0, the game ends.  Good or bad ending happens depending on your final score and if you caught Abby enough times.  

function countDownSeconds() {

    currentTime--;
    timeLeftToPlay.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        gameScreen.style.display = 'none';

        if (yourScore >= 20) {
        postGameScreenGood.style.display = 'block';
        goodOutputMessage.textContent = `You caught Abby ${yourScore} times!  Wowza, that's amazing!`;

        } else if (yourScore <= 20) {
        postGameScreenBad.style.display = 'block';
        badOutputMessage.textContent = `You caught Abby ${yourScore} times!  Nice try!`;

        };
    };
};

// Function to calculate a random spot for Abby to appear and put her there.  Adds the mole "Abby" class to the square based on the calculated number by Math.random.  

function randomPlaySpot() {

    playSpot.forEach(spot => {
        spot.classList.remove('abby-the-cutest-puppy');
    });

    const calculation = Math.floor(Math.random() * 10);
    const randomSpot = playSpot[calculation];

    if (previousSpot == randomSpot) {
        return randomPlaySpot();
    }

    previousSpot = randomSpot;

    randomSpot.classList.add('abby-the-cutest-puppy');

    catchSpot = randomSpot.id;

};

// Function to catch Abby and check if the clicked spot matches the spot where Abby currently is, if so, it adds a point to your score and updates the text at the top of the screen.

playSpot.forEach(spot => {
    spot.addEventListener('mousedown', () => {

        if (spot.id == catchSpot) {
            yourScore++;
            caughtAbby.textContent = yourScore;
            /* spot.classList.remove('abby-the-cutest-puppy'); <--Code not necessary, but I tried this out too, though I liked the next line a bit better... The code below was easier on my eyes as she moved around the board.   */
            catchSpot = null; // If you manage to click Abby more than once before she goes poof, you only get one point and can't mash for more.

        };
    });
});


//////////////////// ***** Event Listeners (Buttons) ***** ////////////////////


loadEasyGame.addEventListener('click', openEasyGameScreen);  
loadNormalGame.addEventListener('click', openNormalGameScreen); 
loadHardGame.addEventListener('click', openHardGameScreen); 

startGame.addEventListener('click', gameIsStarting);  // Button that starts the timer & the moving Abby on the gameboard.  Clicky time! <3

endGame.addEventListener('click', gameIsEnding);  // Button that ends the game and makes Abby send you a mad alert message before going to the "bad" ending screen.

playAgainGood.addEventListener('click', letsPlayAgain);  // Button that lets you play the game again/refresh the game from the "good" ending screen.

playAgainBad.addEventListener('click', letsPlayAgain);  // Button that lets you play the game again/refresh the game from the "bad" (or ending early) ending screen.
