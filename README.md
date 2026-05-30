# Ocean Voyager - Vanilla JS Videogame

## 📝 Project Description
Ocean Voyager is a fast-paced, 2D arcade-style survival game built entirely using vanilla web technologies (HTML5, CSS3, and modern JavaScript). The player takes control of a cargo/exploration ship navigating through dangerous, uncharted ocean waters. The main objective is to survive as long as possible while avoiding fatal collisions with aggressive marine predators that spawn dynamically and attack with increasing frequency.

### Game Entities:
1. **Player (Ship - `🚢`):** The main controlled entity. It can move freely in all four directions (Up, Down, Left, Right) within the game board boundaries. It starts with 100 HP.
2. **Shark (Basic Enemy - `🦈`):** A standard, moderately fast enemy that spawns from the right edge of the screen at random vertical paths. Deals 20 damage upon collision.
3. **Whale (Advanced Enemy - `🐋`):** A large, high-speed predator that begins to hunt the player once the score crosses 100 points. Deals a devastating 40 damage.

---

## 📐 Excalidraw Sketch & Layout Planning
Before starting the coding phase, I sketched the complete spatial coordinate framework, dynamic spawn areas, and UI panels using Excalidraw to visualize the bounding box models ($65 \times 45$ for the ship and varying sizes for the aquatic enemies).

![Excalidraw Game Blueprint](
https://drive.google.com/file/d/1vAnI09M6KlH30xowq86J4wBluQVbwx9y/view?usp=sharing )

---

## 🕹️ How to Play

### Controls:
You can control the ship's navigation using either the standard keyboard arrows or classic WASD keys for better responsiveness:
* **Move Up:** `ArrowUp` or `W`
* **Move Down:** `ArrowDown` or `S`
* **Move Left:** `ArrowLeft` or `A`
* **Move Right:** `ArrowRight` or `D`

### Game Objective:
Survive the continuous waves of oceanic predators for as long as possible. Your score automatically increases over time. As your score climbs past 100 points, the game enters a higher difficulty stage where fast Whales join the standard Shark spawning pool.

### Win / Lose Conditions:
* **Win Condition:** The game is an endless survival model; there is no explicit "win" screen. The goal is to break your previous high score and dominate the leaderboard.
* **Lose Condition:** If your ship's hull strength drops to **0 HP** or below due to obstacle collisions, the game loop terminates instantly, showing the Game Over screen and logging your final score.

---

## 🛠️ Tech Decisions & Architecture

For this game, I decided to go with a strict **Object-Oriented Programming (OOP)** approach rather than a functional architecture. 

### Why OOP?
1. **Inheritance & Clean Code:** Since the game features multiple enemy types (Sharks and Whales) that share common traits like movement loops, initial rendering pipelines, and destruction methods, using a base `Enemy` class was the most logical choice. `Shark` and `Whale` simply extend the base class (`extends Enemy`) and modify specific attributes via `super()`, avoiding code duplication.
2. **Encapsulation:** Each entity maintains its own state (coordinates, dimensions, dynamic speed, and reference to its DOM element) directly inside its instance. This keeps the game loop uncluttered and prevents global scope pollution.
3. **Scalability:** If I want to add a third type of enemy in the future (e.g., a giant squid or an iceberg obstacle), I can easily spin up a new sub-class in minutes without breaking the core engine.

---

## 📈 Persistence & Data Tracking
The game saves your all-time record score locally using the browser's `localStorage` API. The record is safely checked and updated at the end of every run, ensuring that your achievements persist even after closing the browser tab or restarting your computer.

---

## ⚠️ Known Bugs & Future Roadmap

### Current Known Bugs / Visual Quirks:
* **Hitbox Precision:** Collision checking is performed using standard Axis-Aligned Bounding Box (AABB) rectangles. Because the visual image files contain transparent paddings, some collisions can look slightly wider than the pixel-perfect borders of the ship asset.
* **Rapid Key Tapping Delay:** In some older browser versions, holding down multiple keys at the boundary line causes a minute stutter before the `Math.max/min` clamp updates.

### What I'd Fix Next:
1. **Pixel-Perfect Collision Maps:** Migrate from rectangular `$x/y$` boundary checks to a sub-grid pixel overlapping index to make collisions 100% accurate.
2. **Audio Engineering:** Implement subtle sound effects (ambient ocean noise, crash indicators, and a retro high-score sound).
3. **Power-ups Module:** Add a collectible green shield item or floating repair kits to restore 15 HP periodically.

---

## 🔗 Project Links & Development Logs

* **Live Game URL:** [Play Ocean Voyager Live on GitHub Pages](https://yagutrslbyl.github.io/My-game/) *(Note: Replace with your actual live link)*
* **Development Process Log:** [Read my AI_DIARY.md](./AI_DIARY.md)