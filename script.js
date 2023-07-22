const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');


let currentPlayer;
let gameGrid;

const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // first column
    [1, 4, 7], // second column
    [2, 5, 8], // third column
    [0, 4, 8], // diagonal top left to bottom right
    [2, 4, 6] // diagonal top right to bottom left
];

function initGame(){
    currentPlayer ='X';
    gameGrid = ['', '', '', '', '', '', '', '', ''];
    newGameBtn.classList.remove('active');
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
    boxes.forEach((box) => {
        box.innerHTML = '';
        box.style.pointerEvents = 'auto';
        box.classList.remove('win');
    }
    )
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    }
    )
});

function handleClick(index){
    if(gameGrid[index] !== ''){
        return;
    }
    boxes[index].innerHTML= currentPlayer;
    boxes[index].style.pointerEvents = 'none';
    gameGrid[index] = currentPlayer;
    switchPlayer();
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
    checkWinner();
}

function switchPlayer(){
   if(currentPlayer === 'X'){
         currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
    
}


newGameBtn.addEventListener('click', () => {
    initGame();
});

function checkWinner(){
    let answer ="";
    winningCombos.forEach((combo) => {
        if(gameGrid[combo[0]] === gameGrid[combo[1]] && gameGrid[combo[1]] === gameGrid[combo[2]] && gameGrid[combo[0]] !== ''){
            boxes.forEach((box)=>{
                box.style.pointerEvents = 'none';
            });

            answer = gameGrid[combo[0]];
            boxes[combo[0]].classList.add('win');
            boxes[combo[1]].classList.add('win');
            boxes[combo[2]].classList.add('win');
        }
    });

    

    if(answer !== ''){
        gameInfo.innerText = `${answer} wins!`;
        newGameBtn.classList.add('active');
        return;
    }

    if(!gameGrid.includes('')){
        gameInfo.innerText = `It's a draw!`;
        newGameBtn.classList.add('active');
        return;
    }
    



    
}
