const GameBoard = (() => {
    let spaces = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    function setupBoard() {
        for (i = 0; i < 9; i++) {
            document.getElementById('box' + i).textContent = spaces[i];
        }
    }

    function makeMove() {
        for (i = 0; i < 9; i++) {
            let index = i;
            document.getElementById('box' + i).addEventListener('click', () => {
                spaces.splice(index, 1, 'test');
                setupBoard();
            })
        }
    }

    return {
        spaces,
        setupBoard,
        makeMove
    }
})()


GameBoard.setupBoard();
GameBoard.makeMove();