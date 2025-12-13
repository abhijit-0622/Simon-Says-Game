
let container = document.querySelector('.container');
let body = document.querySelector('body');
let h3 = document.querySelector('h3');
let h2 = document.querySelector('h2');
let startBtn = document.querySelector('button');

let userSeq = [];
let randSeq = [];

let highestScore = 0;
let currScore = 0;
let level = 0;
let isGameStart = false;

let btns = ["red", "green", "orange", "violet"];

startBtn.addEventListener("click", function () {
    if (isGameStart == false) {
        body.classList.remove('red');
        isGameStart = true;
        startGame();
    }
})


let startGame = function () {
    if(isGameStart) {
        let randNum = Math.floor(Math.random() * 4);
        let randColor = btns[randNum];
        let btn = document.querySelector(`.${randColor}`);
        
        randSeq.push(randColor);
        randflash(btn);
        level++;
        h3.innerText = `Level : ${level}`;
    }
}

container.addEventListener("click", function (event) {
    if(isGameStart) {
        gameCal(event);
    }
})

let gameCal = function(event) {
    if (event.target && event.target.classList[1] == 'box') {
        userSeq.push(event.target.id);
        userflash(event.target);
        if (userSeq[userSeq.length - 1] != randSeq[userSeq.length - 1]) {
            allReset();
        }
        if (randSeq.length == userSeq.length) {
            nextLevel();
        }
    }
}


let nextLevel = function () {
    userSeq = [];
    setTimeout(startGame, 1000);
}

let setHighestScore = function(currScore) {
    highestScore = Math.max(highestScore, currScore);
    h2.innerText = `Highest Score : ${highestScore}`
}

let gameOverFlash = function() {
    body.classList.add('red');
    setTimeout(function() {
        body.classList.remove('red');
    }, 1000);
}

let allReset = function () {
    isGameStart = false;
    randSeq = [];
    userSeq = [];
    currScore = level;
    setHighestScore(currScore);
    gameOverFlash();
    level = 0;
    h3.innerHTML = `GAME OVER! Your score was ${currScore}.<br>Press restart button to restart`;
    startBtn.innerText = "Restart";
}

let userflash = function (btn) {
    btn.classList.add('correct')
    setTimeout(() => {
        btn.classList.remove('correct');
    }, 200);
}

let randflash = function (btn) {
    btn.classList.add('flash')
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 400);
}