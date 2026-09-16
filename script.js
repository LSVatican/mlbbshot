document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');
  const mainPage = document.getElementById('main-page');
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.getElementById('progress-bar');
  const percentageText = document.getElementById('percentage-text');
  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('my-video');

  // 1. Blokir Menu Klik Kanan & Kontrol Bawaan
  video.addEventListener('contextmenu', (e) => e.preventDefault());
  video.removeAttribute('controls');

  // 2. BLOKIR MEDIA SESSION (Notifikasi / Panel Pemutar Bawaan Browser)
  if ('mediaSession' in navigator) {
    // Kosongkan Metadata agar tidak menampilkan judul/gambar di notifikasi
    navigator.mediaSession.metadata = null;

    // Matikan/Timpa semua action handler bawaan browser
    const actionHandlers = [
      'play',
      'pause',
      'seekbackward',
      'seekforward',
      'previoustrack',
      'nexttrack',
      'stop',
      'seekto'
    ];

    actionHandlers.forEach(action => {
      try {
        navigator.mediaSession.setActionHandler(action, null);
      } catch (e) {
        // Mengabaikan jika ada aksi yang tidak didukung oleh browser tertentu
      }
    });
  }

  // 3. Fungsi Memulai Proses
  startBtn.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    startLoading();
  });

  // 4. Sistem Loading Bar
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

  // 5. Memutar Video Fullscreen
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

  // 6. Otomatis Kembali ke Halaman Utama Setelah Video Selesai
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
