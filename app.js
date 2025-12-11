
let container = document.querySelector('.container');
let body = document.querySelector('body');
let h3 = document.querySelector('h3');

let userSeq = [];
let randSeq = [];

let level = 0;
let isGameStart = false;

let btns = ["red", "green", "orange", "violet"];

document.addEventListener("keypress", function () {
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
    userflash(event.target);
    if (event.target && event.target.classList[1] == 'box') {
        userSeq.push(event.target.id);
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
    setTimeout(() => {
        startGame();
    }, 1000);
}

let allReset = function () {
    console.log("Game over");
    isGameStart = false;
    randSeq = [];
    userSeq = [];
    let score = level;
    level = 0;
    body.classList.add('red');
    h3.innerHTML = `GAME OVER! Your score was ${score}.<br>Press any key to restart`;
}

let userflash = function (btn) {
    btn.classList.add('flash')
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 200);
}

let randflash = function (btn) {
    btn.classList.add('flash')
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 400);
}