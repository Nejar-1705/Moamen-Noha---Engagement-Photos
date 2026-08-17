window.onload = () => {
    // 1. اختفاء الترحيب
    setTimeout(() => { document.getElementById('splash-screen').style.opacity = '0'; }, 1500);

    // 2. ظهور الصور (بعد 2 ثانية)
    setTimeout(() => {
        document.querySelectorAll('.photo-container').forEach(el => el.style.opacity = '1');
    }, 2000);

    // 3. ظهور الكارد الخلفية (بعد 3.5 ثانية)
    setTimeout(() => {
        const card = document.getElementById('central-card');
        card.classList.remove('hidden');
    }, 3500);

    // 4. ظهور الأسماء (بعد 5 ثواني)
    setTimeout(() => {
        document.getElementById('names-glitter').classList.remove('hidden');
    }, 5000);

    // 5. ظهور باقي التفاصيل (بعد 6.5 ثانية)
    setTimeout(() => {
        document.getElementById('details').classList.remove('hidden');
    }, 6500);
};

// العداد
const targetDate = new Date("August 21, 2026 00:00:00").getTime();
setInterval(() => {
    const diff = targetDate - new Date().getTime();
    document.getElementById("days").innerText = Math.floor(diff / (1000*60*60*24));
    document.getElementById("hours").innerText = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    document.getElementById("mins").innerText = Math.floor((diff % (1000*60*60)) / (1000*60));
}, 1000);
