/* ---------- voice note ---------- */
const voiceNote = document.getElementById('voiceNote');
const voiceBtn = document.getElementById('voiceBtn');
const voiceCard = document.getElementById('voiceCard');
voiceBtn.addEventListener('click', ()=>{
  if(voiceNote.paused){ voiceNote.play().catch(()=>{}); voiceBtn.textContent='❚❚'; voiceCard.classList.add('playing'); }
  else{ voiceNote.pause(); voiceBtn.textContent='▶'; voiceCard.classList.remove('playing'); }
});
voiceNote.addEventListener('ended', ()=>{ voiceBtn.textContent='▶'; voiceCard.classList.remove('playing'); });
