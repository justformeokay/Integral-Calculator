import React, { useEffect, useRef } from 'react';
import './Plot2D.css';

function Plot2D({ plotData }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && plotData) {
      try {
        const parsedData = JSON.parse(plotData);
        if (window.Plotly) {
          window.Plotly.newPlot(containerRef.current, parsedData.data, parsedData.layout, {
            responsive: true,
            displayModeBar: true
          });
        }
      } catch (error) {
        console.error('Error rendering 2D plot:', error);
        console.error('Plot data received:', plotData?.substring?.(0, 100));
        containerRef.current.innerHTML = '<p style="padding: 20px; color: #999;">Tidak dapat menampilkan grafik</p>';
      }
    }
  }, [plotData]);

  return (
    <div className="plot-2d">
      <div ref={containerRef} className="plotly-container"></div>
    </div>
  );
}

export default Plot2D;
