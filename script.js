//Gameboard module

const GameBoard = (() => {
    let spaces = ['', '', '', '', '', '', '', '', ''];

    function setupBoard() {
        for (i = 0; i < 9; i++) {
            document.getElementById('box' + i).textContent = spaces[i];
        }
    }

    function checkWin(symbol) {
        console.log(spaces[0]);
        console.log(spaces[3])
        if (spaces[0] === spaces[3] && spaces[3] === spaces[6] && spaces[6] === symbol ||
            spaces[1] === spaces[4] && spaces[4] === spaces[7] && spaces[7] === symbol ||
            spaces[2] === spaces[5] && spaces[5] === spaces[8] && spaces[8] === symbol ||
            spaces[0] === spaces[1] && spaces[1] === spaces[2] && spaces[2] === symbol ||
            spaces[3] === spaces[4] && spaces[4] === spaces[5] && spaces[5] === symbol ||
            spaces[6] === spaces[7] && spaces[7] === spaces[8] && spaces[8] === symbol ||
            spaces[0] === spaces[4] && spaces[4] === spaces[8] && spaces[8] === symbol ||
            spaces[2] === spaces[4] && spaces[4] === spaces[6] && spaces[6] === symbol)  {
            console.log(symbol + ' is the winner!')
        }
    }

    return {
        spaces,
        setupBoard,
        checkWin,
    }
})()

//factory function for players
const playerFactory = (name, symbol) => {

    const setName = () => name = prompt('name: ');

    return {name, symbol, setName};
};

//playgame module
const playGame = (() => {
    const player1 = playerFactory('player1', 'X');
    const player2 = playerFactory('player2', 'O');
    let move = 0;

    for (i = 0; i < 9; i++) {
        let index = i;
        let square = document.getElementById('box' + i);
        
        square.addEventListener('click', () => {
            if (square.textContent !== "") {
                return;
            }
            if (move % 2 === 0) {
                GameBoard.spaces.splice(index, 1, player1.symbol);
                GameBoard.setupBoard();
                GameBoard.checkWin(player1.symbol); 
            }
            else {
                GameBoard.spaces.splice(index, 1, player2.symbol); 
                GameBoard.setupBoard();
                GameBoard.checkWin(player2.symbol);
            }
            move += 1;
        })
    }
})()


   