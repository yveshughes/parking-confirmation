let qrCode;
let startTime;
let animationProgress = 0;
let checkmarkScale = 1; // Starting scale of the checkmark
let endTime; // Time when the animation ends
let showTimer = false; // Flag to show the timer
let animationStage = 0; // Tracks the stage of the animation

let customFont;

function preload() {
  qrCode = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png');
  
  customFont = loadFont('https://yveshughes.com/Oswald/Oswald-VariableFont_wght.ttf'); 
}


function setup() {
  createCanvas(390, 844);
  startTime = millis();
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  let elapsedTime = millis() - startTime;

  background('#6366f1');

  if (elapsedTime < 3000) { // Display QR code for first 3 seconds
    image(qrCode, (width - 300) / 2, (height - 300) / 2, 300, 300);
  } else if (animationStage === 0) {
    animationProgress += 10; // Increase this to speed up the circle animation
    if (animationProgress >= 360) {
      animationStage = 1; // Move to next stage
      endTime = millis(); // Mark end of animation
      showTimer = true;
    }
  }

  if (animationStage >= 1) {
    drawAnimatedCircle(360); // Draw full circle
    animateCheckmark();
  }

  if (showTimer) {
    displayElapsedTime();
  }
}

// Ensure the function is correctly defined
function drawAnimatedCircle(progress) {
  noFill();
  stroke(255);
  strokeWeight(4);
  arc(width / 2, height / 2, 200, 200, radians(-90), radians(-90 + progress));
}

function animateCheckmark() {
  // Implementation of the checkmark animation, you can adjust it based on your needs
  strokeWeight(6);
  line(width / 2 - 50, height / 2, width / 2 - 10, height / 2 + 40);
  line(width / 2 - 10, height / 2 + 40, width / 2 + 60, height / 2 - 30);
}

function displayElapsedTime() {
  let elapsedSinceEnd = millis() - endTime; // Milliseconds since animation ended
  let seconds = floor(elapsedSinceEnd / 1000);
  let minutes = floor(seconds / 60);
  let hours = floor(minutes / 60);
  let days = floor(hours / 24);

  seconds = seconds % 60; // Remaining seconds
  minutes = minutes % 60; // Remaining minutes
  hours = hours % 24; // Remaining hours

  // Format the time string
  let timeStr = nf(days, 2) + ":" + nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2);
  if (days === 0) {
    timeStr = nf(hours, 2) + ":" + nf(minutes, 2) + ":" + nf(seconds, 2); // Hide days if not applicable
  }
  
  fill(255);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textFont(customFont, 24); // Set the custom font and size, adjust as necessary
  text("Elapsed time:", width / 2, height - 50); // Adjust Y position based on your layout
  text(timeStr, width / 2, height - 10); // Position this text at the bottom
}
