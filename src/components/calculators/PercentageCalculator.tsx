import React, { useState } from 'react';

export const PercentageCalculator: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [x1, setX1] = useState(15);
  const [y1, setY1] = useState(200);
  const res1 = (x1 / 100) * y1;

  // Mode 2: X is what percentage of Y?
  const [x2, setX2] = useState(30);
  const [y2, setY2] = useState(120);
  const res2 = y2 > 0 ? (x2 / y2) * 100 : 0;

  // Mode 3: Percentage increase/decrease from X to Y?
  const [x3, setX3] = useState(50);
  const [y3, setY3] = useState(75);
  const res3 = x3 > 0 ? ((y3 - x3) / x3) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* Block 1 */}
      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem', color: '#e52d27' }}>What is X% of Y?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="number" 
            value={x1} 
            onChange={(e) => setX1(parseFloat(e.target.value) || 0)} 
            placeholder="X"
            className="option-input"
          />
          <span style={{ fontSize: '0.8rem', textAlign: 'center', fontWeight: 700 }}>% of</span>
          <input 
            type="number" 
            value={y1} 
            onChange={(e) => setY1(parseFloat(e.target.value) || 0)} 
            placeholder="Y"
            className="option-input"
          />
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.88rem', fontWeight: 700 }}>
          Result: <span style={{ color: '#e52d27', fontSize: '1.1rem' }}>{res1.toFixed(2)}</span>
        </div>
      </div>

      {/* Block 2 */}
      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem', color: '#e52d27' }}>X is what % of Y?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="number" 
            value={x2} 
            onChange={(e) => setX2(parseFloat(e.target.value) || 0)} 
            placeholder="X"
            className="option-input"
          />
          <span style={{ fontSize: '0.8rem', textAlign: 'center', fontWeight: 700 }}>is what % of</span>
          <input 
            type="number" 
            value={y2} 
            onChange={(e) => setY2(parseFloat(e.target.value) || 0)} 
            placeholder="Y"
            className="option-input"
          />
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.88rem', fontWeight: 700 }}>
          Result: <span style={{ color: '#e52d27', fontSize: '1.1rem' }}>{res2.toFixed(2)}%</span>
        </div>
      </div>

      {/* Block 3 */}
      <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem', color: '#e52d27' }}>Percentage Increase/Decrease (from X to Y)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="number" 
            value={x3} 
            onChange={(e) => setX3(parseFloat(e.target.value) || 0)} 
            placeholder="From X"
            className="option-input"
          />
          <span style={{ fontSize: '0.8rem', textAlign: 'center', fontWeight: 700 }}>to</span>
          <input 
            type="number" 
            value={y3} 
            onChange={(e) => setY3(parseFloat(e.target.value) || 0)} 
            placeholder="To Y"
            className="option-input"
          />
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.88rem', fontWeight: 700 }}>
          Change: <span style={{ color: res3 >= 0 ? '#1f7244' : '#c53030', fontSize: '1.1rem' }}>
            {res3 >= 0 ? `+${res3.toFixed(2)}% (Increase)` : `${res3.toFixed(2)}% (Decrease)`}
          </span>
        </div>
      </div>
    </div>
  );
};
