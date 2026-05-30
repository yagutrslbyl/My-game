# AI Development Diary

## AI Tools Used & Justification
For this project, I used **Gemini (Free Version)** as my primary generative AI assistant. I chose this tool because it complies fully with the course guidelines regarding financial fairness (no paid features or credit cards required). Gemini is highly efficient at analyzing vanilla JavaScript code, understanding object-oriented structures, and debugging custom CSS rendering conflicts within raw DOM manipulation pipelines.

---

### [2026-05-26] - Fix Ship Visuals (From Rectangle to Emoji)

**What I asked the AI:**
The ship moves, but it doesn't look like a ship at all. It's just an orange box. I want to change its shape right now.

**What it gave me:**
It provided a new CSS code for `.player` using `border-radius` to mimic a hull shape and added a ship emoji (`🚢`) via the `::after` pseudo-element.

**What was wrong:**
The initial rectangular box did not fit the game's ocean theme at all. Also, the hardcoded dimensions in `app.js` remained unchanged, which would cause issues with boundary checks since the new CSS layout altered the element's scale.

**How I fixed it:**
I updated the CSS with the new styling and pseudo-element. Then, I adjusted the `this.width` and `this.height` properties inside the `Player` class in `app.js` to match the updated dimensions so the movement boundaries worked correctly.

**Time lost:** ~10 minutes

---

### [2026-05-26] - Replacing Emojis with Real PNG Images

**What I asked the AI:**
I didn't like the appearance of the emojis. The shark emoji looks too curved. I want the shark to look straight, angry, and charging towards the ship with visible teeth. What should I change in CSS?

**What it gave me:**
It suggested removing the pseudo-elements (`::after`) and applying transparent PNG image URLs directly to the `.player` and `.enemy` backgrounds, utilizing `background-size: contain`.

**What was wrong:**
The standard emojis looked too basic and childish for the intended game atmosphere. Specifically, the natural curve of the `🦈` emoji pointed diagonally downward instead of straight ahead, failing to look like an aggressive shark charging at the ship.

**How I fixed it:**
I removed the emoji content from CSS and configured the divs to use real transparent PNG graphics. I used CSS filters (`drop-shadow`) to add a red angry aura around the sharks. Finally, I updated the bounding box variables in `app.js` (65x45 for the Ship, 70x50 for the Shark) to make sure the game logic aligns perfectly with the new image dimensions.

**Time lost:** ~15 minutes

---

### [2026-05-26] - Fix Shark Spawning and Game Loop Logic

**What I asked the AI:**
The sharks (enemies) are not appearing on the screen anymore while playing, and the console shows no errors. How to fix this?

**What it gave me:**
A consolidated and fully synchronized version of `app.js` ensuring that `setInterval`, `Enemy` instantiation, and the `gameLoop` animation frame work together harmoniously without overriding each other.

**What was wrong:**
During the transition from emojis to PNG images, fragments of the old positioning logic and the new collision updates caused a logical conflict. The enemies array was either not being populated correctly or the `gameLoop` function wasn't being correctly invoked at runtime, resulting in zero visible enemies despite no syntax errors in the console.

**How I fixed it:**
I completely wiped the conflicting `app.js` scripts and replaced them with a unified object-oriented structure where initialization, spawning timers, and collision loops are neatly separated and executed sequentially.

**Time lost:** ~15 minutes

---

### [2026-05-30] - Balanced Enemy Spawning and Refactoring

**What I asked the AI:**
I shared my full JavaScript game code and asked if there was any hidden logical problem regarding spawn distributions.

**What it gave me:**
It explained that my enemy spawning logic was highly unbalanced, and the initial integration of the dynamic Whale spawn condition was poorly structured, mixed, and not reusable. It provided a rewritten version of the spawn framework.

**What was wrong:**
The dynamic enemy instantiation was inconsistent. The spawning pool lacked explicit conditional controls, making the overall game balance chaotic and failing to separate the basic shark behavior from advanced boss encounters properly.

**How I fixed it:**
I modularized the spawning script inside `initGame()`. I established a strict threshold check where the `Whale` is locked out early on, and triggers with a 40% probability *only* after the user crosses a score of 100. Otherwise, the game safely falls back to deploying the default `Enemy` (Shark) class.

**Time lost:** ~30 minutes

---

### [2026-05-30] - Feature: Adding Whale Class & Resolving Player Visibility Bug

**What I asked the AI:**
I wanted to add a second, faster enemy type (a Whale) that deals more damage after the score reaches 100, and needed help separating conflicting CSS class names and fixing a bug where the player ship unexpectedly disappeared from the screen.

**What it gave me:**
An independent, optimized `Whale` class in `app.js` with its own `.whale` CSS selector. However, during the asset separation process, a CSS class conflict and dynamic layer priority issue caused the player ship (`.player`) to become invisible while the game logic was running in the background.

**What was wrong:**
1. **Asset Conflict:** The newly introduced styling collided with elements of the player object's rendering scheme due to duplicate classes in CSS.
2. **Layering & Render Bug:** The player class lacked a dominant `z-index` layer and layout fallback, forcing it to render underneath the backdrop configuration or fail to bind the source image properly when the game initiated.

**How I fixed it:**
I completely refactored `style.css` to isolate `.enemy` (Shark) and `.whale` (Whale) into separate blueprints to avoid rendering confusion. To bring the ship back, I updated the `.player` CSS rules by assigning an explicit `z-index: 99` layer priority, establishing a clear dimension tree (`65px` by `45px`), and adding a safe responsive target class (`.player img`) to ensure the ship asset remains persistently visible on top of all active ocean layout nodes.

**Time lost:** ~15 minutes