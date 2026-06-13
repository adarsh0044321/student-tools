import React, { useState, useEffect } from 'react';
import type { ToolId } from '../types';
import { toolsList } from '../toolsList';
import { GraduationCap, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentTool: ToolId | null;
  setCurrentTool: (tool: ToolId | null) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTool, setCurrentTool }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        document.documentElement.classList.add('dark-theme');
        return 'dark';
      }
    }
    return 'light';
  });

  const [adblockActive, setAdblockActive] = useState(false);

  useEffect(() => {
    const checkAdblock = () => {
      // Create a dummy ad element with common ad network class names
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'ads advertisement ad-zone doubleclick banner-ad pub_300x250';
      testAd.style.position = 'absolute';
      testAd.style.left = '-9999px';
      testAd.style.top = '-9999px';
      testAd.style.width = '1px';
      testAd.style.height = '1px';
      
      document.body.appendChild(testAd);
      
      // Check if it's hidden by the adblocker rules
      const isBlocked = testAd.offsetHeight === 0 || 
                        window.getComputedStyle(testAd).display === 'none' ||
                        window.getComputedStyle(testAd).visibility === 'hidden';
      
      document.body.removeChild(testAd);
      
      if (isBlocked) {
        setAdblockActive(true);
      }
    };

    // Wait 1.5s for adblock extensions to analyze and block elements
    const timer = setTimeout(checkAdblock, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleToolSelect = (toolId: ToolId | null) => {
    setCurrentTool(toolId);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="navbar">
        <div className="navbar-container">
          <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); handleToolSelect(null); }} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src="/logo.png" alt="Student Tools Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} />
            <span>Student Tools</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-links" style={{ display: 'flex' }}>
            <div style={{ position: 'relative' }}>
              <a 
                href="#" 
                className="nav-link" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                onClick={(e) => { e.preventDefault(); setToolsDropdownOpen(!toolsDropdownOpen); }}
              >
                All PDF Tools <ChevronDown size={14} />
              </a>
              
              {toolsDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'var(--white)',
                  boxShadow: 'var(--shadow-lg)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  padding: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 220px)',
                  gap: '0.5rem',
                  zIndex: 200,
                  marginTop: '0.5rem'
                }}>
                  {toolsList.map((t) => (
                    <a
                      key={t.id}
                      href="#"
                      style={{
                        padding: '0.6rem 0.8rem',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: currentTool === t.id ? '#e52d27' : 'var(--text-main)',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        display: 'block',
                        transition: '0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--light-bg)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={(e) => { e.preventDefault(); handleToolSelect(t.id); }}
                    >
                      {t.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleToolSelect('merge'); }}>Merge</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleToolSelect('split'); }}>Split</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleToolSelect('compress'); }}>Compress</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleToolSelect('pdf-to-jpg'); }}>PDF to JPG</a>
            
            <a 
              href="#" 
              className="nav-btn" 
              onClick={(e) => { e.preventDefault(); handleToolSelect(null); }}
              style={{ marginLeft: '1rem' }}
            >
              Get Started
            </a>
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '50%',
                backgroundColor: 'var(--light-bg)',
                marginLeft: '0.75rem',
                transition: '0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--light-bg)'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <div style={{ display: 'none' }} className="mobile-toggle-btn">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--white)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            zIndex: 199,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleToolSelect(null); }}>Home</a>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>All Tools</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {toolsList.map((t) => (
                <a
                  key={t.id}
                  href="#"
                  style={{
                    padding: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    textDecoration: 'none'
                  }}
                  onClick={(e) => { e.preventDefault(); handleToolSelect(t.id); }}
                >
                  {t.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-branding">
            <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); handleToolSelect(null); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="/logo.png" alt="Student Tools Logo" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
              <span>Student Tools</span>
            </a>
            <p className="footer-desc">
              Your academic PDF sidekick. Student Tools is 100% free, runs entirely in your web browser (client-side), and never uploads your files to any server. Your homework and essays stay private and secure.
            </p>
          </div>
          <div>
            <h4 className="footer-column-title">Popular Tools</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('merge'); }}>Merge PDF</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('split'); }}>Split PDF</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('compress'); }}>Compress PDF</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('organize'); }}>Organize PDF</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-column-title">Conversions</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('jpg-to-pdf'); }}>JPG to PDF</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('pdf-to-jpg'); }}>PDF to JPG</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('word-to-pdf'); }}>Word to PDF</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('pdf-to-word'); }}>PDF to Word</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-column-title">Security & More</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('protect'); }}>Protect PDF</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('unlock'); }}>Unlock PDF</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('watermark'); }}>Watermark PDF</a></li>
              <li><a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); handleToolSelect('page-numbers'); }}>Page Numbers</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Student Tools. Handcrafted for academic excellence. 📚 Offline-first & 100% Secure.</p>
        </div>
      </footer>

      {/* Adblocker Detected Modal Overlay */}
      {adblockActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: '16px',
            border: '2px solid #e52d27',
            padding: '2.5rem 2rem',
            maxWidth: '480px',
            width: '100%',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xl)',
            color: 'var(--text-main)'
          }}>
            <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1.5rem' }}>🛡️</span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#e52d27', marginBottom: '0.75rem' }}>Adblocker Detected</h2>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              We noticed that you are using an adblocker. Student Tools is <strong>100% free</strong>, secure, and runs entirely on your device (no files are ever uploaded). 
              <br /><br />
              Please whitelist our site or disable your adblocker to support this service and access all PDF tools!
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                width: '100%',
                padding: '0.85rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: '#e52d27',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: '0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c5201b'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e52d27'}
            >
              🔄 Reload Platform
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
