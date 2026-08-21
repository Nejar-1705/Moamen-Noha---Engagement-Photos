// 🎵 تشغيل الصوت مع أول لمسة أو ضغطة على الشاشة
const playAudio = () => {
  const music = document.getElementById('bg-music');
  if (music) {
    music.play().then(() => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    }).catch((error) => {
      console.log("Audio play error:", error);
    });
  }
};

document.addEventListener('click', playAudio);
document.addEventListener('touchstart', playAudio);

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  const p1 = document.getElementById('photo1');
  const p2 = document.getElementById('photo2');
  const p3 = document.getElementById('photo3');
  const p4 = document.getElementById('photo4');
  const card = document.getElementById('central-card');
  const names = document.getElementById('glitter-names');
  const details = document.getElementById('card-details');

  // 1. اختفاء شاشة الترحيب بعد 3 ثواني (تم زيادة ثانية)
  setTimeout(() => {
    splash.style.opacity = '0';
    setTimeout(() => splash.style.display = 'none', 1000);

    // 2. عرض الصور كبيرة في منتصف الشاشة
    setTimeout(() => { p1.classList.add('show-element'); }, 200);

    setTimeout(() => {
      p1.style.opacity = '0';
      p2.classList.add('show-element');
    }, 1300);

    setTimeout(() => {
      p2.style.opacity = '0';
      p3.classList.add('show-element');
    }, 2400);

    setTimeout(() => {
      p3.style.opacity = '0';
      p4.classList.add('show-element');
    }, 3500);

    // 3. انكماش الصور وانتقالهم للأركان معاً
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
    }, 5000);

    // 4. ظهور كارت الدعوة الرئيسي في النص
    setTimeout(() => {
      card.classList.add('show-element');
    }, 6000);

    // 5. ظهور الأسماء بالجليتر
    setTimeout(() => {
      names.classList.add('show-element');
    }, 7000);

    // 6. ظهور باقي التفاصيل والعداد
    setTimeout(() => {
      details.classList.add('show-element');
    }, 8000);

  }, 3000); // ⏱️ زيادة التوقيت لـ 3000ms
});

// العداد التنازلي
const targetDate = new Date("August 21, 2026 20:00:00").getTime();
setInterval(() => {
  const diff = targetDate - new Date().getTime();
  if (diff > 0) {
    document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
  }
}, 1000);


// 📷 Upload Photos
const uploadInput = document.getElementById("photo-upload");
const uploadStatus = document.getElementById("upload-status");

const uploadURL =
  "https://script.google.com/macros/s/AKfycbyvITMVbjTLtDvbtoZtckuwLJkHNkKlCMWecRCbfWFQmiuVnOB_FYI-DyKItLKScm39MA/exec";

uploadInput.addEventListener("change", async function () {

  const files = Array.from(this.files);

  if (!files.length) return;

  uploadStatus.innerText = `Uploading ${files.length} photo${files.length > 1 ? "s" : ""}...`;

  let uploaded = 0;

  for (const file of files) {

    try {

      const base64 = await fileToBase64(file);

      const response = await fetch(uploadURL, {
        method: "POST",
        body: JSON.stringify({
          file: base64,
          type: file.type,
          name: file.name
        })
      });

      uploaded++;

      uploadStatus.innerText =
        `Uploading... ${uploaded} / ${files.length}`;

    } catch (error) {

      console.error("Upload error:", error);

    }
  }

  if (uploaded === files.length) {
    uploadStatus.innerText = "❤️ Photos uploaded successfully!";
  } else {
    uploadStatus.innerText =
      `❤️ ${uploaded} of ${files.length} photos uploaded.`;
  }

  // يسمح باختيار نفس الصورة مرة تانية
  this.value = "";
});


// تحويل الصورة إلى Base64
function fileToBase64(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => {

      // بنشيل الـ data:image/...;base64, من البداية
      const base64 = reader.result.split(",")[1];

      resolve(base64);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}
