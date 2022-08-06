//Gameboard module

const GameBoard = (() => {
    let spaces = ['', '', '', '', '', '', '', '', ''];

    function setupBoard() {
        for (i = 0; i < 9; i++) {
            document.getElementById('box' + i).textContent = spaces[i];
        }
    }

    return {
        spaces,
        setupBoard,
    }
})()

//factory function for players
const playerFactory = (name, symbol) => {

    const setName = () => name = prompt('name: ');

    function makeMove() {
        for (i = 0; i < 9; i++) {
            let index = i;
            document.getElementById('box' + i).addEventListener('click', () => {
                GameBoard.spaces.splice(index, 1, this.symbol);
                GameBoard.setupBoard();  
            })
        }
    }
    return {name, symbol, setName, makeMove};
};





//playgame module
const playGame = (() => {
    const player1 = playerFactory('player1', 'X');
    const player2 = playerFactory('player2', 'O');
  

    takeTurns();

  function takeTurns() {
    let turn = 'X';
    if (turn === 'X') {
        player1.makeMove();
        turn = 'O';
        console.log(turn);
    }
    else if (turn === 'O') {
        player2.makeMove();
        turn = 'X';
        console.log(turn);
    }
  }
 

})()



