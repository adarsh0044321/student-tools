import React, { useState } from 'react';

export const ScientificCalculator: React.FC = () => {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');

  const handleBtnClick = (val: string) => {
    if (val === 'C') {
      setExpr('');
      setResult('');
    } else if (val === '=') {
      try {
        // Safe evaluation mockup using standard JS Math functions
        let san = expr
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/√\(/g, 'Math.sqrt(')
          .replace(/\^/g, '**');

        const evalResult = new Function(`return ${san}`)();
        setResult(String(evalResult));
      } catch (err) {
        setResult('Error');
      }
    } else if (val === 'back') {
      setExpr(expr.slice(0, -1));
    } else {
      setExpr(expr + val);
    }
  };

  const buttons = [
    ['sin(', 'cos(', 'tan(', '√('],
    ['log(', 'ln(', 'π', '^'],
    ['(', ')', 'back', 'C'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {/* Screen */}
      <div style={{
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        textAlign: 'right',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'monospace'
      }}>
        <div style={{ fontSize: '1rem', color: '#94a3b8', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {expr || '0'}
        </div>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#e52d27', overflowX: 'auto', whiteSpace: 'nowrap', marginTop: '0.25rem' }}>
          {result || '0'}
        </div>
      </div>

      {/* Keyboard Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {buttons.map((row, rIdx) => (
          <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleBtnClick(btn)}
                style={{
                  padding: '0.65rem 0',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  backgroundColor: btn === '=' 
                    ? '#e52d27' 
                    : ['C', 'back'].includes(btn) 
                      ? '#ff6a00' 
                      : 'var(--light-bg)',
                  color: ['=', 'C', 'back'].includes(btn) ? '#ffffff' : 'var(--text-main)',
                  transition: '0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (btn !== '=') e.currentTarget.style.backgroundColor = 'var(--border-color)';
                }}
                onMouseLeave={(e) => {
                  if (btn !== '=') e.currentTarget.style.backgroundColor = ['C', 'back'].includes(btn) ? '#ff6a00' : 'var(--light-bg)';
                }}
              >
                {btn === 'back' ? '←' : btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
