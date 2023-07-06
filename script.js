let board = ["", "", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

// get all the cells on the gameboard
let cells = document.querySelectorAll(".cell");

// get the reset button and message element
let resetButton = document.querySelector('#reset');

let messageElement = document.querySelector("#message");

// event listener needed for each cell

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {

        // checking cell if it is not empty or the game is finished 
        if (board[index] === "" && !isGameOver()) {
            board[index] = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());
            cell.innerHTML = currentPlayer

            // checking if the game is over after current move
            if (isGameOver()) {
                messageElement.innerHTML = currentPlayer + " wins";
                cells.forEach((cell) => cell.removeEventListener("click",
                    handleCellClick));
            } else if (!board.includes("")) {
                // update the message if game is over
                messageElement.innerHTML = "It is a draw";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                messageElement.innerHTML = currentPlayer + " 's turn";
            }
        }
    })
})

// reset button functionality

resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    cells.forEach((cell) => {
        cell.classList.remove("x", "o");
        cell.innerHTML = "";
    })

    messageElement.innerHTML = "X's turn";
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
})

// checking the game status and winner possibility

function isGameOver() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
        [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some((combo) => {
        return (
            board[combo[0]] !== "" && board[combo[0]] === board[combo[1]]
            && board[combo[1]] === board[combo[2]]
        );
    });
}