window.addEventListener('DOMContentLoaded', () => {
  // 1. اختفاء شاشة الترحيب
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    const main = document.getElementById('main-content');

    splash.style.opacity = '0';

    setTimeout(() => {
      splash.classList.add('hidden');
      main.classList.remove('hidden');
      setTimeout(() => main.classList.add('fade-in'), 50);

      // 2. ظهور الصور بالتتابع والتوقيت المطلوب
      // Photo 1 (تستمر ثانية)
      setTimeout(() => {
        document.getElementById('p1').classList.add('show');
      }, 300);

      // Photo 2 (بعد ثانية)
      setTimeout(() => {
        document.getElementById('p2').classList.add('show');
      }, 1300);

      // Photo 3 (بعد ثانية)
      setTimeout(() => {
        document.getElementById('p3').classList.add('show');
      }, 2300);

      // Photo 4 (تقعد ثانية ونص)
      setTimeout(() => {
        document.getElementById('p4').classList.add('show');
      }, 3300);

    }, 1000);
  }, 1500);
});

// العداد التنازلي
const targetDate = new Date("August 21, 2026 00:00:00").getTime();
setInterval(() => {
  const diff = targetDate - new Date().getTime();
  if (diff > 0) {
    document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
  }
}, 1000);
