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
            }
            else {
                GameBoard.spaces.splice(index, 1, player2.symbol); 
            }
            GameBoard.setupBoard(); 
            move += 1;
        })
    }
})()


   