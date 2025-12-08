# ExploreNusantara - Map Page Structure (map.md)

## 1. Struktur Utama Halaman Map
```
/Map Page
│
├── Header (fixed)
│     ├── Logo ExploreNusantara
│     ├── Navigation Menu (Home | Destinations | Culture | About)
│     └── Toggle (Light/Dark Mode)
│
├── Main Map Section (Fullscreen 3D)
│     ├── Canvas Three.js (Indonesia 3D Map)
│     ├── Floating Info Tooltip (muncul saat hover pulau/wilayah)
│     ├── Control Buttons (Rotate / Zoom / Reset Camera)
│     └── Island Glow Interaction (highlight saat hover)
│
├── Side Panel (slide right)
│     ├── Title Pulau
│     ├── List Destinasi Wisata
│     ├── Gambar Thumbnail
│     ├── Tombol "Open Detail"
│     └── Close Panel Button
│
└── Footer (minimal)
      ├── Social icons
      └── Copyright
```

---

## 2. Konsep Desain UI/UX Halaman Map
### 🎨 **Tema Visual**
- Modern futuristik
- Warna neon cyan + dark navy (#0A0F1F + #16C6FF)
- Glassmorphism pada panel samping
- Elemen floating (anti-gravity) pada tooltip & card

### 🧭 **Tata Letak UX**
- Map 3D fullscreen sebagai fokus utama
- Panel kanan muncul hanya saat pulau diklik → UX bersih
- Header tipis (non-intrusive)
- Kontrol rotasi/zoom mengambang di kiri bawah agar mudah dijangkau
- Tooltip muncul saat hover untuk memancing rasa penasaran

### ✨ **Animasi / Motion**
- Pulau glow effect (cyan neon) saat hover
- Panel slide-in/out dengan soft ease
- Tooltip melayang ke atas (floating) dengan delay 0.2s
- Interaksi map smooth (orbit controls + inertia)

### 📱 **Responsif**
- Mobile: panel jadi bottom sheet
- Map otomatis menyesuaikan orientasi portrait
- Kontrol map menjadi lebih sederhana (tap hold rotate)

---

## 3. Teknologi yang Digunakan (Tanpa Backend)
### **Frontend:**
- **HTML5** (structure)
- **CSS3 + TailwindCSS** (UI modern, responsif)
- **JavaScript (ES6)**
- **Three.js** → untuk peta 3D Indonesia
- **GSAP / Framer Motion** → animasi anti-gravity & transition
- **Vite** → bundler cepat untuk development

### **Asset Pendukung:**
- Model 3D peta Indonesia (GeoJSON → Three.js shapes)
- Font Google (Poppins / Inter)
- Ikon SVG

Backend **tidak diperlukan**, semua data dapat disimpan di file JSON lokal:
```
/src/data/destinations.json
/src/data/islands.json
```

---

## 4. Fitur Interaktif Halaman Map (Tanpa Backend)
### 🌀 **1. 3D Map Navigation**
- Rotate (drag)
- Zoom (scroll)
- Pan movement
- Reset camera button

### 🌐 **2. Island Hover Interaction**
- Pulau glow neon saat cursor mendekat
- Nama pulau muncul dalam tooltip floating

### 🗺️ **3. Click Island → Open Side Panel**
Panel berisi:
- Nama pulau
- Daftar tujuan wisata (diambil dari JSON)
- Gambar preview
- Tombol "Open Detail" (navigasi ke halaman statis)

### 🎛️ **4. Floating UI Controls**
- Zoom in/out
- Reset view
- Toggle visual mode (dark/light)

### ✨ **5. Smooth Anti-Gravity Motion**
- Tooltip melayang naik-turun perlahan
- Card wisata sedikit floating saat panel muncul
- Element UI membuat efek depth futuristik

### 🔍 **6. Search Bar (Optional)**
- Cari pulau atau destinasi secara instan (filter JSON)

### 📱 **7. Mobile Interaction**
- Drag = rotate
- Pinch = zoom
- Tap = open panel
- Panel berubah menjadi bottom sheet

---

Siap! Inilah file inti `map.md` agar Vibe Code Anti-Gravity bisa membaca dengan jelas struktur, UI/UX, teknologi, dan fitur interaktif situs ExploreNusantara.
