let bucket;
let fallingObjects = [];
let score = 0; 
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  bucket = new Bucket();
}

function draw() {
  background(50, 150, 200); 
  
  if (!gameOver) {
    bucket.show();
    bucket.move();

    if (frameCount % 30 === 0) {
      fallingObjects.push(new FallingObject());
    }

    for (let i = fallingObjects.length - 1; i >= 0; i--) {
      fallingObjects[i].show();
      fallingObjects[i].update();

      if (fallingObjects[i].hits(bucket)) {
        score++;
        fallingObjects.splice(i, 1); 
      } else if (fallingObjects[i].y > height) {
        gameOver = true;
      }
    }

    fill(255);
    textSize(24);
    console.log(`Score position: (25, 50)`);
    text(`Score: ${score}`, 25, 50);
  } else {
    fill(255);
    textSize(48);
    textAlign(CENTER);
    text('Game Over!', width / 2, height / 2);
    textSize(24);
    text(`Final Score: ${score}`, width / 2, height / 2 + 50);
    text('Press R to Restart', width / 2, height / 2 + 100);
  }
}

class Bucket {
  constructor() {
    this.x = width / 2;
    this.y = height - 20;
    this.w = 100;
    this.h = 20;
    this.speed = 12;
  }

  show() {
    fill(255, 200, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
      this.x += this.speed;
    }
  }
}

class FallingObject {
  constructor() {
    this.x = random(width / 4, (3 * width) / 4); 
    this.y = 0;
    this.size = 20;
    this.speed = random(2, 5);
  }

  show() {
    fill(200, 50, 50);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.y += this.speed;
  }

  hits(bucket) {
    return (
      this.y + this.size / 2 > bucket.y &&
      this.x > bucket.x &&
      this.x < bucket.x + bucket.w
    );
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    gameOver = false;
    score = 0;
    fallingObjects = [];
    bucket.x = width / 2; 
  }
}
