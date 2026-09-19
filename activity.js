console.log("JS LOADED");
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.imageSmoothingEnabled = false;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);
let gameState = "menu"

// Load images

let sadpigeonBackImage = new Image();
sadpigeonBackImage.src = "sadpigeone_back.png";

let sadpigeonFrontImage = new Image();
sadpigeonFrontImage.src = "sadpigeone_front.png";

let sadpigeonLeftImage = new Image();
sadpigeonLeftImage.src = "sadpigeone_left.png";

let sadpigeonRightImage = new Image();
sadpigeonRightImage.src = "sadpigeone_right.png";

// let

let player = {
  image: sadpigeonFrontImage,
  speed: 4,
  x: 100,
  y: 100,
  width: 60,
  height: 70,
};

let button = {
    x: canvas.clientWidth / 2 - 100,
    y: 250,
    width: 200,
    height: 70
};
// Keys mouse

let key = "";

let mouseX = 0
let mouseY = 0

document.addEventListener("keydown", function (event) {
  key = event.code;
});

document.addEventListener("keyup", function (event) {
  key = "";
});

canvas.addEventListener("click", function(event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;

    if (
    mouseX > button.x &&
    mouseX < button.x + button.width &&
    mouseY > button.y &&
    mouseY < button.y + button.height
) {
gameState = "characterSelect";
}
});


let mouseDown = false;

canvas.addEventListener("mousedown", function(event) {
    mouseDown = true;

    mouseX = event.offsetX;
    mouseY = event.offsetY;

  
});

canvas.addEventListener("mousemove", function(event) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;

});

canvas.addEventListener("mouseup", function(event) {
    mouseDown = false;

    mouseX = event.offsetX;
    mouseY = event.offsetY;


});



// Game loop

function gameloop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState === "menu") {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
 

    ctx.fillText("MY GAME", canvas.width / 2, 150);

    ctx.fillStyle = "gray";
ctx.fillRect(
    canvas.clientWidth / 2 - 100,
    250,
    200,
    70
    );
  
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
   ctx.fillText("ИГРАТЬ", canvas.clientWidth / 2, 295);

    requestAnimationFrame(gameloop);
    return;
}

if (gameState === "characterSelect") {
    // здесь нарисуем выбор персонажа

    requestAnimationFrame(gameloop);
    return;
}

  ctx.fillStyle ="green"
ctx.fillRect (0, 0, canvas.width, canvas.height)

  // Movement

  if (key === "KeyW") {
    player.y -= player.speed;
    player.image = sadpigeonBackImage;
  }

  if (key === "KeyA") {
    player.x -= player.speed;
    player.image = sadpigeonLeftImage;
  }

  if (key === "KeyS") {
    player.y += player.speed;
    player.image = sadpigeonFrontImage;
  }

  if (key === "KeyD") {
    player.x += player.speed;
    player.image = sadpigeonRightImage;
  }

  // Draw player

  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);

  requestAnimationFrame(gameloop);
}

gameloop();
