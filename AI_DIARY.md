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