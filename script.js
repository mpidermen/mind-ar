/* ============================================================================
   SCRIPT.JS
   File JavaScript murni (tanpa framework) yang dipakai bersama oleh:
     1) index.html  -> initLandingPage()  : transisi menuju ar.html
     2) ar.html      -> initArPage()       : logika MindAR (targetFound/Lost, dst.)

   Kedua fungsi saling memeriksa keberadaan elemen sebelum berjalan, jadi
   aman dipasang di kedua halaman tanpa menimbulkan error di console.
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLandingPage();
  initArPage();
});

/* ============================================================================
   1) LANDING PAGE (index.html)
   ============================================================================ */
function initLandingPage() {
  const startBtn = document.getElementById('startArBtn');
  const overlay = document.getElementById('transitionOverlay');

  if (!startBtn || !overlay) return; // bukan sedang di landing page

  startBtn.addEventListener('click', () => {
    overlay.classList.add('is-active');

    // ✏️ EDIT DI SINI: durasi (ms) sebelum pindah ke halaman AR.
    // Samakan dengan durasi transisi opacity overlay di style.css (0.45s).
    const TRANSITION_DELAY_MS = 550;

    setTimeout(() => {
      window.location.href = 'ar.html';
    }, TRANSITION_DELAY_MS);
  });
}

/* ============================================================================
   2) HALAMAN AR (ar.html)
   ============================================================================ */
function initArPage() {
  const scene = document.getElementById('arScene');
  if (!scene) return; // bukan sedang di halaman AR

  const loadingOverlay = document.getElementById('loadingOverlay');
  const errorOverlay = document.getElementById('errorOverlay');
  const errorMessage = document.getElementById('errorMessage');
  const scanGuide = document.getElementById('scanGuide');
  const backBtn = document.getElementById('backBtn');
  const errorBackBtn = document.getElementById('errorBackBtn');

  const video = document.getElementById('ar-video');
  const target = document.getElementById('target0');

  /* ---------------- Tombol kembali ke landing page ---------------- */
  [backBtn, errorBackBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  });

  /* ----------------------------------------------------------------
     Cek dini: apakah targets.mind masih file placeholder bawaan?
     Ini murni bantuan developer supaya error-nya jelas ("ganti file
     targets.mind") alih-alih error teknis yang membingungkan.
     Boleh dihapus kapan saja setelah kamu mengganti targets.mind asli,
     karena begitu file itu diganti (biner asli), pengecekan ini akan
     otomatis lolos dengan sendirinya.
  ---------------------------------------------------------------- */


  /* ---------------- Event dari MindAR pada <a-scene> ---------------- */

  // Kamera & mesin tracking MindAR sudah siap -> sembunyikan overlay loading
  scene.addEventListener('arReady', () => {
    console.log("AR READY");
    loadingOverlay.classList.add('is-hidden');
  });

  // MindAR gagal start (biasanya karena izin kamera ditolak/tidak ada kamera)
  scene.addEventListener('arError', (e) => {
    console.error("AR ERROR:", e);

    loadingOverlay.classList.add('is-hidden');

    if (errorMessage) {
      errorMessage.innerHTML =
        'AR Error. Lihat Console untuk detail.';
    }

    errorOverlay.hidden = false;
  });

  /* ---------------- Event dari MindAR pada target entity ---------------- */

  // targetFound: gambar target berhasil dideteksi kamera
  target.addEventListener('targetFound', () => {
    scanGuide.classList.add('is-hidden');

    if (video) {
      video.currentTime = 0; // ✏️ hapus baris ini bila ingin video lanjut dari posisi terakhir
      video.play().catch((err) => {
        console.warn('Video gagal diputar otomatis:', err);
      });
    }
  });

  // targetLost: gambar target hilang dari pandangan kamera
  target.addEventListener('targetLost', () => {
    scanGuide.classList.remove('is-hidden');

    if (video) {
      video.pause();
    }
  });
}
