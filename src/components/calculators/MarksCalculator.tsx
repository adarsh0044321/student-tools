import React, { useState } from 'react';

interface SubjectMark {
  name: string;
  obtained: number;
  max: number;
}

export const MarksCalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectMark[]>([
    { name: 'Mathematics', obtained: 85, max: 100 },
    { name: 'Physics', obtained: 78, max: 100 },
    { name: 'Chemistry', obtained: 92, max: 100 }
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, obtained: 80, max: 100 }]);
  };

  const removeSubject = (idx: number) => {
    setSubjects(subjects.filter((_, i) => i !== idx));
  };

  const updateSubject = (idx: number, field: keyof SubjectMark, value: any) => {
    setSubjects(subjects.map((sub, i) => {
      if (i === idx) {
        return { ...sub, [field]: value };
      }
      return sub;
    }));
  };

  const totalObtained = subjects.reduce((sum, s) => sum + s.obtained, 0);
  const totalMax = subjects.reduce((sum, s) => sum + s.max, 0);
  const aggregatePercentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
  const averageObtained = subjects.length > 0 ? totalObtained / subjects.length : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <div style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Total Score</span>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0' }}>{totalObtained} / {totalMax}</h4>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Aggregate Percentage</span>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0', color: '#e52d27' }}>{aggregatePercentage.toFixed(2)}%</h4>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Class Average</span>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0.25rem 0' }}>{averageObtained.toFixed(1)}</h4>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {subjects.map((sub, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'center' }}>
            <input 
              type="text" 
              value={sub.name} 
              onChange={(e) => updateSubject(idx, 'name', e.target.value)} 
              placeholder="Subject Name"
              style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
            />
            <input 
              type="number" 
              value={sub.obtained} 
              onChange={(e) => updateSubject(idx, 'obtained', parseFloat(e.target.value) || 0)} 
              placeholder="Obtained"
              style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
            />
            <input 
              type="number" 
              value={sub.max} 
              onChange={(e) => updateSubject(idx, 'max', parseFloat(e.target.value) || 0)} 
              placeholder="Max Marks"
              style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
            />
            <button 
              onClick={() => removeSubject(idx)} 
              disabled={subjects.length <= 1}
              style={{ padding: '0.5rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={addSubject}
          style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', fontWeight: 700, backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}
        >
          + Add Subject
        </button>
      </div>
    </div>
  );
};
