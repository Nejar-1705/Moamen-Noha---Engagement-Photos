const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvITMVbjTLtDvbtoZtckuwLJkHNkKlCMWecRCbfWFQmiuVnOB_FYI-DyKItLKScm39MA/exec";

// 1. شاشة الترحيب تقتفي تلقائياً بعد 1.5 ثانية وبيظهر الموقع بـ Fade In
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    const main = document.getElementById('main-content');

    splash.style.opacity = '0';
    splash.style.visibility = 'hidden';

    setTimeout(() => {
      splash.classList.add('hidden');
      main.classList.remove('hidden');
      setTimeout(() => {
        main.classList.add('fade-in');
      }, 50);
    }, 1000);
  }, 1500);
});

// 2. العداد التنازلي ليوم 21 أغسطس 2026
const targetDate = new Date("August 21, 2026 00:00:00").getTime();

const countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
  } else {
    clearInterval(countdownInterval);
    document.getElementById("countdown-wrapper").classList.add("hidden");
    document.getElementById("upload-section").classList.remove("hidden");
  }
}, 1000);

// 3. كود رفع الصور (حد أقصى 50 صورة)
async function handleFileUpload(fileList) {
  let files = Array.from(fileList);
  const statusText = document.getElementById("upload-status");

  if (files.length === 0) return;

  if (files.length > 50) {
    alert("Maximum 50 photos allowed per upload. Uploading the first 50.");
    files = files.slice(0, 50);
  }

  statusText.innerText = `Preparing ${files.length} photo(s)... ⏳`;

  let uploadedCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    try {
      const base64Data = await convertBase64(file);

      const payload = {
        filename: file.name,
        mimeType: file.type,
        file: base64Data.split(',')[1]
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      uploadedCount++;
      statusText.innerText = `Uploaded ${uploadedCount} of ${files.length}... 📤`;
    } catch (error) {
      console.error("Upload error:", error);
    }
  }

  statusText.innerText = "🎉 All photos uploaded successfully!";
}

function convertBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
}
