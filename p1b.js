/* ---------- countdown ---------- */
const togetherSince = new Date('2024-10-16T00:00:00'); // 16 October 2024 — when we became us
function updateCountdown(){
  const now = new Date();
  let diff = Math.max(0, now - togetherSince);
  const days = Math.floor(diff/86400000); diff -= days*86400000;
  const hours = Math.floor(diff/3600000); diff -= hours*3600000;
  const mins = Math.floor(diff/60000); diff -= mins*60000;
  const secs = Math.floor(diff/1000);
  document.getElementById('cdDays').textContent = days;
  document.getElementById('cdHours').textContent = hours;
  document.getElementById('cdMins').textContent = mins;
  document.getElementById('cdSecs').textContent = secs;
}
updateCountdown(); setInterval(updateCountdown, 1000);
