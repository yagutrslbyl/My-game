// Oyun sahəsini seçirik
const gameBoard = document.getElementById('game-board');

// 1. Gəmi (Player) Klassı
class Player {
    constructor() {
        this.width = 60;
        this.height = 40;
        // Gəminin ilkin koordinatları (Ekranın sol tərəfində, ortada)
        this.x = 50;
        this.y = 235; 
        this.speed = 15; // Hər basışda neçə piksel hərəkət etsin

        // DOM elementi yaradırıq
        this.element = document.createElement('div');
        this.element.classList.add('player');
        this.updatePosition();
        gameBoard.appendChild(this.element);
    }

    // Gəminin ekrandakı yerini yeniləyən metod
    updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    // Hərəkət metodları (Maneələrdən çıxmasın deyə sərhədləri qoruyuruq)
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

// 2. Oyunu başladırıq və Gəmi obyektini yaradırıq
const player = new Player();

// 3. Klaviaturadan gələn əmrləri dinləyirik (Event Listeners)
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            player.moveUp();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            player.moveDown();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            player.moveLeft();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            player.moveRight();
            break;
    }
});

// Aktiv köpək balıqlarını saxlamaq üçün massiv
const enemies = [];

// 1. Köpək Balığı (Enemy) Klassı
class Enemy {
    constructor() {
        this.width = 30;
        this.height = 30;
        
        // Köpək balığı ekranın tam sağından (kənarından) başlayır
        this.x = gameBoard.clientWidth; 
        
        // Yuxarıdan aşağıya təsadüfi (random) bir hündürlükdə yaransın
        this.y = Math.random() * (gameBoard.clientHeight - this.height);
        
        // Hər köpək balığının sürəti fərqli və təsadüfi olsun (məsələn, 2 ilə 5 arası)
        this.speed = Math.random() * 3 + 2; 

        // DOM elementi yaradırıq
        this.element = document.createElement('div');
        this.element.classList.add('enemy');
        this.updatePosition();
        gameBoard.appendChild(this.element);
    }

    // Ekrandakı yerini yeniləyir
    updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    // Sola doğru hərəkət metodu
    move() {
        this.x -= this.speed;
        this.updatePosition();
    }

    // Əgər ekrandan çıxıbsa, elementi silirik
    isOutOfBounds() {
        return this.x + this.width < 0;
    }

    // Elementi həm ekrandan, həm yaddaşdan silmək üçün
    destroy() {
        this.element.remove();
    }
}

// 2. Müəyyən zaman aralığında (məsələn, hər 1.5 saniyədən bir) yeni köpək balığı yaradan funksiya
setInterval(() => {
    enemies.push(new Enemy());
}, 1500);

// 3. Oyun Döngüsü (Game Loop) - Hər freymdə düşmənləri hərəkət etdirir
function gameLoop() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.move();

        // Ekrandan çıxan köpək balıqlarını təmizləyirik
        if (enemy.isOutOfBounds()) {
            enemy.destroy();
            enemies.splice(i, 1); // Massivdən silirik
        }
    }

    // Bu funksiya brauzerin hər ekran yenilənməsində (60fps) gameLoop-u işə salır
    requestAnimationFrame(gameLoop);
}

// Oyun döngüsünü başladırıq
gameLoop();