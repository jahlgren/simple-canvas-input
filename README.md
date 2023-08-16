<h1 align="center">Simple Canvas Input</h1>

**Simple Canvas Input** is a simple input system for HTML-canvas animations and games.

## Install

```bash
npm install @jahlgren/simple-canvas-input
```

## Usage

```js
// First, make sure to import the input system:
import Input, { Keys, MouseButtons } from '@jahlgren/simple-canvas-input';

// Create example canvas and context:
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d');
document.body.append(canvas);

// Initialize the input system, outside the game loop:
const input = new Input(canvas);

// Game loop
requestAnimationFrame(gameLoop);
function gameLoop(elapsed) {
  requestAnimationFrame(gameLoop);

  // Always make sure to update the input before using it, inside the game loop:
  input.update();

  // Now we can use the public methods in the input system to check for keyboard and mouse events:
  if(input.getMouseButton(MouseButtons.Left)) {
    context.fillRect(input.mousePosition.x - 4, input.mousePosition.y - 4, 8, 8);
  }
}
```

## API

For `key` and `mouseButton` arguments you can use the enums `Keys` and `MouseButtons`, just remember to import them aswell.

| props      | type           | description    |
|------------|----------------|----------------|
| mousePosition | {x: number, y: number} | Mouse coordinates relative to the canvas |
| getKey | (key: string) => boolean | Returns true if the given key is held down |
| getKeyDown | (key: string) => boolean | Returns true if the given key was pressed this frame |
| getKeyUp | (key: string) => boolean | Returns true if the given key was released this frame |
| getMouseButton | (mouseButton: string) => boolean | Returns true if the given mouse button is held down |
| getMouseButtonDown | (mouseButton: string) => boolean | Returns true if the given mouse button was pressed this frame |
| getMouseButtonUp | (mouseButton: string) => boolean  | Returns true if the given mouse button was released this frame |
| setCanvasScale | (scale: number) => boolean | Sets the scale of the canvas to be used for mouse coordinates |
| getCanvasScale | (key: string) => boolean | Gets the value of the given canvas scale |
