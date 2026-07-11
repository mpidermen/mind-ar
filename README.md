# ScanReveal — WebAR Image Tracking (MindAR + A-Frame)

Website WebAR sederhana: landing page → tekan "Mulai AR" → kamera terbuka →
scan gambar target → video + foto muncul melayang di atasnya.

Dibangun dengan **HTML, CSS, dan JavaScript murni** — tanpa React/Vue/Angular,
tanpa AR.js. Library yang dipakai: **A-Frame 1.6.0** + **MindAR 1.2.5**
(dimuat langsung dari CDN, tidak perlu `npm install`).

## Struktur folder

```
project/
├── index.html      # Landing page
├── ar.html          # Halaman kamera AR (MindAR + A-Frame)
├── style.css         # Semua styling (landing + AR)
├── script.js          # Semua logika JS (transisi + event MindAR)
├── targets.mind        # File hasil compile gambar target (WAJIB diganti, lihat di bawah)
└── assets/
    ├── video.mp4        # Placeholder video, ganti dengan videomu
    └── photo.png         # Placeholder foto, ganti dengan fotomu
```

## ⚠️ Satu langkah wajib sebelum tracking berfungsi: `targets.mind`

`targets.mind` di folder ini hanyalah **placeholder teks**, bukan file target
asli — karena file ini harus di-compile dari gambar marker pilihanmu sendiri,
tidak bisa dibuat otomatis tanpa gambar tersebut.

**Cara membuatnya:**
1. Buka compiler resmi MindAR: https://hiukim.github.io/mind-ar-js-doc/tools/compile/
2. Upload gambar yang ingin dijadikan marker (gambar dengan banyak detail,
   tekstur, dan kontras akan jauh lebih stabil dilacak daripada gambar polos).
3. Klik **Start** → tunggu proses selesai → klik **Download**.
4. Timpa file `targets.mind` di root project ini dengan hasil download tadi.

Setelah diganti, jalankan project — peringatan placeholder di halaman AR akan
hilang otomatis dan kamera siap melakukan tracking.

## Mengganti aset (video & foto)

Cukup timpa dua file ini dengan aset kamu sendiri **dengan nama file yang sama**:
- `assets/video.mp4`
- `assets/photo.png`

Kalau ingin nama file berbeda, ubah `src="./assets/..."` di dalam `<a-assets>`
pada `ar.html`.

## Mengubah posisi / rotasi / ukuran video & foto

Semua nilai ini ada langsung di `ar.html`, di dalam blok `<a-entity id="target0">`,
dengan komentar `✏️ EDIT DI SINI` di atasnya. Satuan A-Frame:
- `position="x y z"` — meter
- `rotation="x y z"` — derajat
- `scale="x y z"` — kelipatan (1 = ukuran asli)
- `width` / `height` — meter (ukuran bidang video/gambar)

## Menyetel kestabilan tracking

Parameter ada di `ar.html` pada atribut `mindar-image` milik `<a-scene>`,
dengan penjelasan lengkap di komentar di atasnya (`filterMinCF`, `filterBeta`,
`warmupTolerance`, `missTolerance`).

## Menjalankan project

**Opsi 1 — VS Code Live Server**
Buka folder ini di VS Code → klik kanan `index.html` → "Open with Live Server".

**Opsi 2 — Vercel**
Push folder ini ke repo GitHub, lalu import ke Vercel sebagai *static site*
(tidak perlu build command / framework preset — pilih "Other").

**Catatan:** akses kamera browser membutuhkan konteks aman (`https://` atau
`localhost`). Live Server dan Vercel sudah otomatis memenuhi syarat ini.

## Mengganti tampilan / warna

Semua token desain (warna, font, radius, spacing) dikumpulkan di bagian
**`:root`** paling atas `style.css`, jadi restyle cepat cukup dari satu tempat.
