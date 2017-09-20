/*1. Basic setup
2. Dretermine winner
3. Basic AI and winner notification
4. Minimaz algorithm
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

}
//sfasoidfasdfasdfasddscvbcvbcv