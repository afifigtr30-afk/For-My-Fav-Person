/* ---------- spin the wheel ---------- */
const wheelIdeas = ['Movie date 🎬','Dinner date 🍝','Picnic date 🧺','Cafe hop ☕','Beach day 🏖️','Staycation 🏨','Karaoke night 🎤','Arcade date 🎮'];
const wheelColors = ['#B23A5E','#E88CA8','#8A2846','#F2A6BE','#7A2140','#F7C9D8','#9C2E52','#F0B7CB'];
const wheelCanvas = document.getElementById('wheelCanvas');
const wctx = wheelCanvas.getContext('2d');
const wheelResult = document.getElementById('wheelResult');
const spinBtn = document.getElementById('spinBtn');
const wheelCx = wheelCanvas.width/2, wheelCy = wheelCanvas.height/2, wheelR = wheelCanvas.width/2 - 4;
const segAngle = (Math.PI*2) / wheelIdeas.length;
let wheelRotation = 0;
let spinning = false;

function drawWheel(){
  wctx.clearRect(0,0,wheelCanvas.width,wheelCanvas.height);
  wheelIdeas.forEach((label, i)=>{
    const start = i*segAngle - Math.PI/2;
    const end = start + segAngle;
    wctx.beginPath();
    wctx.moveTo(wheelCx, wheelCy);
    wctx.arc(wheelCx, wheelCy, wheelR, start, end);
    wctx.closePath();
    wctx.fillStyle = wheelColors[i % wheelColors.length];
    wctx.fill();
    wctx.save();
    wctx.translate(wheelCx, wheelCy);
    wctx.rotate(start + segAngle/2);
    wctx.textAlign = 'right';
    wctx.fillStyle = '#FFF6F8';
    wctx.font = "600 12px 'Outfit', sans-serif";
    wctx.fillText(label, wheelR - 14, 4);
    wctx.restore();
  });
}
drawWheel();

spinBtn.addEventListener('click', ()=>{
  if(spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  wheelResult.textContent = 'spinning...';

  const targetIndex = Math.floor(Math.random()*wheelIdeas.length);
  const segDeg = 360 / wheelIdeas.length;
  const centerDeg = targetIndex*segDeg + segDeg/2;
  const jitter = (Math.random()-0.5) * (segDeg*0.6);
  const desiredMod = (360 - centerDeg - jitter + 360) % 360;
  const currentMod = wheelRotation % 360;
  const deltaToDesired = (desiredMod - currentMod + 360) % 360;
  const extraSpins = 5 + Math.floor(Math.random()*2);
  wheelRotation += extraSpins*360 + deltaToDesired;

  wheelCanvas.style.transform = `rotate(${wheelRotation}deg)`;

  setTimeout(()=>{
    spinning = false;
    spinBtn.disabled = false;
    wheelResult.textContent = wheelIdeas[targetIndex] + " — let's go!";
  }, 4300);
});
