document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const overlay = document.getElementById("overlay");
    const overlayText = document.getElementById("overlayText");
    const restartBtn = document.getElementById("restart");

    // Set canvas size
    const canvasSize = 400;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Game Variables
    const box = 20;
    let snake = [{ x: 200, y: 200 }];
    let direction = "RIGHT";
    let nextDirection = "RIGHT";
    let food = getRandomFoodPosition();
    let gameRunning = false;
    let speed = 120;
    let lastTime = 0;

    // Start Game
    function startGame() {
        if (!gameRunning) {
            gameRunning = true;
            overlay.classList.add("fade-out");
            lastTime = performance.now();
            requestAnimationFrame(gameLoop);
        }
    }

    function gameLoop(timestamp) {
        if (!gameRunning) return;

        if (timestamp - lastTime >= speed) {
            updateGame();
            lastTime = timestamp;
        }
        requestAnimationFrame(gameLoop);
    }

    // Draw Snake
    function drawSnake() {
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? "#28a745" : "#34d058";
            ctx.fillRect(segment.x, segment.y, box, box);
            ctx.strokeStyle = "white";
            ctx.strokeRect(segment.x, segment.y, box, box);
        });
    }
    let foodColor = getRandomColor();
    // Draw Food
    function drawFood() {
        ctx.fillStyle = foodColor; // Keep the same color until eaten
        ctx.fillRect(food.x, food.y, box, box);
    }
    function getRandomColor() {
        let colors = ["#ff4757", "#ffcc00", "#00d084", "#3498db", "#9b59b6"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    // Move Snake
    function moveSnake() {
        direction = nextDirection;
        let head = { ...snake[0] };

        switch (direction) {
            case "UP": head.y -= box; break;
            case "DOWN": head.y += box; break;
            case "LEFT": head.x -= box; break;
            case "RIGHT": head.x += box; break;
        }

        // Check collision with food
        if (head.x === food.x && head.y === food.y) {
            food = getRandomFoodPosition();
            if (speed > 50) speed -= 5; // Increase difficulty
        } else {
            snake.pop();
        }

        // Check collision with walls or itself
        if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize ||
            snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
        }

        snake.unshift(head);
    }

    function updateGame() {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        drawFood();
        drawSnake();
        moveSnake();
    }

    function gameOver() {
        gameRunning = false;
        overlayText.innerText = "Game Over! Press Restart";
        overlay.classList.remove("fade-out");
        overlay.classList.add("game-over");
    }

    document.addEventListener("keydown", (event) => {
        if (!gameRunning) startGame();
        if (event.key === "ArrowUp" && direction !== "DOWN") nextDirection = "UP";
        if (event.key === "ArrowDown" && direction !== "UP") nextDirection = "DOWN";
        if (event.key === "ArrowLeft" && direction !== "RIGHT") nextDirection = "LEFT";
        if (event.key === "ArrowRight" && direction !== "LEFT") nextDirection = "RIGHT";
    });

    restartBtn.addEventListener("click", () => {
        snake = [{ x: 200, y: 200 }];
        direction = "RIGHT";
        food = getRandomFoodPosition();
        gameRunning = false;
        overlayText.innerText = "Press Any Key to Start";
        overlay.classList.remove("game-over");
        overlay.classList.remove("fade-out");
    });

    function getRandomFoodPosition() {
        return { x: Math.floor(Math.random() * (canvasSize / box)) * box, y: Math.floor(Math.random() * (canvasSize / box)) * box };
    }
});
