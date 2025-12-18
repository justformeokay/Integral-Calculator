# 📊 INTEGRAL CALCULATOR - PROJECT OVERVIEW

## Apa Ini?

React frontend untuk menampilkan hasil perhitungan **Solid of Revolution** dari Python API backend.

Frontend ini bisa:
- ✨ Input fungsi matematika, batas, dan sumbu rotasi
- 🧮 Mengirim request ke backend API
- 📊 Menampilkan hasil volume (numerik dan simbolik)
- 📈 Visualisasi grafik 2D dan 3D
- 🎨 UI modern dengan animasi smooth

---

## 📁 File Structure

```
/Users/putramac/Desktop/integral_app/
├── frontend/                           # ← YANG BARU DIBUAT
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calculator.js           # Form input
│   │   │   ├── Calculator.css
│   │   │   ├── Results.js              # Tampilan hasil
│   │   │   ├── Results.css
│   │   │   ├── Plot2D.js               # Grafik 2D
│   │   │   ├── Plot2D.css
│   │   │   ├── Plot3D.js               # Grafik 3D
│   │   │   └── Plot3D.css
│   │   ├── App.js                      # Main component
│   │   ├── App.css
│   │   ├── index.js                    # Entry point
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── .gitignore
│   ├── .env.example
│   ├── setup.sh
│   ├── README.md
│   └── .vscode-launch.json
│
├── QUICK_START.md                      # ← Panduan cepat
├── FRONTEND_SETUP.md                   # ← Panduan setup
├── FRONTEND_COMPLETE_DOCS.md           # ← Dokumentasi lengkap
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── services/
│   │   ├── math_service.py
│   │   └── visualization_service.py
│   └── tests/
│
└── ... (file lainnya)
```

---

## 🎯 Cara Pakai

### Step 1: Install Dependencies
```bash
cd /Users/putramac/Desktop/integral_app/frontend
npm install
```

### Step 2: Jalankan Server
```bash
npm start
```

### Step 3: Buka Browser
```
http://localhost:3000
```

### Step 4: Input & Calculate
1. Masukkan fungsi (contoh: `x**2`)
2. Masukkan batas bawah dan atas (contoh: 0 ke 2)
3. Pilih sumbu rotasi (X-axis atau Y-axis)
4. Klik "Hitung Volume"

---

## 🔌 API Integration

**Backend API:**
```
POST http://103.127.139.243:8000/api/volume
```

**Request:**
```json
{
  "function": "x**2",
  "lower_bound": 0,
  "upper_bound": 2,
  "axis": "x-axis"
}
```

**Response:**
```json
{
  "success": true,
  "volume_numerical": 4.188790,
  "volume_symbolic": "4*pi/3",
  "integral_expression": "...",
  "plot_2d": "{...}",
  "plot_3d": "{...}"
}
```

---

## 🔧 Tech Stack

- **React 18** - UI Framework
- **CSS3** - Modern styling (gradients, animations)
- **Plotly.js** - Visualisasi grafik (via CDN)
- **Fetch API** - HTTP requests
- **React Scripts** - Build & dev server

---

## 💾 Dependencies

Semua sudah di-install via `npm install`. Hanya 2 dependencies:
- `react@^18.2.0` - React library
- `react-dom@^18.2.0` - DOM rendering

Plotly.js di-load via CDN (di `public/index.html`)

---

## 📚 Dokumentasi

Baca file-file ini untuk info lebih detail:

1. **QUICK_START.md** - Panduan cepat (5 menit)
2. **FRONTEND_SETUP.md** - Setup guide
3. **FRONTEND_COMPLETE_DOCS.md** - Dokumentasi lengkap (semua detail)
4. **frontend/README.md** - Project README

---

## 🎨 Fitur UI

- ✨ Gradient background (purple-pink)
- 🎯 Responsive design (desktop & mobile)
- ⚡ Smooth animations
- 💬 Error handling
- 🔄 Loading spinner
- 📱 Mobile-first approach

---

## ✅ Checklist Setup

- [ ] Node.js terinstall (`node --version` ≥ v14)
- [ ] npm terinstall (`npm --version` ≥ v6)
- [ ] `npm install` selesai
- [ ] Backend API running
- [ ] `npm start` berhasil
- [ ] Browser buka `http://localhost:3000`
- [ ] Form bisa input data
- [ ] API request berhasil
- [ ] Hasil tampil dengan grafik

---

## 🚀 Deployment Options

Setelah development selesai, bisa deploy ke:

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify** - Upload folder `build/`

3. **Server sendiri** - Host `build/` folder

---

## 📞 Support

Jika ada masalah:

1. Baca **QUICK_START.md** - troubleshooting section
2. Buka DevTools (F12) - lihat console errors
3. Check backend API status
4. Lihat documentasi lengkap

---

## 🎉 Done!

Frontend React sudah siap! Sekarang tinggal jalankan:

```bash
cd /Users/putramac/Desktop/integral_app/frontend
npm install
npm start
```

Enjoy! 🚀✨
