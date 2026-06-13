import React, { useState } from 'react';

export const AttendanceCalculator: React.FC = () => {
  const [present, setPresent] = useState(15);
  const [total, setTotal] = useState(20);
  const [target, setTarget] = useState(75);

  const currentPercentage = total > 0 ? (present / total) * 100 : 0;

  const calculateRequired = () => {
    if (total === 0 || target <= 0) return { action: 'none', count: 0 };
    
    if (currentPercentage < target) {
      // Must attend 'x' more classes consecutively
      // (present + x) / (total + x) = target / 100
      // 100 * present + 100 * x = target * total + target * x
      // (100 - target) * x = target * total - 100 * present
      const x = Math.ceil((target * total - 100 * present) / (100 - target));
      return { action: 'attend', count: Math.max(0, x) };
    } else {
      // Afford to skip 'y' classes consecutively
      // present / (total + y) = target / 100
      // 100 * present = target * total + target * y
      // target * y = 100 * present - target * total
      const y = Math.floor((100 * present - target * total) / target);
      return { action: 'skip', count: Math.max(0, y) };
    }
  };

  const result = calculateRequired();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Lectures Present</label>
          <input 
            type="number" 
            value={present} 
            onChange={(e) => setPresent(Math.max(0, parseInt(e.target.value) || 0))} 
            className="option-input"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Total Lectures</label>
          <input 
            type="number" 
            value={total} 
            onChange={(e) => setTotal(Math.max(0, parseInt(e.target.value) || 0))} 
            className="option-input"
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Target Attendance Percentage (%)</label>
        <input 
          type="number" 
          value={target} 
          onChange={(e) => setTarget(Math.min(100, Math.max(1, parseInt(e.target.value) || 0)))} 
          className="option-input"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Current Attendance</span>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: currentPercentage >= target ? '#1f7244' : '#c53030', margin: '0.25rem 0' }}>
            {currentPercentage.toFixed(1)}%
          </h3>
        </div>
        
        <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {result.action === 'attend' ? (
            <>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c53030' }}>🔴 Actions Needed</span>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0.25rem 0' }}>Attend <strong>{result.count}</strong> class{result.count > 1 ? 'es' : ''} in a row</p>
            </>
          ) : result.action === 'skip' ? (
            <>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1f7244' }}>🟢 Safe Buffer</span>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0.25rem 0' }}>Can skip <strong>{result.count}</strong> class{result.count > 1 ? 'es' : ''} safely</p>
            </>
          ) : (
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Add parameters to calculate</span>
          )}
        </div>
      </div>
    </div>
  );
};
