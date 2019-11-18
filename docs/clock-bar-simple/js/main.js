let clock, font;

function preload() {
  font = loadFont('./fonts/RobotoMono-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  clock = new DigitalClock({ boundingBox: { x: width / 2, y: height / 2, w: width, h: height }, timeZone: -1 });
}

function draw() {
  background(0);

  update();
  display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  const s = Math.min(width, height);
  clock = new DigitalClock({ boundingBox: { x: width / 2, y: height / 2, w: width, h: height }, timeZone: -1 });
}


function update() {
  clock.update();
}

function display() {
  clock.display();
}

function DigitalClock({ boundingBox, timeZone }) {
  this.boundingBox = boundingBox;
  this.timeZone = timeZone;
  this.myDate = new Date();

  this.update = () => {
    this.myDate = new Date();
    const timeZoneDifference = this.myDate.getTimezoneOffset() / 60 + (this.timeZone * -1);
    this.myDate.setHours(this.myDate.getHours() + timeZoneDifference);
  }

  this.display = () => {
    angleMode(DEGREES);

    push();
    translate(this.boundingBox.x - this.boundingBox.w / 2, this.boundingBox.y - this.boundingBox.h / 2);
    strokeWeight(2);
    fill(255);
    let x = y = w = h = n = 0;
    h = this.boundingBox.h / 4;
    w = this.boundingBox.w;

    generateTimeBar(x, y, w, h, 24, this.myDate.getHours(), color(255, 0, 0));
    x = 0;
    y += h;
    generateTimeBar(x, y, w, h, 60, this.myDate.getMinutes(), color(0, 255, 0));
    x = 0;
    y += h;
    generateTimeBar(x, y, w, h, 60, this.myDate.getSeconds(), color(0, 0, 255));
    x = 0;
    y += h;
    generateTimeBar(x, y, w, h, 1000, this.myDate.getMilliseconds(), color(255, 255, 0));
    pop();
  }

  function generateTimeBar(x, y, w, h, n, time, color = color(255)) {
    for (let t = 0; t < n; t++) {
      fill(( t < time) ? color : 0);
      stroke(( t < time) ? 0 : color);
      rect(x, y, w / n, h);
      x += w / n;
    }
  }
}