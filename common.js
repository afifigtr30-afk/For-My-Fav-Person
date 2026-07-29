/* ---------- loading screen (hanya wujud di index.html) ---------- */
window.addEventListener('load', ()=>{
  const ls = document.getElementById('loadingScreen');
  if(ls) setTimeout(()=> ls.classList.add('hidden'), 900);
});

/* ---------- envelope intro (hanya wujud di index.html) ---------- */
const envOverlay = document.getElementById('envelopeOverlay');
const bgMusic = document.getElementById('bgMusic');
const envClick = document.getElementById('envelopeClick');
if(envClick){
  envClick.addEventListener('click', ()=>{
    envOverlay.classList.add('opened');
    burstConfetti(window.innerWidth/2, window.innerHeight/2);
    setTimeout(()=>{
      envOverlay.classList.add('hidden');
      bgMusic.play().catch(()=>{});
      document.getElementById('musicToggle').classList.add('playing');
    }, 900);
  });
}

/* ---------- music toggle (setiap fail ada butang sendiri; lagu akan mula semula bila tukar fail) ---------- */
const musicBtn = document.getElementById('musicToggle');
musicBtn.addEventListener('click', ()=>{
  if(bgMusic.paused){ bgMusic.play().catch(()=>{}); musicBtn.classList.add('playing'); }
  else{ bgMusic.pause(); musicBtn.classList.remove('playing'); }
});

/* ---------- confetti ---------- */
const canvas = document.getElementById('confettiCanvas');
let particles = [];
const confColors = ['#B23A5E','#F2A6BE','#E88CA8','#FFFFFF','#F7C9D8'];
function burstConfetti(x,y){
  if(!canvas) return;
  for(let i=0;i<60;i++){
    particles.push({ x, y, r: Math.random()*5+3, vx:(Math.random()-.5)*10, vy:(Math.random()-1.6)*10,
      color: confColors[Math.floor(Math.random()*confColors.length)], life:100, rot:Math.random()*360 });
  }
}
if(canvas){
  const ctx = canvas.getContext('2d');
  function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas(); window.addEventListener('resize', resizeCanvas);
  function animateConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.vy += 0.25; p.x += p.vx; p.y += p.vy; p.life -= 1.4; p.rot += 6;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(p.life/100,0);
      ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6); ctx.restore();
    });
    particles = particles.filter(p=>p.life>0 && p.y < canvas.height+50);
    requestAnimationFrame(animateConfetti);
  }
  animateConfetti();
}
const heroTitle = document.getElementById('heroTitle');
if(heroTitle) heroTitle.addEventListener('click', (e)=> burstConfetti(e.clientX, e.clientY));

/* ---------- scroll reveal ---------- */
const items = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); }); }, {threshold:.2});
items.forEach(i=>revealObs.observe(i));

/* ---------- parallax hearts ---------- */
const heartsBg = document.getElementById('heartsBg');
window.addEventListener('scroll', ()=>{ if(heartsBg) heartsBg.style.transform = `translateY(${window.scrollY * 0.15}px)`; });

/* ---------- anak panah kiri/kanan untuk pi next/prev fail ---------- */
document.addEventListener('keydown', (e)=>{
  const nextLink = document.getElementById('nextPageLink');
  const prevLink = document.getElementById('prevPageLink');
  if(e.key === 'ArrowRight' && nextLink && !nextLink.classList.contains('disabled')) window.location.href = nextLink.getAttribute('href');
  if(e.key === 'ArrowLeft' && prevLink && !prevLink.classList.contains('disabled')) window.location.href = prevLink.getAttribute('href');
});
