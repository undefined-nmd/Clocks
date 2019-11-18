let clock, font;

function preload() {
  font = loadFont('./fonts/RobotoMono-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  const s = Math.min(width, height);
  clock = new DigitalClock({ boundingBox: { x: width / 2, y: height / 2, w: s, h: s }, timeZone: -1 });
}

function draw() {
  background(0);

  update();
  display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  const s = Math.min(width, height);
  clock = new DigitalClock({ boundingBox: { x: width / 2, y: height / 2, w: s, h: s }, timeZone: -1 });
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
    const word = toDigits(this.myDate.getHours(), 2) + ':' + toDigits(this.myDate.getMinutes(), 2) + ':' + toDigits(this.myDate.getSeconds(), 2);

    angleMode(DEGREES);
    textFont(font);
    textAlign(CENTER);

    let ts = 16, w = 0, h = 0;
    
    do {
      ts++;
      textSize(ts);
      w = textWidth(word);
    } while (w < width / 2);

    fill(255);
    text(word, this.boundingBox.x, this.boundingBox.y);
  }

  function toDigits(part, n) {
    part = String(part);
    console.log(part.length);
    while (part.length < n) {
      part = '0' + part;
    }
    return part;
  }
}