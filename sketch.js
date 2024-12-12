// My highest score is 23!

let bucket
let fallingApples = [] 
let score = 0
let gameOver = false;
let trees

function preload() {
  trees = loadImage('apple trees.png')
}

function setup() {
  createCanvas(800, 600);
  bucket = { x: width / 2, y: height - 20, w: 150, h: 20, speed: 20 };
}

function draw() {
  background(50, 150, 200);
  push()
  image(trees, 0, 0, 911.4, 607.6)
  tint(0, 130)
  image(trees, 0, 0, 911.4, 607.6)
  pop()
  
  if (gameOver) {
    fill(255);
    textSize(48);
    textAlign(CENTER);
    text('Game Over!', width / 2, height / 2);
    textSize(24);
    text('Final Score: ' + score, width / 2, height / 2 + 50);
    text('Press R to Restart', width / 2, height / 2 + 100);
    return;
  }

  fill(255, 208, 50);
  rect(bucket.x, bucket.y, bucket.w, bucket.h);

  if (keyIsDown(LEFT_ARROW) && bucket.x > 0) bucket.x -= bucket.speed;
  if (keyIsDown(RIGHT_ARROW) && bucket.x < width - bucket.w) bucket.x += bucket.speed;

  if (frameCount % 30 === 0) fallingApples.push({ x: random(width / 4, (3 * width) / 4), y: 0, size: 20, speed: random(2, 5) });

  for (let i = fallingApples.length - 1; i >= 0; i--) {
    let obj = fallingApples[i];
    fill(255, 18, 73);
    ellipse(obj.x, obj.y, obj.size);
    obj.y += obj.speed;

    if (obj.y + obj.size / 2 > bucket.y && obj.x > bucket.x && obj.x < bucket.x + bucket.w) {
      score += 1;
      fallingApples.splice(i, 1);
    } else if (obj.y > height) {
      gameOver = true;
    }
  }

  fill(255);
  textSize(24);
  text('Score: ' + score, 25, 50);
}

function keyPressed() {
  if ((key === 'r' || key === 'R') && gameOver) {
    gameOver = false;
    score = 0;
    fallingApples = [];
    bucket.x = width / 2;
  }
}
