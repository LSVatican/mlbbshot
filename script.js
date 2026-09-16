document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const mainPage = document.getElementById('main-page');
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.getElementById('progress-bar');
  const percentageText = document.getElementById('percentage-text');
  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('my-video');

  // 1. Blokir Tindakan Bawaan Browser pada Video (Klik kanan & kontrol default)
  video.addEventListener('contextmenu', (e) => e.preventDefault());
  video.removeAttribute('controls'); // Memastikan kontrol default browser mati

  // 2. Fungsi Memulai Proses
  startBtn.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    startLoading();
  });

  // 3. Sistem Loading Bar (Jeda / Increment setiap 500ms)
  function startLoading() {
    let progress = 0;
    
    const interval = setInterval(() => {
      // Penambahan persen secara acak/bertahap per 500ms
      progress += Math.floor(Math.random() * 15) + 10; 

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Update UI terakhir
        progressBar.style.width = `${progress}%`;
        percentageText.innerText = `${progress}%`;

        // Setelah loading selesai, masuk ke pemutaran video
        setTimeout(playVideoFullscreen, 500);
      } else {
        progressBar.style.width = `${progress}%`;
        percentageText.innerText = `${progress}%`;
      }
    }, 500); // Jedanya diset 500 milidetik
  }

  // 4. Memutar Video Fullscreen Otomatis
  function playVideoFullscreen() {
    loadingScreen.classList.add('hidden');
    videoContainer.classList.remove('hidden');

    // Request Fullscreen Browser (opsional untuk pengalaman penuh)
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen().catch(() => {});
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen().catch(() => {});
    }

    video.play();
  }

  // 5. Otomatis Kembali ke Halaman Utama Setelah Durasi Video Habis
  video.addEventListener('ended', () => {
    // Keluar dari Fullscreen jika aktif
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    // Reset dan kembali ke tampilan awal
    video.pause();
    video.currentTime = 0;
    videoContainer.classList.add('hidden');
    mainPage.classList.remove('hidden');
  });
});
