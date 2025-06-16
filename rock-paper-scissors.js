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

let isAutoPlaying = false;
let IntervalID;
function autoPlay() {
    if (!isAutoPlaying) {
        document.querySelector('.js-auto-play').innerHTML = "Stop Play";
        IntervalID = setInterval(function () {
            //interval id changes every time so not declared with the const 
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 2000);
        isAutoPlaying = true;
    }
    else {
        change();
        clearInterval(IntervalID);
        isAutoPlaying = false;
    }
}

function change() {
    document.querySelector('.js-auto-play').innerHTML = "Auto Play";
}

document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));
document.querySelector('.js-paper-button').addEventListener('click', () => playGame('paper'));
document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('scissors'));

document.body.addEventListener('keydown', (event) => {
    let isAuto = false;
    if (event.key === 'r') {
        playGame('rock');
    }
    if (event.key === 'p') {
        playGame('paper');
    }
    if (event.key === 's') {
        playGame('scissors');
    }
    if (event.key === 'a' && !isAuto) {
        autoPlay();
        isAuto = true;
    }
    else {
        change();
    }
    if (event.key === 'Backspace') {
        confirmation();
    }
    if(event.key==='y'){
        reset();
        document.querySelector('.confirm').innerHTML = '';
    }
    if(event.key==='n'){
        document.querySelector('.confirm').innerHTML = '';
    }
})



document.querySelector('.js-auto-play').addEventListener('click', () => autoPlay());
document.querySelector('.js-reset').addEventListener('click', () => confirmation());



function confirmation(){

    const html = `<p class="confirm">
    Are you sure you want to reset the score ? 
        <button class="js-yes yes">Yes</button>
        <button class="js-no no">No</button>
    </p>`;

    
    document.querySelector('.confirm').innerHTML = `${html}`;

    document.querySelector('.js-yes').addEventListener('click', () => {
        reset();
        document.querySelector('.confirm').innerHTML = '';
    });
    document.querySelector('.js-no').addEventListener('click', () => {
        document.querySelector('.confirm').innerHTML = '';
    });
}



function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-score').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
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