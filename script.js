document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const mainPage = document.getElementById('main-page');
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.getElementById('progress-bar');
  const percentageText = document.getElementById('percentage-text');
  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('my-video');

  // ============================================================
  // BLOKIR SISTEM PANEL PEMUTAR BAWAAN BROWSER
  // ============================================================
  video.removeAttribute('controls'); // Pastikan atribut controls dilepas
  video.controls = false;

  // Blokir menu klik kanan / press and hold di HP
  video.addEventListener('contextmenu', (e) => e.preventDefault());
  videoContainer.addEventListener('contextmenu', (e) => e.preventDefault());

  // Blokir tombol keyboard yang biasa mengontrol media browser (Spasi, K, F, M, dll)
  window.addEventListener('keydown', (e) => {
    if (!videoContainer.classList.contains('hidden')) {
      const blockedKeys = ['Space', 'KeyK', 'KeyF', 'KeyM', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
      if (blockedKeys.includes(e.code) || e.key === ' ') {
        e.preventDefault();
      }
    }
  });
  // ============================================================

  // Fungsi Memulai Proses saat tombol diklik
  startBtn.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    startLoading();
  });

  // Sistem Loading Bar (Interval 500ms)
  function startLoading() {
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10; 

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        progressBar.style.width = `${progress}%`;
        percentageText.innerText = `${progress}%`;

        setTimeout(playVideoFullscreen, 500);
      } else {
        progressBar.style.width = `${progress}%`;
        percentageText.innerText = `${progress}%`;
      }
    }, 500);
  }

  // Memutar Video Fullscreen Otomatis
  function playVideoFullscreen() {
    loadingScreen.classList.add('hidden');
    videoContainer.classList.remove('hidden');

    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen().catch(() => {});
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen().catch(() => {});
    }

    video.play();
  }

  // Otomatis Kembali ke Halaman Utama Setelah Durasi Video Habis
  video.addEventListener('ended', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    video.pause();
    video.currentTime = 0;
    videoContainer.classList.add('hidden');
    mainPage.classList.remove('hidden');
  });
});
