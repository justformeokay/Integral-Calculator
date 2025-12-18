import React, { useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Results from './components/Results';
import { MdCalculate, MdHeartBroken, MdErrorOutline } from 'react-icons/md';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          <p>Made with <MdHeartBroken style={{display: 'inline', color: '#ff6b6b'}} /> for Integral Calculations</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
