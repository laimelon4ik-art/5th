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

// Load images

let sadpigeonBackImage = new Image();
sadpigeonBackImage.src = "sadpigeone_back.png";

let sadpigeonFrontImage = new Image();
sadpigeonFrontImage.src = "sadpigeone_front.png";

let sadpigeonLeftImage = new Image();
sadpigeonLeftImage.src = "sadpigeone_left.png";

let sadpigeonRightImage = new Image();
sadpigeonRightImage.src = "sadpigeone_right.png";

// Player

let player = {
  image: sadpigeonFrontImage,
  speed: 4,
  x: 100,
  y: 100,
  width: 64,
  height: 64,
};

// Keys

let key = "";

document.addEventListener("keydown", function (event) {
  key = event.code;
});

document.addEventListener("keyup", function (event) {
  key = "";
});

// Game loop

function gameloop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
