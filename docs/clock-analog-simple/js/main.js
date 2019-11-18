let clock, font;

function preload() {
  font = loadFont('./fonts/RobotoMono-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  const s = Math.min(width, height);
  clock = new AnalogClock({ boundingBox: { x: width / 2, y: height / 2, w: s, h: s }, timeZone: -1 });
}

function draw() {
  background(0);

  update();
  display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  const s = Math.min(width, height);
  clock = new AnalogClock({ boundingBox: { x: width / 2, y: height / 2, w: s, h: s }, timeZone: -1 });
}


function update() {
  clock.update();
}

function display() {
  clock.display();
}

function AnalogClock({ boundingBox, timeZone }) {
  this.boundingBox = boundingBox;
  this.timeZone = timeZone;
  this.myDate = new Date();

  this.update = () => {
    this.myDate = new Date();
    const timeZoneDifference = this.myDate.getTimezoneOffset() / 60 + (this.timeZone * -1);
    this.myDate.setHours(this.myDate.getHours() + timeZoneDifference);
  }

  this.display = () => {
    console.log(this.myDate);
    const secondsAngle = this.myDate.getSeconds()*6 - 90;
    const minutesAngle = this.myDate.getMinutes()*6 - 90;
    const hoursAngle = this.myDate.getHours()*30 - 90;

    angleMode(DEGREES);

    push();
    translate(this.boundingBox.x, this.boundingBox.y);
    strokeWeight(2);
    stroke(255);
    noFill();
    arc(0, 0, this.boundingBox.w, this.boundingBox.h, 0, 360);
    pop();

    push();
    translate(this.boundingBox.x, this.boundingBox.y);
    strokeWeight(2);
    stroke(255);
    for (let i = 0; i < 60; i++) {
      line(sin(i*6)*this.boundingBox.w/2, cos(i*6)*this.boundingBox.h/2, sin(i*6)*(this.boundingBox.w/2-10), cos(i*6)*(this.boundingBox.h/2-10));
    }
    pop();

    push();
    strokeWeight(4);
    translate(this.boundingBox.x, this.boundingBox.y);
    fill(255);
    for (let i = 0; i < 12; i++) {
      stroke(255);
      line(sin(i*30)*this.boundingBox.w/2, cos(i*30)*this.boundingBox.h/2, sin(i*30)*(this.boundingBox.w/2-20), cos(i*30)*(this.boundingBox.h/2-20));
      textAlign(CENTER, CENTER);
      noStroke();
      text((12 - i), sin(i*30 - 180)*(this.boundingBox.w/2-30), cos(i*30 - 180)*(this.boundingBox.h/2-30));
    }
    pop();

    push();
    translate(this.boundingBox.x, this.boundingBox.y);
    rotate(secondsAngle);
    strokeWeight(2);
    stroke(255);
    line(0, 0, this.boundingBox.h/2, 0);
    pop();

    push();
    translate(this.boundingBox.x, this.boundingBox.y);
    rotate(minutesAngle);
    strokeWeight(4);
    stroke(255);
    line(0, 0, this.boundingBox.h/3, 0);
    pop();

    push();
    translate(this.boundingBox.x, this.boundingBox.y);
    rotate(hoursAngle);
    strokeWeight(8);
    stroke(255);
    line(0, 0, this.boundingBox.h/4, 0);
    pop();

    push();
    translate(this.boundingBox.x, this.boundingBox.y);
    stroke(255);
    noFill();
    rect(-this.boundingBox.w/2, -this.boundingBox.h/2, this.boundingBox.w, this.boundingBox.h);
    pop();
  }
}