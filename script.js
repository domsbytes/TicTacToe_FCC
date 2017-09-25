/*1. Basic setup
2. Determine winner
3. Basic AI and winner notification
4. Minimax algorithm
*/


var origBoard;
const humanPlayer ='0';
const aiPlayer = 'X';
const winCombos = [
    [0,1,2],// 1st row cross win
    [3,4,5],// 2nd row cross win
    [6,7,8],// 3rd row cross win
    [0,3,6],// 1st col win
    [1,4,7],// 2nd col win
    [2,5,8],// 3rd col win
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
    //check if a place has been clicked
    // if nither human or Ai has played spot
    if(typeof origBoard[square.target.id]=='number'){
        turn(square.target.id, humanPlayer);
        //check if game is a tie
        if(!checkTie()) turn(bestSpot(), aiPlayer);
    }
}

// A turn in the game functionality
function turn(squareId, player){
    // set the board square to the players sign 
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);

}
//Function that checks if game has been won
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
            gameWon.player == humanPlayer ? "blue": "red";
    }
    //go through each cell and make it unselectable
    for(var i =0; i< cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == humanPlayer ? "You Win!": "You Lose!");
}
//simple AI
//finds all empty squares and fills in first one aviable
function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

//calculates best game move
function bestSpot(){
    return emptySquares()[0];
    //return minimax(origBoard, aiPlayer).index;
}

//Displays text based on who won game
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

//checkTie func
function checkTie(){
    if (emptySquares().length ==0) {
        for( var i =0; i < cells.length; i++){
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

/* Minimax Alg
 Algorithm that does the follwoing things:
 1) return a val if a terminal state is found (+10, 0, -10)
 2) go through available spots on the board
 3) call the minimax function on each avialable spot ( recursion)
 4) evaluate returning values from function calls
 5) and return the best value
*/

function minimax(newBoard, player){
    var avialSpots = emptySquares(newBoard);
    //check for terminal states ( someone winning)
    if( checkWin(newBoard, player)){
        return{score: -10};
    }else if(checkWin(newBoard, aiPlayer)){
        return {score: 10};
    }else if(avialSpots.length === 0){
        return {score:0};// no more room to play
    }
    //collect the source from each empty spots to evaluate later
    var moves =[];
    for (var i = 0; i < avialSpots.length; i++){
        var move = {};
        move.index = newBoard[avialSpots[i]];
        // set empty spot on new board to current player
        newBoard[avialSpots[i]]= player;

        if(player == aiPlayer){
            //
            var result = minimax(newBoard, humanPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[avialSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if(player === aiPlayer){
        var bestScore = -10000;
        for(var i=0; i<moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }else {
        var bestScore = 10000;
        for(var i=0; i<moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }

    }
    return moves[bestMove];
    //has a bug right now of score undefined
}