const GameBoard = (() => {
    let spaces = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

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


GameBoard.setupBoard();