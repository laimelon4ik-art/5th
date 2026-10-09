console.log("JS LOADED");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let gameState = "menu";

function resizeCanvas() {
const dpr = window.devicePixelRatio || 1;

```
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;

canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
ctx.imageSmoothingEnabled = false;
```

}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Load character images
const sadpigeonBackImage = new Image();
sadpigeonBackImage.src = "sadpigeone_back.png";

const sadpigeonFrontImage = new Image();
sadpigeonFrontImage.src = "sadpigeone_front.png";

const sadpigeonLeftImage = new Image();
sadpigeonLeftImage.src = "sadpigeone_left.png";

const sadpigeonRightImage = new Image();
sadpigeonRightImage.src = "sadpigeone_right.png";

// Player
const player = {
image: sadpigeonFrontImage,
speed: 4,
x: 100,
y: 100,
width: 60,
height: 70
};

// Keyboard
const keys = {};

document.addEventListener("keydown", function(event) {
keys[event.code] = true;
});

document.addEventListener("keyup", function(event) {
keys[event.code] = false;
});

// Play button
canvas.addEventListener("click", function(event) {
const rect = canvas.getBoundingClientRect();
const mouseX = event.clientX - rect.left;
const mouseY = event.clientY - rect.top;

```
const buttonX = window.innerWidth / 2 - 100;
const buttonY = 250;
const buttonWidth = 200;
const buttonHeight = 70;

if (
    gameState === "menu" &&
    mouseX >= buttonX &&
    mouseX <= buttonX + buttonWidth &&
    mouseY >= buttonY &&
    mouseY <= buttonY + buttonHeight
) {
    gameState = "playing";
}
```

});

// Game loop
function gameloop() {
const width = window.innerWidth;
const height = window.innerHeight;

```
ctx.clearRect(0, 0, width, height);

// Background
ctx.fillStyle = "green";
ctx.fillRect(0, 0, width, height);

// MENU
if (gameState === "menu") {
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("MY GAME", width / 2, 150);

    ctx.fillStyle = "gray";
    ctx.fillRect(width / 2 - 100, 250, 200, 70);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("PLAY", width / 2, 295);
}

// GAME
else if (gameState === "playing") {
    if (keys["KeyW"]) {
        player.y -= player.speed;
        player.image = sadpigeonBackImage;
    }

    if (keys["KeyS"]) {
        player.y += player.speed;
        player.image = sadpigeonFrontImage;
    }

    if (keys["KeyA"]) {
        player.x -= player.speed;
        player.image = sadpigeonLeftImage;
    }

    if (keys["KeyD"]) {
        player.x += player.speed;
        player.image = sadpigeonRightImage;
    }

    // Keep player inside the screen
    player.x = Math.max(0, Math.min(width - player.width, player.x));
    player.y = Math.max(0, Math.min(height - player.height, player.y));

    // Draw character
    if (player.image.complete && player.image.naturalWidth > 0) {
        ctx.drawImage(
            player.image,
            player.x,
            player.y,
            player.width,
            player.height
        );
    }
}

requestAnimationFrame(gameloop);
```

}

gameloop();
