# Integral Calculator Frontend - React

Frontend React untuk menampilkan hasil perhitungan integral dari API backend Python.

## 📋 Fitur

- ✅ Form input untuk fungsi matematika, batas atas/bawah, dan pemilihan sumbu rotasi
- ✅ Real-time calculation dengan API Python backend
- ✅ Tampilan hasil perhitungan volume (numerik dan simbolik)
- ✅ Grafik 2D dari fungsi
- ✅ Visualisasi 3D dari solid of revolution
- ✅ Responsive design untuk desktop dan mobile
- ✅ Animasi dan UI yang modern

## 🚀 Setup & Running

### Prerequisites
- Node.js 14+ dan npm
- Backend Python API running di `http://103.127.139.243:8000`

### Installation

```bash
cd frontend
npm install
```

### Running Development Server

```bash
npm start
```

Aplikasi akan membuka di `http://localhost:3000`

### Build untuk Production

```bash
npm build
```

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html          # Template HTML utama
├── src/
│   ├── components/
│   │   ├── Calculator.js   # Form input untuk perhitungan
│   │   ├── Calculator.css
│   │   ├── Results.js      # Tampilan hasil perhitungan
│   │   ├── Results.css
│   │   ├── Plot2D.js       # Grafik 2D menggunakan Plotly
│   │   ├── Plot2D.css
│   │   ├── Plot3D.js       # Grafik 3D menggunakan Plotly
│   │   └── Plot3D.css
│   ├── App.js              # Main component
│   ├── App.css
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
└── package.json            # Dependencies
```

## 🔧 Teknologi yang Digunakan

- **React 18** - UI Framework
- **Axios** - HTTP Client untuk API calls
- **Plotly.js** - Visualisasi grafik 2D dan 3D
- **CSS3** - Modern styling dengan gradients dan animations

## 📝 Cara Penggunaan

1. **Input Fungsi**: Masukkan fungsi matematika (contoh: `x**2`, `sin(x)`, `sqrt(x)`)
2. **Tentukan Bounds**: Masukkan batas bawah (a) dan batas atas (b)
3. **Pilih Sumbu**: Pilih sumbu rotasi (X-axis atau Y-axis)
4. **Hitung**: Klik tombol "Hitung Volume"
5. **Lihat Hasil**: Tampilan hasil termasuk:
   - Volume numerik dan simbolik
   - Ekspresi integral yang digunakan
   - Grafik 2D fungsi
   - Visualisasi 3D solid of revolution
   - Rumus yang digunakan

## 🔗 API Integration

Request ke backend:
```bash
POST http://103.127.139.243:8000/api/volume
Content-Type: application/json

{
  "function": "x**2",
  "lower_bound": 0,
  "upper_bound": 2,
  "axis": "x-axis"
}
```

Response dari backend:
```json
{
  "success": true,
  "volume_numerical": 4.188790,
  "volume_symbolic": "4*pi/3",
  "integral_expression": "\\int \\pi (x^{2})^{2}\\, dx",
  "function": "x**2",
  "bounds": {
    "lower": 0,
    "upper": 2
  },
  "axis": "x-axis",
  "plot_2d": "{...plotly json...}",
  "plot_3d": "{...plotly json...}"
}
```

## 🎨 Styling

- Gradient background (purple-pink)
- Card-based layout
- Smooth animations dan transitions
- Mobile responsive design
- Dark mode support ready

## 🐛 Troubleshooting

### CORS Error
Pastikan backend sudah enable CORS dan berjalan di IP yang benar.

### Plotly tidak load
Cek koneksi internet dan pastikan `plot.ly` CDN accessible.

### API tidak menjawab
Verifikasi backend running di `http://103.127.139.243:8000`

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.6.2",
  "plotly.js": "^2.26.0",
  "react-plotly.js": "^2.6.0"
}
```

## 📄 License

MIT
