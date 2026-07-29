/* ---------- lightbox gallery ---------- */
const triggers = document.querySelectorAll('.lb-trigger');
const lightbox = document.getElementById('lightbox');
const lbFrame = document.getElementById('lbFrame');
let lbIndex = 0;
const lbLabels = ['gambar #1 (besar)','gambar #2 (besar)','gambar #3 (besar)'];
function openLb(i){ lbIndex = i; lbFrame.textContent = lbLabels[i]; lightbox.classList.add('open'); }
triggers.forEach(t=> t.addEventListener('click', ()=> openLb(parseInt(t.dataset.idx))));
document.getElementById('lbClose').addEventListener('click', ()=> lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.classList.remove('open'); });
document.getElementById('lbPrev').addEventListener('click', ()=> openLb((lbIndex-1+lbLabels.length)%lbLabels.length));
document.getElementById('lbNext').addEventListener('click', ()=> openLb((lbIndex+1)%lbLabels.length));
