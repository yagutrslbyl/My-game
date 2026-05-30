const gameBoard = document.getElementById("game-board");
const hpValue = document.getElementById("hp-value");
const scoreValue = document.getElementById("score-value");

const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const finalScore = document.getElementById("final-score");
const highScore = document.getElementById("high-score");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

let player;
let enemies = [];

let hp = 100;
let score = 0;
let gameRunning = false;

let spawnTimer;
let scoreTimer;

/* ===================== PLAYER ===================== */
class Player {
    constructor() {
        this.width = 65;
        this.height = 45;

        this.x = 50;
        this.y = 220;

        this.speed = 20;

        this.element = document.createElement("div");
        this.element.classList.add("player");

        gameBoard.appendChild(this.element);
        this.draw();
    }

    draw() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
}

/* ===================== ENEMY BASE ===================== */
class Enemy {
    constructor(className, width, height, damage, speed) {
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.speed = speed;

        this.x = gameBoard.clientWidth;
        this.y = Math.random() * (gameBoard.clientHeight - height);

        this.element = document.createElement("div");
        this.element.classList.add(className);

        gameBoard.appendChild(this.element);
        this.draw();
    }

    draw() {
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }

    move() {
        this.x -= this.speed;
        this.draw();
    }

    destroy() {
        this.element.remove();
    }
}

/* ===================== SHARK ===================== */
class Shark extends Enemy {
    constructor() {
        super("enemy", 70, 50, 20, 4);
    }
}

/* ===================== WHALE ===================== */
class Whale extends Enemy {
    constructor() {
        super("whale", 95, 65, 40, 7);
    }
}

/* ===================== COLLISION ===================== */
function collision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

/* ===================== SPAWN ===================== */
function spawnEnemy() {
    if (score > 100 && Math.random() < 0.3) {
        enemies.push(new Whale());
    } else {
        enemies.push(new Shark());
    }
}

/* ===================== START GAME ===================== */
function startGame() {
    enemies.forEach(e => e.destroy());
    enemies = [];

    if (player) player.element.remove();

    hp = 100;
    score = 0;

    hpValue.textContent = hp;
    scoreValue.textContent = score;

    player = new Player();

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    gameRunning = true;

    clearInterval(spawnTimer);
    clearInterval(scoreTimer);

    spawnTimer = setInterval(spawnEnemy, 1000);

    scoreTimer = setInterval(() => {
        score += 5;
        scoreValue.textContent = score;
    }, 1000);

    requestAnimationFrame(gameLoop);
}

/* ===================== GAME LOOP ===================== */
function gameLoop() {
    if (!gameRunning) return;

    for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];

        enemy.move();

        if (collision(player, enemy)) {
            hp -= enemy.damage;
            hpValue.textContent = hp;

            enemy.destroy();
            enemies.splice(i, 1);

            if (hp <= 0) {
                endGame();
                return;
            }
        }

        if (enemy.x < -100) {
            enemy.destroy();
            enemies.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

/* ===================== END GAME ===================== */
function endGame() {
    gameRunning = false;

    clearInterval(spawnTimer);
    clearInterval(scoreTimer);

    let best = localStorage.getItem("highscore") || 0;

    if (score > best) {
        best = score;
        localStorage.setItem("highscore", best);
    }

    finalScore.textContent = score;
    highScore.textContent = best;

    gameOverScreen.classList.remove("hidden");
}

/* ===================== CONTROLS ===================== */
document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    switch (e.key) {
        case "ArrowUp":
        case "w":
            player.y -= player.speed;
            break;

        case "ArrowDown":
        case "s":
            player.y += player.speed;
            break;

        case "ArrowLeft":
        case "a":
            player.x -= player.speed;
            break;

        case "ArrowRight":
        case "d":
            player.x += player.speed;
            break;
    }

    player.x = Math.max(0, Math.min(gameBoard.clientWidth - player.width, player.x));
    player.y = Math.max(0, Math.min(gameBoard.clientHeight - player.height, player.y));

    player.draw();
});

/* ===================== BUTTONS ===================== */
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);