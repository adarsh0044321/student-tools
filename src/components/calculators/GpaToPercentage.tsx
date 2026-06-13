import React, { useState } from 'react';

type GpaScale = '4.0' | '10.0' | '10.0-cbse';

export const GpaToPercentage: React.FC = () => {
  const [gpa, setGpa] = useState(8.5);
  const [scale, setScale] = useState<GpaScale>('10.0-cbse');

  const convert = () => {
    if (scale === '4.0') {
      // 4.0 scale percentage (e.g. 4.0 GPA is 100%, 3.0 is 75%)
      return Math.min(100, Math.max(0, (gpa / 4) * 100));
    }
    if (scale === '10.0-cbse') {
      // CBSE standard formula: GPA * 9.5
      return Math.min(100, Math.max(0, gpa * 9.5));
    }
    // Standard 10.0 scale (e.g. 10.0 GPA is 100%)
    return Math.min(100, Math.max(0, gpa * 10));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Enter GPA</label>
          <input 
            type="number" 
            value={gpa} 
            onChange={(e) => setGpa(parseFloat(e.target.value) || 0)} 
            step="0.05"
            className="option-input"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Select Scale</label>
          <select 
            value={scale} 
            onChange={(e: any) => setScale(e.target.value)} 
            className="option-input"
          >
            <option value="10.0-cbse">10.0 Scale (CBSE: GPA * 9.5)</option>
            <option value="10.0">10.0 Scale (Standard: GPA * 10)</option>
            <option value="4.0">4.0 Scale (US: GPA / 4.0 * 100)</option>
          </select>
        </div>
      </div>

      <div style={{
        marginTop: '1.25rem',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--light-bg)',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Equivalent Percentage</span>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#e52d27', margin: '0.5rem 0' }}>
          {convert().toFixed(1)}%
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Converted GPA of {gpa} on {scale === '4.0' ? '4.0 scale' : scale === '10.0' ? '10.0 standard scale' : '10.0 CBSE scale'}.
        </p>
      </div>
    </div>
  );
};
