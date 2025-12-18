# 🚀 Deployment Guide: Menambahkan Fitur Linear Algebra

## 📁 Struktur File yang Perlu Ditambahkan

```
/www/wwwroot/solid-revolution/backend/
├── main.py (REPLACE - update dengan kode baru)
├── services/
│   ├── __init__.py (sudah ada)
│   ├── math_service.py (sudah ada)
│   ├── visualization_service.py (sudah ada)
│   ├── linear_algebra_service.py (NEW)
│   └── linear_algebra_visualization.py (NEW)
```

---

## 📝 Step-by-Step Deployment

### Step 1: Backup File Lama

```bash
cd /www/wwwroot/solid-revolution/backend
cp main.py main.py.backup
```

### Step 2: Update main.py

```bash
nano main.py
```

**Hapus semua isi file lama**, lalu paste kode baru dari artifact** ****"main.py - Complete Code with Linear Algebra"**

Save:** **`Ctrl + X`,** **`Y`,** **`Enter`

### Step 3: Tambahkan File Linear Algebra Service

```bash
cd /www/wwwroot/solid-revolution/backend/services
nano linear_algebra_service.py
```

Paste kode dari artifact** ****"services/linear\_algebra\_service.py"**

Save:** **`Ctrl + X`,** **`Y`,** **`Enter`

### Step 4: Tambahkan File Visualization Service

```bash
nano linear_algebra_visualization.py
```

Paste kode dari artifact** ****"services/linear\_algebra\_visualization.py"**

Save:** **`Ctrl + X`,** **`Y`,** **`Enter`

### Step 5: Verifikasi Struktur File

```bash
cd /www/wwwroot/solid-revolution/backend
ls -la services/
```

Harusnya terlihat:

```
__init__.py
linear_algebra_service.py
linear_algebra_visualization.py
math_service.py
visualization_service.py
```

### Step 6: Test Import

```bash
cd /www/wwwroot/solid-revolution/backend
source venv/bin/activate
python -c "from services.linear_algebra_service import LinearAlgebraService; print('Import OK')"
python -c "from services.linear_algebra_visualization import LinearAlgebraVisualization; print('Viz OK')"
```

Jika tidak ada error, berarti berhasil!

### Step 7: Restart Application

**Via aaPanel:**

1. Buka** ****Python Manager**
2. Cari project** **`solid-revolution`
3. Klik** ****Restart**

**Via Terminal:**

```bash
cd /www/wwwroot/solid-revolution/backend
pkill -f uvicorn
source venv/bin/activate
nohup python main.py > app.log 2>&1 &
```

### Step 8: Verifikasi API Berjalan

```bash
# Test root endpoint
curl http://127.0.0.1:8000/

# Should show new modules including linear_algebra
```

---

## 🧪 Testing API Endpoints

### Test 1: Matrix Determinant

```bash
curl -X POST http://127.0.0.1:8000/api/linear-algebra/determinant \
  -H "Content-Type: application/json" \
  -d '{
    "matrix": [[1, 2], [3, 4]]
  }'
```

Expected response:

```json
{
  "success": true,
  "module": "linear_algebra",
  "operation": "determinant",
  "determinant": -2.0,
  "matrix_size": [2, 2],
  "is_singular": false
}
```

### Test 2: Matrix Inverse

```bash
curl -X POST http://127.0.0.1:8000/api/linear-algebra/inverse \
  -H "Content-Type: application/json" \
  -d '{
    "matrix": [[4, 7], [2, 6]]
  }'
```

### Test 3: Eigenvalues

```bash
curl -X POST http://127.0.0.1:8000/api/linear-algebra/eigenvalues \
  -H "Content-Type: application/json" \
  -d '{
    "matrix": [[1, 2], [2, 1]]
  }'
```

### Test 4: Solve Linear System

```bash
curl -X POST http://127.0.0.1:8000/api/linear-algebra/solve \
  -H "Content-Type: application/json" \
  -d '{
    "A": [[2, 1], [1, 3]],
    "b": [5, 6]
  }'
```

### Test 5: Matrix Operations

```bash
curl -X POST http://127.0.0.1:8000/api/linear-algebra/operations \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "multiply",
    "matrix_a": [[1, 2], [3, 4]],
    "matrix_b": [[5, 6], [7, 8]]
  }'
```

### Test 6: SVD Decomposition

```bash
curl -X POST http://127.0.0.1:8000/api/linear-algebra/decomposition \
  -H "Content-Type: application/json" \
  -d '{
    "matrix": [[1, 2, 3], [4, 5, 6]],
    "method": "svd"
  }'
```

---

## 🌐 Akses via Browser

### API Documentation

Buka:** **`http://103.127.139.243/docs`

Di sana Anda akan melihat semua endpoint baru:

* `/api/linear-algebra/determinant`
* `/api/linear-algebra/inverse`
* `/api/linear-algebra/eigenvalues`
* `/api/linear-algebra/decomposition`
* `/api/linear-algebra/solve`
* `/api/linear-algebra/operations`
* `/api/linear-algebra/rank`

### Test via Swagger UI

1. Buka** **`http://103.127.139.243/docs`
2. Pilih salah satu endpoint Linear Algebra
3. Klik** ****"Try it out"**
4. Isi request body dengan contoh matrix
5. Klik** ****"Execute"**
6. Lihat response dengan visualisasi

---

## 📊 Contoh Penggunaan

### Example 1: Cari Determinan Matrix 3x3

```json
POST /api/linear-algebra/determinant
{
  "matrix": [
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0]
  ]
}
```

### Example 2: Solve System Persamaan Linear

Solve:

```
2x + y = 5
x + 3y = 6
```

```json
POST /api/linear-algebra/solve
{
  "A": [[2, 1], [1, 3]],
  "b": [5, 6]
}
```

Solution: x = 1.29, y = 1.57

### Example 3: Eigenvalues untuk PCA

```json
POST /api/linear-algebra/eigenvalues
{
  "matrix": [
    [4, -2],
    [-2, 1]
  ]
}
```

---

## 🔍 Troubleshooting

### Error: ModuleNotFoundError

```bash
cd /www/wwwroot/solid-revolution/backend
source venv/bin/activate
pip install numpy scipy matplotlib plotly
```

### Error: Import Error

Pastikan** **`__init__.py` ada di folder services:

```bash
touch /www/wwwroot/solid-revolution/backend/services/__init__.py
```

### Error: 500 Internal Server Error

Check logs:

```bash
cat /www/wwwroot/solid-revolution/backend/logs/error.log
```

### Application Won't Start

```bash
cd /www/wwwroot/solid-revolution/backend
source venv/bin/activate
python main.py
# Lihat error message di terminal
```

---

## ✅ Verification Checklist

* [ ]  File** **`main.py` sudah diupdate
* [ ]  File** **`linear_algebra_service.py` sudah ditambahkan
* [ ]  File** **`linear_algebra_visualization.py` sudah ditambahkan
* [ ]  Import test berhasil
* [ ]  Application restart berhasil
* [ ]  Root endpoint menampilkan module linear\_algebra
* [ ]  Test determinant berhasil
* [ ]  API docs menampilkan endpoint baru
* [ ]  Visualisasi matrix muncul

---

## 🎉 Fitur yang Ditambahkan

### 1.** ****Matrix Determinant**

* Calculate determinant
* Check if matrix is singular
* Symbolic calculation for small matrices

### 2.** ****Matrix Inverse**

* Calculate inverse matrix
* Verification A × A⁻¹ = I
* Condition number analysis

### 3.** ****Eigenvalues & Eigenvectors**

* Calculate eigenvalues
* Calculate eigenvectors
* Visualisasi 2D/3D eigenvectors
* Diagonalization check

### 4.** ****Matrix Decomposition**

* LU Decomposition
* QR Decomposition
* SVD (Singular Value Decomposition)
* Cholesky Decomposition
* Visualisasi untuk SVD

### 5.** ****Linear System Solver**

* Solve Ax = b
* Verification and residual
* Condition number

### 6.** ****Matrix Operations**

* Addition
* Subtraction
* Multiplication
* Transpose
* Scalar multiplication
* Matrix power

### 7.** ****Matrix Rank**

* Calculate rank
* Check if full rank

---

## 📈 Next Steps

Setelah fitur ini berjalan, Anda bisa:

1. **Buat Frontend** untuk Linear Algebra
2. **Tambahkan fitur AI** untuk explain step-by-step
3. **Tambahkan formula matematika lain**:
   * Differential Equations Solver
   * Optimization Problems
   * Fourier Transform
   * Numerical Methods

---

## 📞 Support

Jika ada error atau pertanyaan, check:

1. Logs:** **`/www/wwwroot/solid-revolution/backend/logs/error.log`
2. API Docs:** **`http://103.127.139.243/docs`
3. Process:** **`ps aux | grep uvicorn`

**Selamat mencoba! 🚀**
