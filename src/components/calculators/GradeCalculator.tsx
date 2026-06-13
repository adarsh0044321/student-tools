import React, { useState } from 'react';

export const GradeCalculator: React.FC = () => {
  const [current, setCurrent] = useState(80);
  const [target, setTarget] = useState(85);
  const [weight, setWeight] = useState(30);

  const calculateRequired = () => {
    if (weight <= 0 || weight >= 100) return 0;
    const wDec = weight / 100;
    // target = current * (1 - wDec) + final * wDec
    // final * wDec = target - current * (1 - wDec)
    // final = (target - current * (1 - wDec)) / wDec
    return (target - current * (1 - wDec)) / wDec;
  };

  const req = calculateRequired();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Current Grade (%)</label>
          <input 
            type="number" 
            value={current} 
            onChange={(e) => setCurrent(parseFloat(e.target.value) || 0)} 
            className="option-input"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Target Grade (%)</label>
          <input 
            type="number" 
            value={target} 
            onChange={(e) => setTarget(parseFloat(e.target.value) || 0)} 
            className="option-input"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Final Exam Weight (%)</label>
        <input 
          type="number" 
          value={weight} 
          onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} 
          className="option-input"
        />
      </div>

      <div style={{
        marginTop: '1.25rem',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--light-bg)',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Required Score on Final</span>
        <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: req > 100 ? '#c53030' : '#e52d27', margin: '0.5rem 0' }}>
          {req.toFixed(1)}%
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          {req > 100 
            ? '⚠️ Extra credit required! Even a 100% on the final is not enough.' 
            : req <= 0 
              ? '🎉 You already secured your target grade! You can get a 0% on the final.' 
              : `You need a score of ${req.toFixed(1)}% on the final to get ${target}% overall.`}
        </p>
      </div>
    </div>
  );
};
