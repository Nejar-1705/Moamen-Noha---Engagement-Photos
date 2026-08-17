// إخفاء الترحيب
window.onload = () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 1000);
    }, 2000);
};

// العداد
const targetDate = new Date("August 21, 2026 00:00:00").getTime();
setInterval(() => {
    const diff = targetDate - new Date().getTime();
    if(diff > 0) {
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    }
}, 1000);
