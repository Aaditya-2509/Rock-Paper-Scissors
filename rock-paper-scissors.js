let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying =  false;
let IntervalID;
function autoPlay(){
    if(!isAutoPlaying){
        document.querySelector('.js-auto-play').innerHTML="Stop Play";
    IntervalID = setInterval(function(){
        //interval id changes every time so not declared with the const 
        const playerMove= pickComputerMove();
        playGame(playerMove);
    },1000);
    isAutoPlaying = true;
    }
    else{
        document.querySelector('.js-auto-play').innerHTML="Auto Play";
        clearInterval(IntervalID);
        isAutoPlaying = false;
    }
}


function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock')
            result = 'You lose.';
        else if (computerMove === 'paper')
            result = 'You win.';
        else
            result = 'Tie.';
        if (result === 'You win.') {
            score.wins += 1;
        }
        else if (result === 'You lose.') {
            score.losses += 1;
        }
        else {
            score.ties += 1;
        }
    }



    if (playerMove === 'rock') {
        if (computerMove === 'rock')
            result = 'Tie.';
        else if (computerMove === 'paper')
            result = 'You lose.';
        else
            result = 'You win.';
        if (result === 'You win.') {
            score.wins += 1;
        }
        else if (result === 'You lose.') {
            score.losses += 1;
        }
        else {
            score.ties += 1;
        }
    }


    if (playerMove === 'paper') {
        if (computerMove === 'rock')
            result = 'You win.';
        else if (computerMove === 'paper')
            result = 'Tie.';
        else
            result = 'You lose.';
        if (result === 'You win.') {
            score.wins += 1;
        }
        else if (result === 'You lose.') {
            score.losses += 1;
        }
        else {
            score.ties += 1;
        }

    }
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You 
<img src="${playerMove}-emoji.png" class="move-icon">
<img src="${computerMove}-emoji.png" class="move-icon">
Computer`;


}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}


function pickComputerMove() {
    let computerMove = '';
    const randomNum = Math.random();

    if (randomNum >= 0 && randomNum < 1 / 3) { computerMove = 'rock'; }
    else if (randomNum >= 1 / 3 && randomNum < 2 / 3) { computerMove = 'paper'; }
    else { computerMove = 'scissors'; }

    return computerMove;

}