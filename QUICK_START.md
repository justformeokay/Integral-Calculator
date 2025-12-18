# 🚀 QUICK START GUIDE - FRONTEND REACT

## Cara Cepat Memulai

### Opsi 1: Terminal Commands (Paling Cepat)

```bash
# 1. Masuk ke folder frontend
cd /Users/putramac/Desktop/integral_app/frontend

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm start
```

✅ Aplikasi akan terbuka di browser di `http://localhost:3000`

---

### Opsi 2: Menggunakan Setup Script (Recommended untuk macOS)

```bash
# 1. Buat script executable
chmod +x /Users/putramac/Desktop/integral_app/frontend/setup.sh

# 2. Jalankan setup script
/Users/putramac/Desktop/integral_app/frontend/setup.sh

# 3. Jalankan aplikasi
cd /Users/putramac/Desktop/integral_app/frontend
npm start
```

---

## 📋 Pre-requisites Check

Pastikan Anda memiliki:

```bash
# Check Node.js
node --version
# Output: v14.0.0 atau lebih baru

# Check npm
npm --version
# Output: 6.0.0 atau lebih baru
```

Jika tidak terinstall, download dari: https://nodejs.org/

---

## 🎯 Apa yang Akan Terjadi

Setelah `npm start`, Anda akan melihat:

1. Terminal menunjukkan: `Compiled successfully!`
2. Browser otomatis buka `http://localhost:3000`
3. Aplikasi React Integral Calculator terbuka

---

## 🧪 Test Aplikasi

### Test dengan contoh sederhana:

1. **Input:**
   - Fungsi: `x**2`
   - Batas Bawah: `0`
   - Batas Atas: `2`
   - Sumbu: `x-axis`

2. **Klik:** "Hitung Volume"

3. **Expected Output:**
   - Volume: `4.188790` (approximately)
   - Grafik 2D dan 3D tampil

---

## 📂 Struktur File Penting

```
frontend/
├── src/
│   ├── App.js                 # Main component
│   ├── components/
│   │   ├── Calculator.js      # Form input
│   │   ├── Results.js         # Hasil perhitungan
│   │   ├── Plot2D.js          # Grafik 2D
│   │   └── Plot3D.js          # Grafik 3D
│   ├── index.js               # Entry point
│   └── App.css & components CSS
├── public/
│   └── index.html             # HTML template
└── package.json               # Dependencies
```

---

## 🔌 API Connection

Backend API harus running di:
```
http://103.127.139.243:8000/api/volume
```

Jika Anda ingin test dengan URL lain, edit di `src/App.js`:

```javascript
const apiUrl = 'http://YOUR_API_URL:8000';  // <- Ubah di sini
```

---

## ⚠️ Troubleshooting

### Error: "Port 3000 already in use"
```bash
# Gunakan port lain
PORT=3001 npm start
```

### Error: "Cannot find module"
```bash
# Clear cache dan reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

### API tidak merespons
```bash
# Cek backend status
curl http://103.127.139.243:8000/
```

---

## 📚 Dokumentasi Lengkap

Untuk dokumentasi lebih detail, baca:
- `FRONTEND_COMPLETE_DOCS.md` - Dokumentasi lengkap
- `frontend/README.md` - Project README

---

## 🎉 Siap!

Aplikasi sudah siap digunakan! Mulai hitung integral Anda! 🧮

---

**Tips:**
- Buka DevTools (F12) untuk melihat console logs
- Network tab untuk debug API calls
- Hot reload aktif - setiap save file akan auto refresh browser
