import React, { useState } from 'react';
import './Calculator.css';
import { MdInput, MdFunctions, MdArrowDownward, MdArrowUpward, MdRefresh, MdLightbulb } from 'react-icons/md';

function Calculator({ onCalculate, loading }) {
  const [formData, setFormData] = useState({
    function: 'x**2',
    lowerBound: '0',
    upperBound: '2',
    axis: 'x-axis'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFormData({
      function: 'x**2',
      lowerBound: '0',
      upperBound: '2',
      axis: 'x-axis'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi input
    const lower = parseFloat(formData.lowerBound);
    const upper = parseFloat(formData.upperBound);

    if (isNaN(lower) || isNaN(upper)) {
      alert('Batas atas dan bawah harus berupa angka');
      return;
    }

    if (upper <= lower) {
      alert('Batas atas harus lebih besar dari batas bawah');
      return;
    }

    if (!formData.function.trim()) {
      alert('Masukkan fungsi yang valid');
      return;
    }

    onCalculate(formData);
  };

  return (
    <div className="calculator">
      <form onSubmit={handleSubmit} className="form">
        <h2><MdInput /> Input Perhitungan</h2>

        <div className="form-group">
          <label htmlFor="function"><MdFunctions /> Fungsi (f(x))</label>
          <input
            type="text"
            id="function"
            name="function"
            value={formData.function}
            onChange={handleInputChange}
            placeholder="Contoh: x**2, sin(x), sqrt(x)"
            disabled={loading}
          />
          <small><MdLightbulb /> Gunakan ** untuk pangkat, sin/cos/tan, sqrt, exp, log</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="lowerBound"><MdArrowDownward /> Batas Bawah (a)</label>
            <input
              type="number"
              id="lowerBound"
              name="lowerBound"
              value={formData.lowerBound}
              onChange={handleInputChange}
              step="0.01"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="upperBound"><MdArrowUpward /> Batas Atas (b)</label>
            <input
              type="number"
              id="upperBound"
              name="upperBound"
              value={formData.upperBound}
              onChange={handleInputChange}
              step="0.01"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="axis"><MdRefresh /> Sumbu Rotasi</label>
          <select
            id="axis"
            name="axis"
            value={formData.axis}
            onChange={handleInputChange}
            disabled={loading}
          >
            <option value="x-axis">Sumbu X (Horizontal)</option>
            <option value="y-axis">Sumbu Y (Vertical)</option>
          </select>
        </div>

        <button
          type="submit"
          className={`submit-btn ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Menghitung...
            </>
          ) : (
            <>
              <MdFunctions />
              Hitung Volume
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          style={{
            padding: '12px 20px',
            background: 'transparent',
            border: '2px solid #667eea',
            color: '#667eea',
            borderRadius: '12px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <MdRefresh /> Reset Form
        </button>

        <div className="examples">
          <h3><MdLightbulb /> Contoh Fungsi:</h3>
          <ul>
            <li><code>x**2</code> - Parabola</li>
            <li><code>sqrt(x)</code> - Akar kuadrat</li>
            <li><code>sin(x)</code> - Sinus</li>
            <li><code>1/x</code> - Hiperbola</li>
            <li><code>exp(x)</code> - Eksponensial</li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default Calculator;
