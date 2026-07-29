/* ---------- typewriter ---------- */
const typeTarget = document.getElementById('typeTarget');
const fullText = typeTarget.dataset.full;
let typed = false;
const typeObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !typed){
      typed = true; let i=0; typeTarget.textContent='';
      const iv = setInterval(()=>{
        typeTarget.textContent += fullText[i]; i++;
        if(i>=fullText.length) clearInterval(iv);
      }, 18);
    }
  });
}, {threshold:.4});
typeObs.observe(document.getElementById('p7'));
