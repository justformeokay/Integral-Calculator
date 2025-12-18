import React, { useEffect, useRef } from 'react';
import './Plot3D.css';
import { MdDownload } from 'react-icons/md';

function Plot3D({ plotData }) {
  const containerRef = useRef(null);

  const handleDownload = () => {
    if (window.Plotly && containerRef.current) {
      window.Plotly.downloadImage(containerRef.current, {
        format: 'png',
        width: 1200,
        height: 800,
        filename: 'plot_3d_integral'
      });
    }
  };

  useEffect(() => {
    if (containerRef.current && plotData) {
      try {
        const parsedData = JSON.parse(plotData);
        if (window.Plotly) {
          // Configure layout for better mobile interaction and centering
          const layout = {
            ...parsedData.layout,
            autosize: true,
            margin: { l: 0, r: 0, t: 0, b: 0 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            scene: {
              ...parsedData.layout.scene,
              xaxis: { ...parsedData.layout.scene?.xaxis, autorange: true },
              yaxis: { ...parsedData.layout.scene?.yaxis, autorange: true },
              zaxis: { ...parsedData.layout.scene?.zaxis, autorange: true },
            }
          };

          window.Plotly.newPlot(containerRef.current, parsedData.data, layout, {
            responsive: true,
            displayModeBar: false,
            displaylogo: false,
            staticPlot: false
          });

          // Force proper sizing and touch support
          const plotElement = containerRef.current;
          if (plotElement) {
            plotElement.style.width = '100%';
            plotElement.style.height = '100%';
            plotElement.style.touchAction = 'manipulation';
            
            // Ensure Plotly SVG/Canvas fills container properly
            const plotlyMain = plotElement.querySelector('.plotly');
            if (plotlyMain) {
              plotlyMain.style.width = '100%';
              plotlyMain.style.height = '100%';
            }
          }
        }
      } catch (error) {
        console.error('Error rendering 3D plot:', error);
        console.error('Plot data received:', plotData?.substring?.(0, 100));
        containerRef.current.innerHTML = '<p style="padding: 20px; color: #999;">Tidak dapat menampilkan grafik 3D</p>';
      }
    }
  }, [plotData]);

  return (
    <div className="plot-3d-wrapper">
      <button className="download-btn" onClick={handleDownload} title="Download plot 3D">
        <MdDownload /> Download
      </button>
      <div className="plot-3d">
        <div ref={containerRef} className="plotly-container-3d"></div>
      </div>
    </div>
  );
}

export default Plot3D;
