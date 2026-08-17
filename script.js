window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  const p1 = document.getElementById('photo1');
  const p2 = document.getElementById('photo2');
  const p3 = document.getElementById('photo3');
  const p4 = document.getElementById('photo4');
  const card = document.getElementById('central-card');
  const names = document.getElementById('glitter-names');
  const details = document.getElementById('card-details');

  // 1. اختفاء شاشة الترحيب بعد 2 ثانية
  setTimeout(() => {
    splash.style.opacity = '0';
    setTimeout(() => splash.style.display = 'none', 1000);

    // 2. ظهور الصور في منتصف الشاشة بالتتابع (ثانية لكل صورة ما عدا الأخيرة ثانية ونصف)
    setTimeout(() => { p1.classList.add('show-element'); }, 200);

    setTimeout(() => {
      p1.style.opacity = '0';
      p2.classList.add('show-element');
    }, 1200);

    setTimeout(() => {
      p2.style.opacity = '0';
      p3.classList.add('show-element');
    }, 2200);

    setTimeout(() => {
      p3.style.opacity = '0';
      p4.classList.add('show-element');
    }, 3200);

    // 3. تحرك جميع الصور لأماكنها في الأركان مع ظهورهم معاً
    setTimeout(() => {
      p1.style.opacity = '1';
      p2.style.opacity = '1';
      p3.style.opacity = '1';

      p1.classList.remove('center-stage');
      p2.classList.remove('center-stage');
      p3.classList.remove('center-stage');
      p4.classList.remove('center-stage');

      p1.classList.add('pos-bottom-left-1');
      p2.classList.add('pos-bottom-left-2');
      p3.classList.add('pos-top-right-1');
      p4.classList.add('pos-top-right-2');
    }, 4700);

    // 4. ظهور الكارت الخلفية في المنتصف
    setTimeout(() => {
      card.classList.add('show-element');
    }, 5600);

    // 5. ظهور الاسم بـ Fade In وتأثير الجليتر الأسود
    setTimeout(() => {
      names.classList.add('show-element');
    }, 6600);

    // 6. ظهور باقي التفاصيل والعداد
    setTimeout(() => {
      details.classList.add('show-element');
    }, 7600);

  }, 2000);
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
