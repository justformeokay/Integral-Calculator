import React, { useState } from 'react';
import Plot2D from './Plot2D';
import Plot3D from './Plot3D';
import './Results.css';
import { MdShowChart, Md3dRotation, MdFunctions, MdCalculate, MdLightbulb, MdInfo } from 'react-icons/md';
import { MdShowChart as Chart2DIcon } from 'react-icons/md';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function Results({ data }) {
  const [activeTab, setActiveTab] = useState('2d');

  const formatNumber = (num) => {
    if (typeof num !== 'number') return num;
    return num.toFixed(6);
  };

  const renderIntegralExpression = (expr) => {
    if (!expr) return 'Integral calculation';
    
    // Coba replace LaTeX symbols dengan simbol Unicode yang lebih baik
    return expr
      .replace(/\\pi/g, 'π')
      .replace(/\\cdot/g, '·')
      .replace(/\\left/g, '')
      .replace(/\\right/g, '')
      .replace(/\^/g, '^');
  };

  return (
    <div className="results">
      <div className="results-header">
        <h2><MdShowChart /> Hasil Perhitungan</h2>
      </div>

      <div className="results-info">
        <div className="info-item">
          <label><MdFunctions /> Fungsi</label>
          <div className="info-value">{data.function}</div>
        </div>

        <div className="info-item">
          <label><MdCalculate /> Interval</label>
          <div className="info-value">[{data.bounds.lower}, {data.bounds.upper}]</div>
        </div>

        <div className="info-item">
          <label><Md3dRotation /> Sumbu Rotasi</label>
          <div className="info-value">
            {data.axis === 'x-axis' ? '↔️ Sumbu X' : '↕️ Sumbu Y'}
          </div>
        </div>
      </div>

      <div className="results-volume">
        <div className="volume-card">
          <h3>Volume Numerik</h3>
          <div className="volume-value">{formatNumber(data.volume_numerical)}</div>
          <p className="volume-unit">satuan kubik</p>
        </div>

        {data.volume_symbolic && (
          <div className="volume-card">
            <h3>Volume Simbolik</h3>
            <div className="volume-value-symbolic">{data.volume_symbolic}</div>
          </div>
        )}
      </div>

      {data.integral_expression && (
        <div className="integral-expression">
          <h3><MdInfo /> Ekspresi Integral</h3>
          <div className="expression-box">
            <BlockMath>{`\\int ${data.function} dx = ${data.integral_expression}`}</BlockMath>
          </div>
        </div>
      )}

      <div className="visualization-tabs">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === '2d' ? 'active' : ''}`}
            onClick={() => setActiveTab('2d')}
          >
            <Chart2DIcon /> Grafik 2D
          </button>
          <button
            className={`tab-btn ${activeTab === '3d' ? 'active' : ''}`}
            onClick={() => setActiveTab('3d')}
          >
            <Md3dRotation /> Grafik 3D
          </button>
        </div>

        <div className="tab-content">
          {activeTab === '2d' && data.plot_2d && (
            <Plot2D plotData={data.plot_2d} />
          )}
          {activeTab === '3d' && data.plot_3d && (
            <Plot3D plotData={data.plot_3d} />
          )}
        </div>
      </div>

      <div className="formula-info">
        <h3><MdLightbulb /> Formula yang Digunakan</h3>
        <div className="formula-box">
          {data.axis === 'x-axis' ? (
            <div>
              <p><strong>Disk Method (Metode Cakram):</strong></p>
              <BlockMath>V = \pi \int_a^b [f(x)]^2 \, dx</BlockMath>
            </div>
          ) : (
            <div>
              <p><strong>Shell Method (Metode Kulit):</strong></p>
              <BlockMath>V = 2\pi \int_a^b x \cdot f(x) \, dx</BlockMath>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
