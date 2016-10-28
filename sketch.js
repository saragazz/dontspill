// 27-10-2016
// Project 3
// Don't Spill a balancing game by Shreeya Tyagi & Sara Gazzaz

var beta;
var gamma;
var apha;
var v=300;            // total volume of water in container
var xspacing=6;       // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude =10.0;  // Height of wave
var period = 500.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;          // Using an array to store height values for the wave
var change=1;
var y=1;
var scalval;
var x=250;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Preload
function preload() {
mySound = loadSound('Splash.mp3');
mySound2 = loadSound('Refill.mp3');
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Setup
function setup() {
  createCanvas(windowWidth,windowHeight);
  scalval=(windowWidth/1000);
  w =width+700;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));
  img1=loadImage('Soil.png');
  img2=loadImage('LOGO.png');
  img3=loadImage('droplet.png');
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Draw
function draw() {
  //background(0,100,200);
  scale(scalval,scalval);
  image(img1,0,0);
  image(img2,650,15);
  
  if (y>=1 && y<=60) {
    for (var shift=50; shift<=250;shift=shift+50){
      image(img3,x+shift,60);}}
  if (y>=60 && y<=120) {
    for (var shift=50; shift<=200;shift=shift+50){
      image(img3,x+shift,60);}}
  if (y>=120 && y<=180) {
    for (var shift=50; shift<=150;shift=shift+50){
      image(img3,x+shift,60);}}
  if (y>=180 && y<=240) {
    for (var shift=50; shift<=100;shift=shift+50){
      image(img3,x+shift,60);}}
  if (y>=240 && y<=300) {
    for (var shift=50; shift<=50;shift=shift+50){
      image(img3,x+shift,60);}}


  // Gyroscope Data
  window.addEventListener('deviceorientation', function(e) 
{
  apha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;
});

//println(apha);//0 to 180 deg along nose (+ve above table) (-ve under the table)
//println(beta);//y axis 0 to 90 deg sideways (anti clockwise +ve value above table) (clockwise -ve value above table)
//println(gamma);//flat rotation around table top  from 0 to 360 (no negative value)
  
  push();
  translate(width/2,200);
  rotate(radians(beta));
  renderWave();
  calcWave();
  renderWave();
  calcWave2();
  renderWave2();
  pop();

  if (beta<=-2 && beta>=-4) {
  mySound.setVolume(0.07);
  mySound.play();
  change=change+.1;
  y=y+change;
  if (y>=300) {y=1;mySound2.setVolume(0.2);
  mySound2.play();}
}
  
  if (beta>=2 && beta<=4) { 
  mySound.setVolume(0.07);
  mySound.play();
  change=change+.1;
  y=y+change;
  if (y>=300) {y=1;mySound2.setVolume(0.2);
  mySound2.play();}
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Return wave to normal position

function mousePressed() {y=1}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Wave
function calcWave() {
  // Increment theta (try different values for 
  // 'angular velocity' here
  theta += 0.1;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude*beta;
    x+=dx;
  }
}

function renderWave() {
  noStroke();
  fill(0,150,255,50);
  // A simple way to draw the wave with an ellipse at each location
  for (var x =0; x< yvalues.length; x++) {
    ellipse(x*xspacing-1000, y+ 50+yvalues[x], 5, 50);
    ellipse(x*xspacing-1000, y+ 50+yvalues[x], 5, 50);
    ellipse(x*xspacing-1000, y+ 70+yvalues[x], 5, 60);
    ellipse(x*xspacing-1000, y+ 40+yvalues[x], 5, 70);
    ellipse(x*xspacing-1000, y+ 50+yvalues[x], 5, 70);
    ellipse(x*xspacing-1000, y+ 60+yvalues[x], 5, 90);
    ellipse(x*xspacing-1000, y+ 80+yvalues[x], 5, 100);
  }
}

function calcWave2() {
  // Increment theta (try different values for 
  // 'angular velocity' here
  theta += 0.05;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (var i = 0; i < yvalues.length; i=i+2) {
    yvalues[i] = sin(x)*amplitude*beta/5;
    x+=dx;
  }
}

function renderWave2() {
  noStroke();
  fill(0,150,255,70);
  // A simple way to draw the wave with an ellipse at each location
  for (var x =0; x< yvalues.length; x++) {
    ellipse(x*xspacing-1000, y+ 70+yvalues[x], 5, 30);
    ellipse(x*xspacing-1000, y+ 70+yvalues[x], 5, 50);
    ellipse(x*xspacing-1000, y+100+yvalues[x], 5, 60);
    ellipse(x*xspacing-1000, y+120+yvalues[x], 5, 70);
    ellipse(x*xspacing-1000, y+140+yvalues[x], 5, 100);
    ellipse(x*xspacing-1000, y+180+yvalues[x], 5, 250);
    ellipse(x*xspacing-1000, y+360+yvalues[x], 5, 155);
  }
}


