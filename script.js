const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvITMVbjTLtDvbtoZtckuwLJkHNkKlCMWecRCbfWFQmiuVnOB_FYI-DyKItLKScm39MA/exec";

// الترحيب التلقائي
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            document.getElementById('main-content').classList.add('visible');
        }, 1000);
    }, 1500); // 1.5 ثانية
});

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
    } else {
        document.getElementById("countdown-wrapper").style.display = "none";
        document.getElementById("upload-section").style.display = "block";
    }
}, 1000);

// الرفع
async function handleFileUpload(fileList) {
    let files = Array.from(fileList).slice(0, 50);
    const statusText = document.getElementById("upload-status");
    statusText.innerText = "Uploading...";
    
    for (let file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST", mode: "no-cors",
                body: JSON.stringify({ filename: file.name, file: reader.result.split(',')[1] })
            });
        };
    }
    statusText.innerText = "Done!";
}
