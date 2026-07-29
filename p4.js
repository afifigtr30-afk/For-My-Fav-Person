/* ---------- guestbook carousel ---------- */
const carousel = document.getElementById('carousel');
document.getElementById('carLeft').addEventListener('click', ()=> carousel.scrollBy({left:-300, behavior:'smooth'}));
document.getElementById('carRight').addEventListener('click', ()=> carousel.scrollBy({left:300, behavior:'smooth'}));
