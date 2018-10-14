// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  /**
   * @description player class named 'Hero'
   * @param { number } this.speed - speed of bug(s)
   * @param { number } this.step - stepping in forward direction
   * @param { number } this.boundary - End point of a row
   * @param { number } this.resetPosition - reset the bug position to the beginning point
   */

  this.x = x;
  this.y = y + 50;
  this.speed = speed;
  this.step = 101;
  this.boundary = this.step * 5;
  this.resetPosition = -this.step;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < this.boundary) {
    this.x += this.speed * dt;
  } else {
    this.x = this.resetPosition;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description player class named 'Hero'
 * @param {number} this.step - Vertical Steps - COLUMNS
 * @param {number} this.jump - Horizontal Steps - ROWS
 * @param {number} this.startX - Centralize Horizontal Step per block
 * @param {number} this.startY - Centralize Vertical Step per block
 */
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
  constructor() {
    this.sprite = "images/char-boy.png";
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 5) - 40;
    this.x = this.startX;
    this.y = this.startY;
  }

  /**
   *  @description renders character's image
   */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
   * @description Binding controls with Hero where
   * @description 'x' denotes horizontal path & 'y' denotes vertical path
   * @description use of `if-condition` to keep our Hero in the playground area
   * @param {string} input - variable for direction
   */

  handleInput(input) {
    switch (input) {
      case "left":
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case "up":
        if (this.y > 0) {
          this.y -= this.jump;
        }
        break;
      case "right":
        if (this.x < this.jump * 4) {
          this.x += this.step;
        }
        break;
      case "down":
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
        break;
    }
  }
}

/**
 * @description the player object in a variable called player
 * @param {object} player - insantiate Hero object
 * @param {object[]} bug - all bugs as objects
 * @param {array} allEnemies - all enemy objects in an array
 */
const player = new Hero();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 250);
const bug3 = new Enemy(-(101 * 3), (83 * 2), 400);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
