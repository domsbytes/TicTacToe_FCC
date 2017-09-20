/*1. Basic setup
2. Determine winner
3. Basic AI and winner notification
4. Minimax algorithm
*/

var origBoard;
const humanPlayer ='0';
const aiPlayer = 'X';
const winCombo = [
    [0,1,2],// 1st row cross win
    [3,4,5],// 2nd row cross win
    [6,7,8],// 3rd row cross win
    [0,3,6],// 1st col win
    [1,4,7],// 2nd col win
    [3,5,8],// 3rd col win
    [0,4,8],//right diagonal win
    [2,4,6]// left diagonal win
];

// this variable will store a refrence to a cell in the html file
const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {

    //reset display settings
    document.querySelector(".endgame").style.display="none";

    // Initialize board with 9 elements
    origBoard = Array.from(Array(9).keys());

    //traverse the board and remove existing elements
    for(var i=0; i< cells.length; i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick, false);
    }
}

//Human clicking function 
function turnClick(square) {
    turn(square.target.id, humanPlayer);
}

// A turn in the game functionality
function turn(squareId, player){
    // set the baord square to the players sign 
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon)

}
//
function checkWin(board, player){
    let plays = board.reduce((a,e,i) => (e===player) ? a.concat(i) : a ,[]);
    let gameWon = null;
    //check if the game has been won
    for(let [index, win] of winCombos.entries()){
        // has the player played in all the spots needed for the win combo?
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index: index, player: player};
            break;
        }
    }
    //if noone wins gameWon will return Null
    //if winner gameWon will continue which player and which win combo
    return gameWon;
}

function gameOver ( gameWon){
    //go through each element of the win combo
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
            game.player === humanPlayer ? "blue": "red";
    }
    //go through each cell and make it unselectable
    for(var i =0; i< cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false)
    }
}