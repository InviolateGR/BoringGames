document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset");
    const statusText = document.getElementById("statusText"); // New status display
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        for (let combo of winningCombinations) {
            let [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                highlightWinner(combo);
                statusText.innerText = `${board[a]} Wins! 🎉`; // Show winner message
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            statusText.innerText = "It's a Draw! 🤝";
            animateDraw();
        }
    }

    function highlightWinner(combo) {
        combo.forEach(index => {
            cells[index].classList.add("win");
        });
    }

    function animateDraw() {
        cells.forEach(cell => {
            cell.classList.add("shake");
        });

        setTimeout(() => {
            cells.forEach(cell => cell.classList.remove("shake"));
        }, 1000);
    }

    function handleClick(e) {
        let index = e.target.dataset.index;
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function resetGame() {
        board.fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("win", "shake");
        });
        statusText.innerText = ""; // Reset status message
        currentPlayer = "X";  
        gameActive = true;
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
});
