# 🎯 INSTALLATION & RUNNING GUIDE

## Prerequisites

Sebelum mulai, pastikan Anda sudah install:

### 1. Node.js & npm

**Check jika sudah terinstall:**
```bash
node --version    # Should output v14+ (misal: v18.0.0)
npm --version     # Should output 6+ (misal: 9.0.0)
```

**Jika belum terinstall:**
- Download dari: https://nodejs.org/
- Pilih LTS version (recommended)
- Follow installer instructions
- Verify dengan commands di atas

### 2. Git (Optional, tapi recommended)
```bash
git --version     # Should output 2.0+
```

---

## Installation Steps

### Step 1: Navigate to Frontend Folder
```bash
cd /Users/putramac/Desktop/integral_app/frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

**Output yang diharapkan:**
```
added 142 packages in 25s
```

Tunggu hingga selesai. Folder `node_modules/` akan dibuat.

### Step 3: Verify Installation
```bash
npm list react
```

**Expected output:**
```
integral-calculator-frontend@1.0.0 /Users/putramac/Desktop/integral_app/frontend
└── react@18.2.0
```

---

## Running the Application

### Development Mode
```bash
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view integral-calculator-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

**Browser akan otomatis terbuka di:**
```
http://localhost:3000
```

### Stop Server
```
Press Ctrl+C di terminal
```

---

## Building for Production

```bash
npm run build
```

**Output:**
```
The build folder is ready to be deployed.
You may serve it with:
  npx serve -s build
```

Folder `build/` siap untuk di-deploy ke server

---

## Troubleshooting

### Issue 1: "npm command not found"
**Solution:** Node.js belum terinstall dengan benar
- Reinstall Node.js dari nodejs.org
- Restart terminal/computer

### Issue 2: "Port 3000 already in use"
**Solution:** Ada aplikasi lain di port 3000
```bash
# Use different port
PORT=3001 npm start
```

### Issue 3: "Cannot find module"
**Solution:** Dependencies tidak lengkap
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: API tidak merespons
**Solution:** Backend API tidak running
```bash
# Check backend status
curl http://103.127.139.243:8000/
```

### Issue 5: Plotly grafik tidak tampil
**Solution:** 
- Cek browser console (F12)
- Check network tab
- Pastikan plot.ly CDN accessible

---

## Project Structure

```
frontend/
├── public/
│   └── index.html                 # Main HTML template
│
├── src/
│   ├── components/
│   │   ├── Calculator.js          # Form untuk input
│   │   ├── Calculator.css
│   │   ├── Results.js             # Tampilan hasil
│   │   ├── Results.css
│   │   ├── Plot2D.js              # Grafik 2D
│   │   ├── Plot2D.css
│   │   ├── Plot3D.js              # Grafik 3D
│   │   └── Plot3D.css
│   │
│   ├── App.js                     # Main component
│   ├── App.css
│   ├── index.js                   # Entry point
│   └── index.css                  # Global styles
│
├── package.json
├── tsconfig.json
├── .gitignore
└── .env.example
```

---

## Key Features

✅ **Input Form**
- Function input (e.g., x**2, sin(x), sqrt(x))
- Bounds (lower & upper)
- Axis selection (x-axis or y-axis)

✅ **API Integration**
- POST request to backend
- Error handling
- Loading state

✅ **Results Display**
- Numerical volume
- Symbolic volume
- Integral expression

✅ **Visualizations**
- 2D plot of function
- 3D plot of solid of revolution
- Tab switching

✅ **UI/UX**
- Responsive design
- Smooth animations
- Error messages
- Loading indicators

---

## Available Scripts

```bash
npm start          # Start development server (port 3000)
npm build          # Create production build
npm test           # Run tests (if configured)
npm run eject      # Eject from Create React App
```

---

## Environment Variables

Jika ingin customize API URL, buat file `.env.local`:

```
REACT_APP_API_URL=http://103.127.139.243:8000
REACT_APP_PORT=3000
```

Atau gunakan file `.env.example` sebagai template:
```bash
cp .env.example .env.local
```

---

## Tips & Tricks

### 1. Auto-reload on save
Setiap kali Anda save file, browser otomatis reload. Sangat berguna untuk development!

### 2. DevTools
Buka DevTools dengan:
- F12 atau
- Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac)

### 3. Console Logging
```javascript
console.log('Debug:', data);
console.error('Error:', error);
```

### 4. Network Debugging
Di DevTools → Network tab:
- Lihat semua HTTP requests
- Check request/response body
- Lihat timing & size

---

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build: `npm run build`
2. Upload `build/` folder ke Netlify

### Custom Server
1. Build: `npm run build`
2. Copy `build/` ke web server
3. Configure server untuk serve index.html

---

## Support & Documentation

📚 **Read these files for more info:**
- `QUICK_START.md` - Quick setup (5 menit)
- `PROJECT_OVERVIEW.md` - Project overview
- `FRONTEND_COMPLETE_DOCS.md` - Complete documentation
- `frontend/README.md` - Detailed README

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Start server (`npm start`)
3. ✅ Open browser (`http://localhost:3000`)
4. ✅ Test dengan input: `x**2`, bounds `0-2`, axis `x-axis`
5. ✅ Click "Hitung Volume"
6. ✅ See results & graphs!

---

**You're ready to go! 🚀**

```bash
cd /Users/putramac/Desktop/integral_app/frontend
npm install
npm start
```

Enjoy calculating integrals! 🧮✨
