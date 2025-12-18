import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import Results from './components/Results';
import ComingSoonModal from './components/ComingSoonModal';
import { MdCalculate, MdErrorOutline } from 'react-icons/md';

function App() {
  const [activeMenu, setActiveMenu] = useState('integral');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comingSoonFeature, setComingSoonFeature] = useState(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId);
    setResults(null);
    setError(null);
  };

  const handleComingSoonClick = (feature) => {
    setComingSoonFeature(feature);
    setIsComingSoonOpen(true);
  };

  const handleCalculate = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = 'https://python.karyadeveloperindonesia.com';
      
      const response = await fetch(`${apiUrl}/api/volume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function: formData.function,
          lower_bound: parseFloat(formData.lowerBound),
          upper_bound: parseFloat(formData.upperBound),
          axis: formData.axis
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'API Error');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(
        err.message || 'Terjadi kesalahan saat menghubungi server'
      );
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar 
        activeMenu={activeMenu} 
        onMenuChange={handleMenuChange}
        onComingSoonClick={handleComingSoonClick}
      />
      <div className="app">
        <div className="container">
          <header className="header">
            <h1>
              <MdCalculate />
              Kalkulator Integral
            </h1>
            <p>Hitung volume solid of revolution dengan presisi tinggi</p>
          </header>

          <main className="main-content">
            <Calculator onCalculate={handleCalculate} loading={loading} />
            
            {error && (
              <div className="error-box">
                <MdErrorOutline />
                <div>
                  <strong>Error:</strong> {error}
                </div>
              </div>
            )}
            
            {results && (
              <Results data={results} />
            )}
          </main>

          <footer className="footer">
            <p>Design and Develop by Putra Budianto</p>
            <p>Visit me <a href="https://karyadeveloperindonesia.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>karyadeveloperindonesia.com</a></p>
          </footer>
        </div>
      </div>
      
      <ComingSoonModal 
        isOpen={isComingSoonOpen}
        feature={comingSoonFeature}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </>
  );
}


export default App;
