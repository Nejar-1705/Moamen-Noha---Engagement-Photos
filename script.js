// إخفاء شاشة الترحيب بعد 2 ثانية
window.onload = function() {
    setTimeout(function() {
        const splash = document.getElementById('splash-screen');
        splash.style.transition = 'opacity 1s ease';
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 1000);
    }, 2000);
};

// العداد التنازلي
const targetDate = new Date("August 21, 2026 00:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff > 0) {
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}, 1000);
