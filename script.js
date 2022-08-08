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
        display.status.innerHTML = 'It\'s a draw. Click reset button to play again.';
        document.getElementById('reset').disabled = false;
        document.getElementById('grid-container').outerHTML = document.getElementById('grid-container').outerHTML;
       }
    }

    function endRound(winner) {
        display.status.innerHTML = winner + ' is the winner! Click reset button to play again.';
        document.getElementById('reset').disabled = false;
        document.getElementById('grid-container').outerHTML = document.getElementById('grid-container').outerHTML;
    }

    function reset() {
        for (i = 0; i < 9; i++) {
            document.getElementById('box' + i).innerHTML = "";
        }
        document.getElementById('reset').disabled = true;
        location.reload();
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
const playerFactory = (name, symbol) => {

    const setName = () => name = prompt('name: ');

    return {name, symbol, setName};
};

const display = (() => {
    const status = document.getElementById('status');
    

    function getNames() {
        const submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            player1.name = document.getElementById('player1').value;
            player2.name = document.getElementById('player2').value;
        })
    }
    return {
        status, 
        getNames
    }
})()

//playgame module
const playGame = (() => {
    const player1 = playerFactory('player1', 'X');
    const player2 = playerFactory('player2', 'O');
    
    const newGameButton = document.getElementById('new-game');
        newGameButton.addEventListener('click', (e) => {
        document.getElementById('popup').style.display = 'grid';
        newGameButton.remove()
        })
    
    const submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            player1.name = document.getElementById('player1').value;
            if (player1.name === "") {
                player1.name = 'Player 1'
            }
            player2.name = document.getElementById('player2').value;
            if (player2.name === "") {
                player2.name = 'Player 2'
            }
            display.status.innerHTML = player1.name + ' goes first...';
            document.getElementById('popup').style.display = 'none';
            if (player2.name === 'computer') {
                playComputer();
            }
            else {
            playRound();
            }
        })

    let move = 0;
    console.log(player2.name)
    

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
                
                display.status.innerHTML = player2.name + '\'s turn';
                GameBoard.checkDraw();
                if (GameBoard.checkWin(player1.symbol) === true) {
                    GameBoard.endRound(player1.name);
                }
            }
            else {
                GameBoard.spaces.splice(index, 1, player2.symbol); 
                GameBoard.setupBoard();
                
                display.status.innerHTML = player1.name + '\'s turn';
                GameBoard.checkDraw();
                if (GameBoard.checkWin(player2.symbol) === true) {
                    GameBoard.endRound(player2.name);
                };
            }
            move += 1;
        }
        square.addEventListener('click', click);
    }}

    function playComputer() {
        for (i = 0; i < 9; i++) {
            let index = i;
            let square = document.getElementById('box' + i);
                square.addEventListener('click', () => {
                if (square.textContent !== "") {
                    return;
                }
                    GameBoard.spaces.splice(index, 1, player1.symbol);
                    GameBoard.setupBoard();
                    
                
                    GameBoard.checkDraw();
                    if (GameBoard.checkWin(player1.symbol) === true) {
                        GameBoard.endRound(player1.name);
                    }
                    GameBoard.spaces.splice(Math.floor(Math.random() * 10), 1, player2.symbol);
                    GameBoard.setupBoard();
                    GameBoard.checkDraw();
                    if (GameBoard.checkWin(player2.symbol) === true) {
                        GameBoard.endRound(player2.name);
                    };
                })
                move += 1;
            }

        
    


    return {
        playRound,
        move,
        playComputer
}
}
})()


   