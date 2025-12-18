# Frontend React Integral Calculator

Aplikasi React untuk menampilkan hasil perhitungan integral solid of revolution dari API Python.

## Panduan Instalasi & Menjalankan

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Jalankan Development Server

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

### 3. Build untuk Production

```bash
npm run build
```

## 🌐 Konfigurasi API

Backend API harus berjalan di:
```
http://103.127.139.243:8000/api/volume
```

Jika Anda ingin mengubah URL API, edit file `src/App.js`:

```javascript
const response = await axios.post(
  'http://YOUR_API_URL:8000/api/volume',  // <- Ubah di sini
  {
    // ...
  }
);
```

## 📚 Fitur

- ✨ Form input untuk fungsi matematika
- 📊 Visualisasi grafik 2D dan 3D
- 🧮 Menampilkan hasil perhitungan volume
- 📐 Support untuk rotasi di sumbu X dan Y
- 🎨 UI modern dengan animasi

## 🔧 Stack Teknologi

- React 18
- Axios (HTTP client)
- Plotly (Visualisasi grafik)
- CSS3 (Styling modern)

---

**Siap digunakan!** 🚀
