// 1. Oyun sahəsini seçirik
const gameBoard = document.getElementById('game-board');
const enemies = [];

// 2. Gəmi (Player) Klassı
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
        if (this.y > 0) {
            this.y -= this.speed;
            this.updatePosition();
        }
    }

    moveDown() {
        if (this.y < gameBoard.clientHeight - this.height) {
            this.y += this.speed;
            this.updatePosition();
        }
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
            this.updatePosition();
        }
    }

    moveRight() {
        if (this.x < gameBoard.clientWidth - this.width) {
            this.x += this.speed;
            this.updatePosition();
        }
    }
}

// 3. Köpək Balığı (Enemy) Klassı
class Enemy {
    constructor() {
        this.width = 70;   
        this.height = 50;  
        this.x = gameBoard.clientWidth; // Sağ kənardan başlayır
        this.y = Math.random() * (gameBoard.clientHeight - this.height);
        this.speed = Math.random() * 3 + 2; // Təsadüfi sürət

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
        this.element.remove();
    }
}

// 4. Oyunu başladırıq və Player yaradırıq
const player = new Player();

// 5. Toqquşmanı yoxlayan funksiya
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// 6. Hər 1.5 saniyədən bir köpək balığı yaradırıq
setInterval(() => {
    enemies.push(new Enemy());
}, 1500);

// 7. Oyun Döngüsü (Game Loop)
function gameLoop() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.move();

        // Toqquşma yoxlanılması
        if (checkCollision(player, enemy)) {
            console.log("💥 Gəmi köpək balığına çırpıldı!");
            enemy.destroy();
            enemies.splice(i, 1);
            continue; 
        }

        // Ekrandan çıxanları təmizləyirik
        if (enemy.isOutOfBounds()) {
            enemy.destroy();
            enemies.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

// Döngünü aktivləşdiririk
gameLoop();

// 8. Düymələri dinləyirik
window.addEventListener('keydown', (event) => {
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