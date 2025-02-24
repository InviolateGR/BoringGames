document.addEventListener("DOMContentLoaded", () => {
    
    // Explore Button Effect & Navigation
    const exploreBtn = document.getElementById("exploreBtn");

    if (exploreBtn) {
        exploreBtn.addEventListener("click", (event) => {
            const buttonRect = exploreBtn.getBoundingClientRect();
            const numPixels = 50;

            for (let i = 0; i < numPixels; i++) {
                let pixel = document.createElement("div");
                pixel.classList.add("pixel");
                document.body.appendChild(pixel);

                let x = buttonRect.left + Math.random() * buttonRect.width;
                let y = buttonRect.top + Math.random() * buttonRect.height;

                pixel.style.left = `${x}px`;
                pixel.style.top = `${y}px`;

                let angle = Math.random() * 2 * Math.PI;
                let distance = Math.random() * 100 + 30;

                pixel.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                pixel.style.opacity = "0";

                setTimeout(() => {
                    pixel.remove();
                }, 800);
            }

            exploreBtn.style.opacity = "0";
            setTimeout(() => {
                window.location.href = "explore.html";
            }, 800);
        });
    }

    // Fade-in effect for game container if it exists
    const gameContainer = document.getElementById("gameContainer");
    if (gameContainer) {
        gameContainer.classList.add("fade-in");
    }
});
