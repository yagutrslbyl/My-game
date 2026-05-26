// Oyun sahəsini seçirik
const gameBoard = document.getElementById('game-board');

// 1. Gəmi (Player) Klassı
class Player {
    constructor() {
        this.width = 50;
        this.height = 30;
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