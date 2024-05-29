document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const gameBoard = document.getElementById("game-board");
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");

    let currentPlayer = "X";
    let gameState = Array(9).fill(""); // Масив для зберігання стану гри
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            message.textContent = "Draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
    };

    const checkWinner = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    };

    startButton.addEventListener("click", () => {
        gameBoard.classList.remove("hidden");
        startButton.classList.add("hidden");
        message.textContent = "Player X's turn";
        gameState.fill("");
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        gameActive = true;
    });

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });
});
