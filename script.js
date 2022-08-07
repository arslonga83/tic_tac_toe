//Gameboard module
const GameBoard = (() => {
    let spaces = ['', '', '', '', '', '', '', '', ''];

    function setupBoard() {
        for (i = 0; i < 9; i++) {
            document.getElementById('box' + i).innerHTML = spaces[i];
        }
    }

    function checkWin(symbol) {
        if (spaces[0] === spaces[3] && spaces[3] === spaces[6] && spaces[6] === symbol ||
            spaces[1] === spaces[4] && spaces[4] === spaces[7] && spaces[7] === symbol ||
            spaces[2] === spaces[5] && spaces[5] === spaces[8] && spaces[8] === symbol ||
            spaces[0] === spaces[1] && spaces[1] === spaces[2] && spaces[2] === symbol ||
            spaces[3] === spaces[4] && spaces[4] === spaces[5] && spaces[5] === symbol ||
            spaces[6] === spaces[7] && spaces[7] === spaces[8] && spaces[8] === symbol ||
            spaces[0] === spaces[4] && spaces[4] === spaces[8] && spaces[8] === symbol ||
            spaces[2] === spaces[4] && spaces[4] === spaces[6] && spaces[6] === symbol)  {
            return true;
        }
    }

    function checkDraw() {
       if (spaces.includes("") === false) {
        console.log('draw');
       }
    }

    function endRound(winner) {
        console.log(winner + ' is the winner!');
    }

    function reset() {
        spaces = ['', '', '', '', '', '', '', '', ''];
        for (i = 0; i < 9; i++) {
            document.getElementById('box' + i).innerHTML = "";
        }
        document.getElementById('reset').disabled = true;
        move = 0;
        index = 0;
        playGame.playRound();
    }
    document.getElementById('reset').addEventListener('click', reset);


    return {
        spaces,
        setupBoard,
        checkWin,
        checkDraw,
        endRound,
        reset
    }
})()

//factory function for players
const playerFactory = (name, symbol, winCount) => {

    const setName = () => name = prompt('name: ');

    return {name, symbol, winCount, setName};
};

//playgame module
const playGame = (() => {
    const player1 = playerFactory('player1', 'X', 0);
    const player2 = playerFactory('player2', 'O', 0);
    let move = 0;
    playRound();

    function playRound() {
    for (i = 0; i < 9; i++) {
        let index = i;
        let square = document.getElementById('box' + i);
        
        function click() {
            if (square.textContent !== "") {
                return;
            }
            if (move % 2 === 0) {
                GameBoard.spaces.splice(index, 1, player1.symbol);
                GameBoard.setupBoard();
                if (GameBoard.checkWin(player1.symbol) === true) {
                    player1.winCount += 1;
                    GameBoard.endRound(player1.name);
                    console.log('play again?');
                    document.getElementById('reset').disabled = false;
                }
            }
            else {
                GameBoard.spaces.splice(index, 1, player2.symbol); 
                GameBoard.setupBoard();
                if (GameBoard.checkWin(player2.symbol) === true) {
                    player2.winCount += 1;
                    GameBoard.endRound(player2.name);
                };
            }
            
            GameBoard.checkDraw();
            move += 1;
        }
        square.addEventListener('click', click);
    }}
    return {
        playRound,
        move,
}
}
)()


   