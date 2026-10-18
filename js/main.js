document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTS
  const loading = document.getElementById('loading');
  const pixelBar = document.getElementById('pixelBar');
  const loadingPercent = document.getElementById('loadingPercent');
  const main = document.getElementById('main');
  const lagu = document.getElementById('lagu');
  const slides = document.querySelectorAll('.slide');
  const doaSection = document.getElementById('doa');
  const pleaseKlik = document.getElementById('pleaseKlik');
  const questionPage = document.getElementById('question');
  const yaBtn = document.getElementById('ya');
  const tidakBtn = document.getElementById('tidak');
  const modal = document.getElementById('pixelModal');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const finalPage = document.getElementById('finalPage');
  const revealPhoto = document.getElementById('revealPhoto');
  
  // ELEMENTS FOTO LOADING & TOMBOL KEMBALI
  const photoFrame = document.getElementById('photoFrame');
  const backBtn = document.getElementById('backBtn');
  const pixelBarContainer = document.querySelector('.pixel-bar-container');
  const loadingText = document.querySelector('.loading-text');

  // ELEMENTS FOTO FINAL & TOMBOL KEMBALI FINAL
  const finalPhotoFrame = document.getElementById('finalPhotoFrame');
  const backBtnFinal = document.getElementById('backBtnFinal');
  const finalTitle = document.querySelector('.final-title');
  const videoContainer = document.getElementById('videoContainer');

  // ELEMENT POPUP ARAHAN
  const hintModal = document.getElementById('hintModal');

  // ELEMENTS VIDEO DI FINAL PAGE
  const playVideoBtn = document.getElementById('playVideoBtn');
  const specialVideo = document.getElementById('specialVideo');
  const backFromVideoBtn = document.getElementById('backFromVideoBtn');

  // ==========================================
  // 🎵 OTOMATIS PUTAR LAGU DARI LOADING PAGE (DIPERBAIKI UNTUK HP)
  // ==========================================
  function unlockAndPlayAudio() {
    lagu.play().then(() => {
      // Jika berhasil memutar lagu, hapus listener
      document.removeEventListener('click', unlockAndPlayAudio);
      document.removeEventListener('touchstart', unlockAndPlayAudio);
    }).catch(() => {
      // Menunggu sentuhan atau interaksi pertama pengguna di HP
    });
  }

  // Coba jalankan pemutaran awal
  unlockAndPlayAudio();

  // Tambahkan event listener untuk membuka akses audio saat ada sentuhan pertama di layar HP
  document.addEventListener('click', unlockAndPlayAudio, { once: true });
  document.addEventListener('touchstart', unlockAndPlayAudio, { once: true });

  // ==========================================
  // 1. LOADING PAGE (10 DETIK)
  // ==========================================
  const duration = 10000; // 10 Detik
  const intervalTime = 100;
  let elapsedTime = 0;

  const timer = setInterval(() => {
    elapsedTime += intervalTime;
    const progress = Math.min((elapsedTime / duration) * 100, 100);
    pixelBar.style.width = progress + '%';
    loadingPercent.textContent = Math.floor(progress) + '%';

    if (elapsedTime >= duration) {
      clearInterval(timer);
      loading.classList.add('hidden');
      main.classList.remove('hidden');
    }
  }, intervalTime);

  // ==========================================
  // KLIK FOTO LOADING & TOMBOL KEMBALI
  // ==========================================
  if (photoFrame) {
    photoFrame.addEventListener('click', () => {
      photoFrame.classList.add('fullscreen-mode');
      if (backBtn) backBtn.classList.remove('hidden');
      if (pixelBarContainer) pixelBarContainer.style.display = 'none';
      if (loadingText) loadingText.style.display = 'none';
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      photoFrame.classList.remove('fullscreen-mode');
      backBtn.classList.add('hidden');
      if (pixelBarContainer) pixelBarContainer.style.display = 'block';
      if (loadingText) loadingText.style.display = 'block';
    });
  }

  // ==========================================
  // KLIK FOTO FINAL & TOMBOL KEMBALI FINAL
  // ==========================================
  if (finalPhotoFrame) {
    finalPhotoFrame.addEventListener('click', () => {
      revealPhoto.style.transform = 'scale(1.15)';
      if (backBtnFinal) backBtnFinal.classList.remove('hidden');
      if (finalTitle) finalTitle.style.display = 'none';
      if (videoContainer) videoContainer.style.display = 'none';
    });
  }

  if (backBtnFinal) {
    backBtnFinal.addEventListener('click', () => {
      revealPhoto.style.transform = 'scale(1)';
      backBtnFinal.classList.add('hidden');
      if (finalTitle) finalTitle.style.display = 'block';
      if (videoContainer) videoContainer.style.display = 'flex';
    });
  }

  // ==========================================
  // FITUR PUTAR VIDEO DI DALAM FINAL PAGE & KEMBALI
  // ==========================================
  if (playVideoBtn) {
    playVideoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playVideoBtn.classList.add('hidden');
      finalPhotoFrame.classList.add('hidden');
      if (backBtnFinal) backBtnFinal.classList.add('hidden');
      if (finalTitle) finalTitle.style.display = 'none';
      
      specialVideo.classList.remove('hidden');
      specialVideo.play();
      backFromVideoBtn.classList.remove('hidden');
    });
  }

  if (backFromVideoBtn) {
    backFromVideoBtn.addEventListener('click', () => {
      specialVideo.pause();
      specialVideo.currentTime = 0;
      specialVideo.classList.add('hidden');
      backFromVideoBtn.classList.add('hidden');

      playVideoBtn.classList.remove('hidden');
      finalPhotoFrame.classList.remove('hidden');
      if (finalTitle) finalTitle.style.display = 'block';
    });
  }

  // ==========================================
  // 2. SCROLL OBSERVER (45° SLIDE & BINDER ANIMATION)
  // ==========================================
  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        const color = entry.target.getAttribute('data-color') || '#111';
        document.body.style.backgroundColor = color;
      }
    });
  }, observerOptions);

  slides.forEach(slide => slideObserver.observe(slide));

  const doaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        doaSection.classList.remove('hidden-section');
        doaSection.classList.add('visible-section');
      }
    });
  }, { threshold: 0.2 });

  doaObserver.observe(doaSection);

  // ==========================================
  // 3. TOMBOL "PLEASE KLIK" (LAGU MATI / PAUSE)
  // ==========================================
  pleaseKlik.addEventListener('click', () => {
    lagu.pause(); // 🔇 Hentikan musik saat tombol diklik
    main.classList.add('hidden');
    questionPage.classList.remove('hidden');
    document.body.style.backgroundColor = '#0d0e15';
  });

  // ==========================================
  // 4. EVADING "TIDAK SAYANG" LOGIC (RUN 3X)
  // ==========================================
  let runCount = 0;

  function moveTidakBtn() {
    if (runCount < 3) {
      runCount++;
      
      const btnWidth = tidakBtn.offsetWidth || 100;
      const btnHeight = tidakBtn.offsetHeight || 40;
      
      const maxX = window.innerWidth - btnWidth - 20;
      const maxY = window.innerHeight - btnHeight - 20;

      const randomX = Math.max(20, Math.floor(Math.random() * maxX));
      const randomY = Math.max(20, Math.floor(Math.random() * maxY));

      tidakBtn.style.position = 'fixed';
      tidakBtn.style.left = randomX + 'px';
      tidakBtn.style.top = randomY + 'px';

      if (runCount === 3) {
        setTimeout(() => {
          modal.classList.remove('hidden');
        }, 200);
      }
    }
  }

  tidakBtn.addEventListener('mouseenter', moveTidakBtn);
  tidakBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveTidakBtn();
  });
  tidakBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveTidakBtn();
  });

  modalOkBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    
    yaBtn.style.position = 'fixed';
    yaBtn.style.inset = '0';
    yaBtn.style.width = '100vw';
    yaBtn.style.height = '100vh';
    yaBtn.style.fontSize = '22px';
    yaBtn.style.zIndex = '9999';
    yaBtn.style.display = 'flex';
    yaBtn.style.alignItems = 'center';
    yaBtn.style.justifyContent = 'center';
    yaBtn.style.transition = 'all 0.5s ease-in-out';

    setTimeout(() => {
      if (hintModal) hintModal.classList.remove('hidden');
    }, 400);
  });

  if (hintModal) {
    hintModal.addEventListener('click', () => {
      hintModal.classList.add('hidden');
    });
  }

  // ==========================================
  // 5. "YA SAYANG" CLICKED -> KEJUTAN & FOTO BLUR TO CLEAR
  // ==========================================
  yaBtn.addEventListener('click', () => {
    if (hintModal && !hintModal.classList.contains('hidden')) {
      hintModal.classList.add('hidden');
      return;
    }

    lagu.pause();
    playSurpriseSound();

    questionPage.classList.add('hidden');
    finalPage.classList.remove('hidden');

    createFireworks();

    setTimeout(() => {
      revealPhoto.classList.remove('pixel-blurred');
      revealPhoto.classList.add('pixel-clear');
    }, 400);
  });

  function playSurpriseSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        const startTime = ctx.currentTime + (index * 0.12);
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch(e) {}
  }

  function createFireworks() {
    const colors = ['#ff79c6', '#bd93f9', '#50fa7b', '#f1fa8c', '#ffb86c', '#ff5555'];
    for (let i = 0; i < 120; i++) {
      const p = document.createElement('div');
      const bg = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const size = Math.random() * 8 + 6;
      const duration = Math.random() * 2.5 + 1.5;

      p.style.cssText = `
        position: fixed;
        left: ${left}vw;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${bg};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 10001;
        pointer-events: none;
        animation: fallAnimation ${duration}s linear forwards;
      `;

      document.body.appendChild(p);
      setTimeout(() => p.remove(), duration * 1000);
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fallAnimation {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});
