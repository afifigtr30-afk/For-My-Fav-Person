/* ---------- grand finale petals ---------- */
const petalCanvas = document.getElementById('petalCanvas');
const pctx = petalCanvas.getContext('2d');
const footerEl = document.getElementById('p10');
function sizePetalCanvas(){ petalCanvas.width = footerEl.offsetWidth; petalCanvas.height = footerEl.offsetHeight; }
sizePetalCanvas(); window.addEventListener('resize', sizePetalCanvas);
let petals = [];
const petalEmojis = ['🌸','🤍','💗','🌷'];
function spawnPetal(){
  petals.push({
    x: Math.random()*petalCanvas.width, y:-20, r: Math.random()*10+14,
    vy: Math.random()*0.8+0.6, vx: (Math.random()-.5)*0.6, rot: Math.random()*360, vrot:(Math.random()-.5)*2,
    emoji: petalEmojis[Math.floor(Math.random()*petalEmojis.length)]
  });
}
let petalActive = true;
function animatePetals(){
  pctx.clearRect(0,0,petalCanvas.width,petalCanvas.height);
  if(petalActive && Math.random()<0.06) spawnPetal();
  petals.forEach(p=>{
    p.y += p.vy; p.x += p.vx; p.rot += p.vrot;
    pctx.save(); pctx.translate(p.x,p.y); pctx.rotate(p.rot*Math.PI/180);
    pctx.font = p.r+'px sans-serif'; pctx.textAlign='center'; pctx.textBaseline='middle';
    pctx.fillText(p.emoji,0,0); pctx.restore();
  });
  petals = petals.filter(p=> p.y < petalCanvas.height+30);
  requestAnimationFrame(animatePetals);
}
animatePetals();
