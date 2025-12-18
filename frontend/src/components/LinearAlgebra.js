import React, { useState, useRef } from 'react';
import './LinearAlgebra.css';
import { MdCalculate, MdRefresh, MdInfo, MdCheckCircle } from 'react-icons/md';

function LinearAlgebra({ onCalculate, loading }) {
  const formRef = useRef(null);
  const [operation, setOperation] = useState('determinant');
  const [matrixA, setMatrixA] = useState([
    [1, 2],
    [3, 4]
  ]);
  const [matrixB, setMatrixB] = useState([
    [1, 0],
    [0, 1]
  ]);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [decompositionMethod, setDecompositionMethod] = useState('lu');
  const [scalar, setScalar] = useState(2);
  const [vectorB, setVectorB] = useState([1, 2]);
  const [matrixBRows, setMatrixBRows] = useState(2);
  const [matrixBCols, setMatrixBCols] = useState(2);

  // Operation descriptions
  const operationDescriptions = {
    determinant: {
      title: 'Hitung Determinan',
      desc: 'Hitung determinan matriks A. Digunakan untuk mengecek apakah matriks dapat diinvers.',
      needsMatrixB: false,
      tips: 'Matriks harus bujur sangkar (n×n)'
    },
    inverse: {
      title: 'Hitung Invers',
      desc: 'Hitung matriks invers A⁻¹. Hasil kali A dan A⁻¹ akan menghasilkan matriks identitas.',
      needsMatrixB: false,
      tips: 'Determinan tidak boleh 0'
    },
    eigenvalues: {
      title: 'Eigenvalues & Eigenvectors',
      desc: 'Temukan nilai eigen (λ) dan vektor eigen dari matriks A.',
      needsMatrixB: false,
      tips: 'Cocok untuk analisis stabilitas sistem'
    },
    decomposition: {
      title: 'Dekomposisi Matriks',
      desc: 'Dekomposisi matriks A menjadi komponen penyusunnya (LU, QR, SVD, atau Cholesky).',
      needsMatrixB: false,
      tips: 'Pilih metode dekomposisi di bawah'
    },
    solve: {
      title: 'Selesaikan Sistem Linear',
      desc: 'Selesaikan sistem persamaan linear Ax = b untuk mencari nilai x.',
      needsMatrixB: false,
      tips: 'Masukkan matriks A dan vektor b'
    },
    add: {
      title: 'Penjumlahan Matriks',
      desc: 'Hitung hasil penjumlahan matriks A + B.',
      needsMatrixB: true,
      tips: 'Dimensi A dan B harus sama'
    },
    subtract: {
      title: 'Pengurangan Matriks',
      desc: 'Hitung hasil pengurangan matriks A - B.',
      needsMatrixB: true,
      tips: 'Dimensi A dan B harus sama'
    },
    multiply: {
      title: 'Perkalian Matriks',
      desc: 'Hitung hasil perkalian matriks A × B.',
      needsMatrixB: true,
      tips: 'Jumlah kolom A harus sama dengan jumlah baris B'
    },
    transpose: {
      title: 'Transpose Matriks',
      desc: 'Tukar baris dan kolom matriks A.',
      needsMatrixB: false,
      tips: 'Hasil akan berukuran (kolom × baris)'
    },
    scalar_multiply: {
      title: 'Perkalian Skalar',
      desc: 'Kalikan setiap elemen matriks A dengan angka k.',
      needsMatrixB: false,
      tips: 'Masukkan nilai skalar di bawah'
    },
    power: {
      title: 'Pangkat Matriks',
      desc: 'Hitung matriks A dipangkatkan n (A^n).',
      needsMatrixB: false,
      tips: 'Matriks harus bujur sangkar (n×n)'
    },
    rank: {
      title: 'Rank Matriks',
      desc: 'Hitung rank matriks A (jumlah baris/kolom linear independent).',
      needsMatrixB: false,
      tips: 'Rank ≤ min(baris, kolom)'
    }
  };

  const currentOp = operationDescriptions[operation] || {};

  // Preset examples
  const presetExamples = {
    '2x2_simple': {
      name: '2×2',
      rows: 2,
      cols: 2,
      data: [[1, 2], [3, 4]]
    },
    '3x3_identity': {
      name: 'Identitas',
      rows: 3,
      cols: 3,
      data: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    },
    '3x3_random': {
      name: '3×3',
      rows: 3,
      cols: 3,
      data: [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]]
    }
  };

  const initializeMatrix = (r, c) => {
    return Array(r).fill().map(() => Array(c).fill(0));
  };

  const handleMatrixChange = (matrix, i, j, value, setMatrix) => {
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const handleDimensionChange = (newRows, newCols) => {
    setRows(newRows);
    setCols(newCols);
    if (newRows !== matrixA.length || newCols !== matrixA[0]?.length) {
      setMatrixA(initializeMatrix(newRows, newCols));
    }
  };

  const handleMatrixBDimensionChange = (newRows, newCols) => {
    setMatrixBRows(newRows);
    setMatrixBCols(newCols);
    if (newRows !== matrixB.length || newCols !== matrixB[0]?.length) {
      setMatrixB(initializeMatrix(newRows, newCols));
    }
  };

  const handleVectorBChange = (index, value) => {
    const newVector = [...vectorB];
    newVector[index] = parseFloat(value) || 0;
    setVectorB(newVector);
  };

  const applyPreset = (preset, isMatrixB = false) => {
    if (isMatrixB) {
      handleMatrixBDimensionChange(preset.rows, preset.cols);
      setMatrixB(preset.data.map(row => [...row]));
    } else {
      handleDimensionChange(preset.rows, preset.cols);
      setMatrixA(preset.data.map(row => [...row]));
    }
  };

  const resetMatrix = () => {
    setMatrixA(initializeMatrix(rows, cols));
  };

  const handleOperationClick = (operationName) => {
    setOperation(operationName);
    
    // Smooth scroll to form on mobile (width < 768px)
    if (window.innerWidth < 768 && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint, payload;

      switch (operation) {
        case 'determinant':
          endpoint = '/api/linear-algebra/determinant';
          payload = { matrix: matrixA };
          break;

        case 'inverse':
          endpoint = '/api/linear-algebra/inverse';
          payload = { matrix: matrixA };
          break;

        case 'eigenvalues':
          endpoint = '/api/linear-algebra/eigenvalues';
          payload = { matrix: matrixA };
          break;

        case 'decomposition':
          endpoint = '/api/linear-algebra/decomposition';
          payload = { matrix: matrixA, method: decompositionMethod };
          break;

        case 'solve':
          endpoint = '/api/linear-algebra/solve';
          payload = { A: matrixA, b: vectorB };
          break;

        case 'add':
        case 'subtract':
        case 'multiply':
          endpoint = '/api/linear-algebra/operations';
          payload = {
            operation,
            matrix_a: matrixA,
            matrix_b: matrixB
          };
          break;

        case 'transpose':
        case 'scalar_multiply':
        case 'power':
          endpoint = '/api/linear-algebra/operations';
          payload = {
            operation,
            matrix_a: matrixA,
            scalar
          };
          break;

        case 'rank':
          endpoint = '/api/linear-algebra/rank';
          payload = { matrix: matrixA };
          break;

        default:
          throw new Error('Unknown operation');
      }

      onCalculate(endpoint, payload);
    } catch (err) {
      console.error('Error preparing calculation:', err);
    }
  };

  return (
    <div className="linear-algebra-container">
      {/* Operation Selector Card */}
      <div className="operation-selector-card">
        <div className="operation-header">
          <h2>Pilih Operasi</h2>
          <p className="subtitle">Tentukan operasi linear algebra apa yang ingin Anda lakukan</p>
        </div>

        <div className="operation-grid">
          <div className="operation-column">
            <h3 className="column-title">Analisis Dasar</h3>
            {['determinant', 'inverse', 'rank'].map(op => (
              <button
                key={op}
                className={`operation-btn ${operation === op ? 'active' : ''}`}
                onClick={() => handleOperationClick(op)}
              >
                <span className="op-label">{operationDescriptions[op].title}</span>
                <span className="op-icon">→</span>
              </button>
            ))}
          </div>

          <div className="operation-column">
            <h3 className="column-title">Transformasi</h3>
            {['eigenvalues', 'decomposition', 'transpose'].map(op => (
              <button
                key={op}
                className={`operation-btn ${operation === op ? 'active' : ''}`}
                onClick={() => handleOperationClick(op)}
              >
                <span className="op-label">{operationDescriptions[op].title}</span>
                <span className="op-icon">→</span>
              </button>
            ))}
          </div>

          <div className="operation-column">
            <h3 className="column-title">Operasi Matriks</h3>
            {['add', 'subtract', 'multiply', 'scalar_multiply', 'power'].map(op => (
              <button
                key={op}
                className={`operation-btn ${operation === op ? 'active' : ''}`}
                onClick={() => handleOperationClick(op)}
              >
                <span className="op-label">{operationDescriptions[op].title}</span>
                <span className="op-icon">→</span>
              </button>
            ))}
          </div>

          <div className="operation-column">
            <h3 className="column-title">Sistem Linear</h3>
            {['solve'].map(op => (
              <button
                key={op}
                className={`operation-btn ${operation === op ? 'active' : ''}`}
                onClick={() => handleOperationClick(op)}
              >
                <span className="op-label">{operationDescriptions[op].title}</span>
                <span className="op-icon">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Operation Info Card */}
      <div className="operation-info-card">
        <div className="info-header">
          <MdInfo className="info-icon" />
          <div>
            <h3>{currentOp.title}</h3>
            <p>{currentOp.desc}</p>
          </div>
        </div>
        <div className="info-footer">
          <MdCheckCircle className="tips-icon" />
          <span className="tips-text">{currentOp.tips}</span>
        </div>
      </div>

      {/* Main Form */}
      <form className="linear-algebra-form" ref={formRef} onSubmit={handleSubmit}>
        {/* Matrix A Section */}
        <div className="matrix-section">
          <div className="section-header">
            <div className="section-title-group">
              <h3>Matriks A (Matriks Utama)</h3>
              <span className="matrix-label-badge">Masukkan di sini</span>
            </div>
            <div className="section-actions">
              <button
                type="button"
                className="btn-reset"
                onClick={resetMatrix}
                title="Reset ke nol"
              >
                <MdRefresh /> Reset
              </button>
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="dimension-section">
            <div className="dimension-input">
              <label htmlFor="rows">Baris</label>
              <div className="input-with-buttons">
                <button
                  type="button"
                  className="dim-btn minus"
                  onClick={() => handleDimensionChange(Math.max(1, rows - 1), cols)}
                  disabled={rows <= 1}
                >
                  −
                </button>
                <input
                  id="rows"
                  type="number"
                  min="1"
                  max="10"
                  value={rows}
                  onChange={(e) => handleDimensionChange(parseInt(e.target.value) || 1, cols)}
                  className="dim-input"
                />
                <button
                  type="button"
                  className="dim-btn plus"
                  onClick={() => handleDimensionChange(Math.min(10, rows + 1), cols)}
                  disabled={rows >= 10}
                >
                  +
                </button>
              </div>
            </div>

            <div className="dimension-input">
              <label htmlFor="cols">Kolom</label>
              <div className="input-with-buttons">
                <button
                  type="button"
                  className="dim-btn minus"
                  onClick={() => handleDimensionChange(rows, Math.max(1, cols - 1))}
                  disabled={cols <= 1}
                >
                  −
                </button>
                <input
                  id="cols"
                  type="number"
                  min="1"
                  max="10"
                  value={cols}
                  onChange={(e) => handleDimensionChange(rows, parseInt(e.target.value) || 1)}
                  className="dim-input"
                />
                <button
                  type="button"
                  className="dim-btn plus"
                  onClick={() => handleDimensionChange(rows, Math.min(10, cols + 1))}
                  disabled={cols >= 10}
                >
                  +
                </button>
              </div>
            </div>

            <div className="preset-buttons">
              <span className="preset-label">Template:</span>
              {Object.entries(presetExamples).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  className="preset-btn"
                  onClick={() => applyPreset(preset)}
                  title={preset.name}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Matrix A Input Grid */}
          <div className="matrix-input-container">
            <div className="matrix-input">
              {matrixA.map((row, i) => (
                <div key={`row-${i}`} className="matrix-row">
                  <span className="row-label">A{i + 1}</span>
                  {row.map((val, j) => (
                    <input
                      key={`cell-${i}-${j}`}
                      type="number"
                      value={val}
                      onChange={(e) =>
                        handleMatrixChange(matrixA, i, j, e.target.value, setMatrixA)
                      }
                      className="matrix-cell"
                      step="0.01"
                      placeholder="0"
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="matrix-size-info">
              {rows} × {cols}
            </div>
          </div>
        </div>

        {/* Matrix B Section */}
        {['add', 'subtract', 'multiply'].includes(operation) && (
          <div className="matrix-section matrix-b-section">
            <div className="section-header">
              <div className="section-title-group">
                <h3>🟢 Matriks B (Matriks Kedua)</h3>
                <span className="matrix-label-badge">Masukkan di sini</span>
              </div>
            </div>

            {/* B Dimension Controls */}
            <div className="dimension-section">
              <div className="dimension-input">
                <label htmlFor="matrixb-rows">Baris</label>
                <div className="input-with-buttons">
                  <button
                    type="button"
                    className="dim-btn minus"
                    onClick={() =>
                      handleMatrixBDimensionChange(Math.max(1, matrixBRows - 1), matrixBCols)
                    }
                    disabled={matrixBRows <= 1}
                  >
                    −
                  </button>
                  <input
                    id="matrixb-rows"
                    type="number"
                    min="1"
                    max="10"
                    value={matrixBRows}
                    onChange={(e) =>
                      handleMatrixBDimensionChange(parseInt(e.target.value) || 1, matrixBCols)
                    }
                    className="dim-input"
                  />
                  <button
                    type="button"
                    className="dim-btn plus"
                    onClick={() =>
                      handleMatrixBDimensionChange(Math.min(10, matrixBRows + 1), matrixBCols)
                    }
                    disabled={matrixBRows >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="dimension-input">
                <label htmlFor="matrixb-cols">Kolom</label>
                <div className="input-with-buttons">
                  <button
                    type="button"
                    className="dim-btn minus"
                    onClick={() =>
                      handleMatrixBDimensionChange(matrixBRows, Math.max(1, matrixBCols - 1))
                    }
                    disabled={matrixBCols <= 1}
                  >
                    −
                  </button>
                  <input
                    id="matrixb-cols"
                    type="number"
                    min="1"
                    max="10"
                    value={matrixBCols}
                    onChange={(e) =>
                      handleMatrixBDimensionChange(matrixBRows, parseInt(e.target.value) || 1)
                    }
                    className="dim-input"
                  />
                  <button
                    type="button"
                    className="dim-btn plus"
                    onClick={() =>
                      handleMatrixBDimensionChange(matrixBRows, Math.min(10, matrixBCols + 1))
                    }
                    disabled={matrixBCols >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="preset-buttons">
                <span className="preset-label">Template:</span>
                {Object.entries(presetExamples).map(([key, preset]) => (
                  <button
                    key={key}
                    type="button"
                    className="preset-btn"
                    onClick={() => applyPreset(preset, true)}
                    title={preset.name}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix B Input Grid */}
            <div className="matrix-input-container">
              <div className="matrix-input">
                {matrixB.map((row, i) => (
                  <div key={`rowb-${i}`} className="matrix-row">
                    <span className="row-label">B{i + 1}</span>
                    {row.map((val, j) => (
                      <input
                        key={`cellb-${i}-${j}`}
                        type="number"
                        value={val}
                        onChange={(e) =>
                          handleMatrixChange(matrixB, i, j, e.target.value, setMatrixB)
                        }
                        className="matrix-cell"
                        step="0.01"
                        placeholder="0"
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="matrix-size-info">
                {matrixBRows} × {matrixBCols}
              </div>
            </div>
          </div>
        )}

        {/* Vector B for Solve */}
        {operation === 'solve' && (
          <div className="vector-section">
            <h3>🟢 Vektor b (Hasil yang Dicari)</h3>
            <p className="section-hint">Untuk sistem persamaan: Ax = b</p>
            <div className="vector-input">
              {vectorB.map((val, i) => (
                <div key={`vec-${i}`} className="vector-item">
                  <label>b{i + 1}</label>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => handleVectorBChange(i, e.target.value)}
                    className="vector-cell"
                    step="0.01"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decomposition Method */}
        {operation === 'decomposition' && (
          <div className="option-section">
            <label>Pilih Metode Dekomposisi:</label>
            <div className="method-grid">
              {[
                { value: 'lu', label: 'LU', desc: 'A = P·L·U' },
                { value: 'qr', label: 'QR', desc: 'A = Q·R' },
                { value: 'svd', label: 'SVD', desc: 'A = U·Σ·V^T' },
                { value: 'cholesky', label: 'Cholesky', desc: 'A = L·L^T' }
              ].map(method => (
                <button
                  key={method.value}
                  type="button"
                  className={`method-card ${decompositionMethod === method.value ? 'active' : ''}`}
                  onClick={() => setDecompositionMethod(method.value)}
                >
                  <span className="method-label">{method.label}</span>
                  <span className="method-desc">{method.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scalar Input */}
        {['scalar_multiply', 'power'].includes(operation) && (
          <div className="option-section">
            <label htmlFor="scalar">
              {operation === 'scalar_multiply' ? 'Nilai Skalar (k):' : 'Pangkat (n):'}
            </label>
            <input
              id="scalar"
              type="number"
              value={scalar}
              onChange={(e) => setScalar(parseFloat(e.target.value) || 0)}
              className="scalar-input"
              step="0.01"
              placeholder={operation === 'scalar_multiply' ? 'Masukkan nilai skalar' : 'Masukkan pangkat'}
            />
            {operation === 'scalar_multiply' && (
              <p className="input-hint">Setiap elemen matriks akan dikalikan dengan {scalar}</p>
            )}
            {operation === 'power' && (
              <p className="input-hint">Matriks A akan dipangkatkan {Math.floor(scalar)}</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          <MdCalculate />
          {loading ? 'Sedang Menghitung...' : 'Hitung Sekarang'}
        </button>
      </form>
    </div>
  );
}

export default LinearAlgebra;
