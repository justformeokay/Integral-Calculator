import React, { useState, useEffect } from 'react';
import './ComingSoonModal.css';
import { MdClose, MdLock, MdConstruction } from 'react-icons/md';

function ComingSoonModal({ isOpen, feature, onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isAnimating ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <MdClose />
        </button>

        <div className="modal-icon-container">
          <div className="modal-icon-wrapper">
            <MdConstruction className="modal-icon-main" />
            <MdLock className="modal-icon-lock" />
          </div>
        </div>

        <h2 className="modal-title">Fitur Dalam Pengembangan</h2>

        <p className="modal-subtitle">{feature?.label}</p>

        <div className="modal-description">
          <p className="feature-desc">{feature?.description}</p>
          <p className="coming-soon-text">Fitur ini sedang dalam tahap pengembangan dan akan segera tersedia dalam versi mendatang.</p>
        </div>

        <div className="modal-features">
          <h3>Fitur yang akan hadir:</h3>
          <ul>
            {feature?.id === 'linear' && (
              <>
                <li>✓ Dekomposisi SVD dan QR</li>
                <li>✓ Perhitungan Eigenvalue & Eigenvector</li>
                <li>✓ Sistem Persamaan Linear</li>
                <li>✓ Transformasi Linear</li>
              </>
            )}
            {feature?.id === 'matrix' && (
              <>
                <li>✓ Determinan & Invers Matriks</li>
                <li>✓ Operasi Matriks (Penjumlahan, Perkalian)</li>
                <li>✓ Rank & Trace</li>
                <li>✓ Gauss-Jordan Elimination</li>
              </>
            )}
          </ul>
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>
            Tutup
          </button>
          <button className="btn-notify" onClick={onClose}>
            Notifikasi Ketika Tersedia
          </button>
        </div>

        <div className="modal-progress">
          <p className="progress-label">Progress Pengembangan</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="progress-text">Estimasi rilis: Q1 2026</p>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonModal;
