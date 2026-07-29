/* ---------- special puzzle: 4-digit code lock ---------- */
(function(){
  const ANSWER = "3007"; // 30 July — Ainaa Sarah's birthday
  const digits = [0,0,0,0];
  const digitEls = document.querySelectorAll('#codeLock .digit');
  const openBtn = document.getElementById('openPuzzleBtn');
  const overlay = document.getElementById('puzzleOverlay');
  const closeBtn = document.getElementById('puzzleClose');
  const submit = document.getElementById('puzzleSubmit');
  const msg = document.getElementById('puzzleMsg');
  const reveal = document.getElementById('puzzleReveal');

  function render(){ digitEls.forEach((el,i)=> el.textContent = digits[i]); }
  render();

  document.querySelectorAll('.lock-btn').forEach(b=>{
    b.addEventListener('click', ()=>{
      const i = +b.dataset.i;
      const dir = b.dataset.act === 'up' ? 1 : -1;
      digits[i] = (digits[i] + dir + 10) % 10;
      render();
      const el = digitEls[i];
      el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
      msg.textContent = ' ';
    });
  });

  function open(){ overlay.classList.add('open'); }
  function close(){ overlay.classList.remove('open'); }
  openBtn && openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e)=>{ if(e.target===overlay) close(); });

  submit.addEventListener('click', ()=>{
    const guess = digits.join('');
    if(guess === ANSWER){
      msg.textContent = '';
      reveal.classList.add('show');
      document.querySelector('.code-lock').classList.add('unlocked');
      if(typeof burstConfetti === 'function'){
        const r = submit.getBoundingClientRect();
        burstConfetti(r.left + r.width/2, r.top);
        setTimeout(()=> burstConfetti(window.innerWidth/2, window.innerHeight/3), 250);
      }
    } else {
      msg.textContent = 'not quite... try again 💭';
      msg.classList.remove('shake'); void msg.offsetWidth; msg.classList.add('shake');
    }
  });
})();
