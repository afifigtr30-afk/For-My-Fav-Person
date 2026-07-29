/* ---------- open when notes ---------- */
document.querySelectorAll('.ow-card').forEach(card=>{
  card.addEventListener('click', ()=> card.classList.toggle('open'));
});
