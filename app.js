// 1. DOM Elementləri
const gameBoard = document.getElementById('game-board');
const hpValueEl = document.getElementById('hp-value');
const scoreValueEl = document.getElementById('score-value');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');
const highScoreEl = document.getElementById('high-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// 2. Oyun Vəziyyəti (State) Dəyişənləri
let player = null;
let enemies = [];
let hp = 100;
let score = 0;
let isGameOver = true; // Oyun başlamazdan əvvəl döngü gözləsin diye true edirik
let spawnInterval = null;
let scoreInterval = null;

// 3. Gəmi (Player) Klassı
class Player {
    constructor() {
        this.width = 65;   
        this.height = 45;  
        this.x = 50;
        this.y = 225; 
        this.speed = 15; 

        this.element = document.createElement('div');
        this.element.classList.add('player');
        this.updatePosition();
        gameBoard.appendChild(this.element);
    }

    updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    moveUp() {
        if (!isGameOver && this.y > 0) {
            this.y -= this.speed;
            this.updatePosition();
        }
    }

    moveDown() {
        if (!isGameOver && this.y < gameBoard.clientHeight - this.height) {
            this.y += this.speed;
            this.updatePosition();
        }
    }

    moveLeft() {
        if (!isGameOver && this.x > 0) {
            this.x -= this.speed;
            this.updatePosition();
        }
    }

    moveRight() {
        if (!isGameOver && this.x < gameBoard.clientWidth - this.width) {
            this.x += this.speed;
            this.updatePosition();
        }
    }

    destroy() {
        if (this.element) this.element.remove();
    }
}

// 4. Köpək Balığı (Enemy) Klassı
class Enemy {
    constructor() {
        this.width = 70;   
        this.height = 50;  
        this.x = gameBoard.clientWidth; 
        this.y = Math.random() * (gameBoard.clientHeight - this.height);
        this.speed = Math.random() * 3 + 2; 

        this.element = document.createElement('div');
        this.element.classList.add('enemy');
        this.updatePosition();
        gameBoard.appendChild(this.element);
    }

    updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    move() {
        this.x -= this.speed;
        this.updatePosition();
    }

    isOutOfBounds() {
        return this.x + this.width < 0;
    }

    destroy() {
        if (this.element) this.element.remove();
    }
}

// 5. Toqquşma detektoru
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// 6. Oyunu Başlatma / Sıfırlama Funksiyası (Page Refresh Olmadan!)
function initGame() {
    // Köhnə elementləri təmizləyirik (əgər varsa)
    if (player) player.destroy();
    enemies.forEach(enemy => enemy.destroy());
    enemies = [];

    // Taymerləri təmizləyirik
    clearInterval(spawnInterval);
    clearInterval(scoreInterval);

    // State sıfırlanması
    hp = 100;
    score = 0;
    isGameOver = false;

    // UI Yenilənməsi
    hpValueEl.textContent = hp;
    scoreValueEl.textContent = score;

    // Ekranların gizlədilməsi
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Yeni gəmi obyekti yaradırıq
    player = new Player();

    // Düşmən yaradılma taymeri
    spawnInterval = setInterval(() => {
        if (!isGameOver) enemies.push(new Enemy());
    }, 1500);

    // Xal artım taymeri
    scoreInterval = setInterval(() => {
        if (!isGameOver) {
            score += 10;
            scoreValueEl.textContent = score;
        }
    }, 1000);

    // Oyun döngüsünü başladırıq
    gameLoop();
}

// 7. Oyun Döngüsü (Game Loop)
function gameLoop() {
    if (isGameOver) return; 

    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.move();

        if (checkCollision(player, enemy)) {
            enemy.destroy();
            enemies.splice(i, 1);
            
            hp -= 20;
            if (hp < 0) hp = 0;
            hpValueEl.textContent = hp;

            if (hp <= 0) {
                triggerGameOver();
                return; // Döngüdən tam çıxırıq
            }
            continue; 
        }

        if (enemy.isOutOfBounds()) {
            enemy.destroy();
            enemies.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

// 8. Oyun Bitmə Məntiqi (Yüksək Xal Mexanikası Daxil)
function triggerGameOver() {
    isGameOver = true;
    clearInterval(spawnInterval);
    clearInterval(scoreInterval);

    // High Score hesabı (Persistence mərhələsi - localStorage)
    let currentHighScore = localStorage.getItem('ocean_voyager_highscore') || 0;
    if (score > currentHighScore) {
        currentHighScore = score;
        localStorage.setItem('ocean_voyager_highscore', currentHighScore);
    }

    // Game Over ekranını doldurub göstəririk
    finalScoreEl.textContent = score;
    highScoreEl.textContent = currentHighScore;
    gameOverScreen.classList.remove('hidden');
}

// 9. Düymə Hadisələri (Event Listeners)
startBtn.addEventListener('click', initGame);
restartBtn.addEventListener('click', initGame);

window.addEventListener('keydown', (event) => {
    if (!player || isGameOver) return; // Oyun bitibsə hərəkət etməsin

    switch (event.key) {
        case 'ArrowUp': case 'w': case 'W':
            player.moveUp();
            break;
        case 'ArrowDown': case 's': case 'S':
            player.moveDown();
            break;
        case 'ArrowLeft': case 'a': case 'A':
            player.moveLeft();
            break;
        case 'ArrowRight': case 'd': case 'D':
            player.moveRight();
            break;
    }
});