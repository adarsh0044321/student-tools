import React, { useState } from 'react';
import type { ToolId } from '../types';
import { toolsList } from '../toolsList';
import { GraduationCap, Menu, X, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentTool: ToolId | null;
  setCurrentTool: (tool: ToolId | null) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTool, setCurrentTool }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

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
          <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); handleToolSelect(null); }}>
            <span className="nav-brand-logo">🎓</span>
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
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
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
                        color: currentTool === t.id ? '#e52d27' : '#1e293b',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        display: 'block',
                        transition: '0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
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
          </nav>

          {/* Mobile Menu Icon */}
          <div style={{ display: 'none' }} className="mobile-toggle-btn">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b' }}
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
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '1.5rem',
            zIndex: 199,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleToolSelect(null); }}>Home</a>
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>All Tools</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {toolsList.map((t) => (
                <a
                  key={t.id}
                  href="#"
                  style={{
                    padding: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#1e293b',
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
            <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); handleToolSelect(null); }}>
              🎓 <span>Student Tools</span>
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
    </div>
  );
};
