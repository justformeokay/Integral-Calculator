# 📚 Dokumentasi Lengkap Frontend React

## Daftar Isi
1. [Instalasi](#instalasi)
2. [Menjalankan Aplikasi](#menjalankan-aplikasi)
3. [Struktur Folder](#struktur-folder)
4. [Komponen](#komponen)
5. [API Integration](#api-integration)
6. [Contoh Penggunaan](#contoh-penggunaan)
7. [Troubleshooting](#troubleshooting)

---

## Instalasi

### Requirements
- Node.js 14 atau lebih baru
- npm 6 atau lebih baru
- Git

### Langkah-langkah

1. **Clone atau masuk ke folder project**
```bash
cd /Users/putramac/Desktop/integral_app
```

2. **Install dependencies**
```bash
cd frontend
npm install
```

Dependencies yang akan diinstall:
- `react@^18.2.0` - React library
- `react-dom@^18.2.0` - React DOM rendering
- `axios@^1.6.2` - HTTP client untuk API calls
- `react-scripts@5.0.1` - Build scripts untuk React

---

## Menjalankan Aplikasi

### Development Mode

```bash
cd frontend
npm start
```

**Output:**
```
Compiled successfully!

You can now view integral-calculator-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Aplikasi akan otomatis terbuka di browser pada `http://localhost:3000`

### Production Build

```bash
npm run build
```

Folder `build/` akan dibuat dengan file yang sudah di-optimize.

---

## Struktur Folder

```
frontend/
│
├── public/
│   └── index.html                    # Template HTML utama
│
├── src/
│   ├── components/                   # Reusable React components
│   │   ├── Calculator.js             # Form input untuk perhitungan
│   │   ├── Calculator.css
│   │   ├── Results.js                # Menampilkan hasil perhitungan
│   │   ├── Results.css
│   │   ├── Plot2D.js                 # Grafik 2D (Plotly)
│   │   ├── Plot2D.css
│   │   ├── Plot3D.js                 # Grafik 3D (Plotly)
│   │   └── Plot3D.css
│   │
│   ├── App.js                        # Main application component
│   ├── App.css                       # App-level styles
│   ├── index.js                      # Entry point aplikasi
│   └── index.css                     # Global styles
│
├── package.json                      # Project dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── .gitignore                        # Git ignore rules
├── README.md                         # Project README
└── FRONTEND_SETUP.md                 # Setup guide
```

---

## Komponen

### 1. App.js (Main Component)
**Fungsi:** 
- Mengelola state untuk results, loading, dan error
- Handle API calls ke backend
- Render Calculator dan Results components

**Props:** None

**State:**
```javascript
{
  results: null,           // Hasil API response
  loading: false,          // Loading state saat request
  error: null             // Error message jika ada
}
```

---

### 2. Calculator.js
**Fungsi:** Form input untuk perhitungan integral

**Props:**
```javascript
{
  onCalculate: Function,   // Callback saat submit form
  loading: Boolean        // Disable form saat loading
}
```

**Form Fields:**
- `function` - Ekspresi fungsi matematika (string)
- `lowerBound` - Batas bawah integral (number)
- `upperBound` - Batas atas integral (number)
- `axis` - Sumbu rotasi: "x-axis" atau "y-axis" (select)

**Validasi:**
- Batas atas harus > batas bawah
- Function tidak boleh kosong
- Bounds harus berupa angka

**Contoh Fungsi yang Didukung:**
```
x**2              -> Parabola
sqrt(x)           -> Akar kuadrat
sin(x)            -> Sinus
cos(x)            -> Kosinus
1/x               -> Hiperbola
exp(x)            -> Eksponensial
log(x)            -> Logaritma natural
```

---

### 3. Results.js
**Fungsi:** Menampilkan hasil perhitungan

**Props:**
```javascript
{
  data: {
    volume_numerical: Number,
    volume_symbolic: String,
    integral_expression: String,
    function: String,
    bounds: {
      lower: Number,
      upper: Number
    },
    axis: String,
    plot_2d: String (JSON),
    plot_3d: String (JSON)
  }
}
```

**Sub-Components:**
- `Plot2D` - Render grafik 2D
- `Plot3D` - Render grafik 3D

**Fitur:**
- Tab switching antara 2D dan 3D plot
- Menampilkan volume numerik dan simbolik
- Informasi integral expression
- Formula explanation

---

### 4. Plot2D.js & Plot3D.js
**Fungsi:** Render grafik menggunakan Plotly.js

**Props:**
```javascript
{
  plotData: String (JSON Plotly format)
}
```

**Teknologi:**
- Menggunakan Plotly.js library (loaded via CDN)
- Responsive dan interactive plots

---

## API Integration

### Endpoint
```
POST http://103.127.139.243:8000/api/volume
```

### Request Format
```javascript
{
  "function": "x**2",           // Fungsi matematika
  "lower_bound": 0,             // Batas bawah
  "upper_bound": 2,             // Batas atas
  "axis": "x-axis"              // Sumbu rotasi: x-axis atau y-axis
}
```

### Response Format
```javascript
{
  "success": true,
  "volume_numerical": 4.188790,                    // Hasil numerik
  "volume_symbolic": "4*pi/3",                     // Hasil simbolik
  "integral_expression": "\\int \\pi (x^{2})^{2}\\, dx",
  "function": "x**2",
  "bounds": {
    "lower": 0,
    "upper": 2
  },
  "axis": "x-axis",
  "plot_2d": "{\"data\": [...], \"layout\": {...}}",  // JSON Plotly
  "plot_3d": "{\"data\": [...], \"layout\": {...}}"   // JSON Plotly
}
```

### Error Response
```javascript
{
  "detail": "Error message here"
}
```

---

## Contoh Penggunaan

### Scenario 1: Hitung volume lingkaran
1. Input function: `sqrt(4-x**2)`
2. Lower bound: `-2`
3. Upper bound: `2`
4. Axis: `x-axis`
5. Klik "Hitung Volume"
6. Hasil: Volume bola dengan radius 2

### Scenario 2: Hitung volume dengan sumbu Y
1. Input function: `x`
2. Lower bound: `0`
3. Upper bound: `2`
4. Axis: `y-axis`
5. Klik "Hitung Volume"
6. Hasil: Volume cone

---

## Styling & Design

### Color Scheme
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Background: Gradient (Purple to Pink)
- Text: `#333` (Dark Gray)
- Success: `#28a745` (Green)
- Error: `#dc3545` (Red)

### Responsive Breakpoints
- Desktop: `> 768px`
- Tablet/Mobile: `<= 768px`

### Key Features
- ✨ Smooth animations
- 📱 Mobile responsive
- ♿ Accessible form controls
- 🎨 Modern gradient design
- 🔄 Loading spinners
- ⚠️ Error handling & validation

---

## Troubleshooting

### Problem: Port 3000 sudah digunakan
**Solution:**
```bash
# Gunakan port berbeda
PORT=3001 npm start
```

### Problem: CORS Error dari Backend
**Solution:**
Backend harus enable CORS. Pastikan di `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Atau specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Problem: Plotly grafik tidak tampil
**Solution:**
1. Cek apakah `plot.ly` CDN accessible
2. Buka browser console (F12) untuk error details
3. Pastikan JSON plot data valid

### Problem: API timeout
**Solution:**
Backend mungkin sedang busy atau down. Cek:
```bash
curl http://103.127.139.243:8000/
```

### Problem: npm install stuck
**Solution:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## Development Tips

### Debug API Calls
Buka browser DevTools (F12) → Network tab → lihat requests ke API

### Hot Reload
Setiap kali Anda save file `.js` atau `.css`, browser otomatis refresh

### Console Logging
```javascript
console.log('Debug:', data);
console.error('Error:', error);
```

### Test Form Validation
Coba input invalid values untuk lihat error handling

---

## Deployment

### Deploy ke Vercel (Gratis & Recommended)
```bash
# Install vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

### Deploy ke Netlify
```bash
# Build
npm run build

# Drop build/ folder ke Netlify
```

### Deploy ke server sendiri
```bash
# Build
npm run build

# Copy build/ folder ke web server
# Update API URL untuk production
```

---

**Terakhir updated:** December 18, 2025
