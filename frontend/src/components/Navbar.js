import React, { useState } from 'react';
import './Navbar.css';
import { MdCalculate, MdLinearScale, MdTableChart, MdLock, MdChevronRight } from 'react-icons/md';

function Navbar({ activeMenu, onMenuChange, onComingSoonClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      id: 'integral',
      label: 'Kalkulus Integral',
      icon: MdCalculate,
      available: true,
      description: 'Hitung volume solid of revolution'
    },
    {
      id: 'linear',
      label: 'Aljabar Linear',
      icon: MdLinearScale,
      available: true,
      description: 'Dekomposisi matriks & eigenvalue'
    },
    {
      id: 'matrix',
      label: 'Matriks',
      icon: MdTableChart,
      available: false,
      description: 'Operasi matriks lanjutan'
    }
  ];

  const handleMenuClick = (item) => {
    if (item.available) {
      onMenuChange(item.id);
      setMobileMenuOpen(false);
    } else {
      onComingSoonClick(item);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <MdCalculate className="logo-icon" />
            <span>MathLab</span>
          </div>

          {/* Menu Desktop */}
          <div className="navbar-menu desktop-menu">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  className={`menu-item ${activeMenu === item.id ? 'active' : ''} ${!item.available ? 'locked' : ''}`}
                  onClick={() => handleMenuClick(item)}
                  title={item.description}
                >
                  <IconComponent className="menu-icon" />
                  <span>{item.label}</span>
                  {!item.available && <MdLock className="lock-icon" />}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="navbar-menu mobile-menu">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  className={`menu-item ${activeMenu === item.id ? 'active' : ''} ${!item.available ? 'locked' : ''}`}
                  onClick={() => handleMenuClick(item)}
                >
                  <IconComponent className="menu-icon" />
                  <div className="menu-text">
                    <span className="menu-label">{item.label}</span>
                    <span className="menu-desc">{item.description}</span>
                  </div>
                  {!item.available && <MdLock className="lock-icon" />}
                  {item.available && activeMenu === item.id && <MdChevronRight className="chevron" />}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
