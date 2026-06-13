import React, { useState, useEffect } from 'react';

interface ExamItem {
  id: number;
  subject: string;
  dateStr: string; // YYYY-MM-DDTHH:mm
}

export const ExamCountdown: React.FC = () => {
  const [exams, setExams] = useState<ExamItem[]>([
    { id: 1, subject: 'Final Math Exam', dateStr: '2026-06-25T09:00' },
    { id: 2, subject: 'Physics Lab Viva', dateStr: '2026-06-30T14:30' }
  ]);

  const [now, setNow] = useState(new Date());

  const [newSub, setNewSub] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const addExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSub || !newDate) return;
    const nextId = exams.length > 0 ? exams[exams.length - 1].id + 1 : 1;
    setExams([...exams, { id: nextId, subject: newSub, dateStr: newDate }]);
    setNewSub('');
    setNewDate('');
  };

  const removeExam = (id: number) => {
    setExams(exams.filter(ex => ex.id !== id));
  };

  const formatCountdown = (targetStr: string) => {
    const target = new Date(targetStr);
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return 'Over 🏁';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {exams.map((ex) => (
          <div 
            key={ex.id} 
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--white)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, margin: 0 }}>{ex.subject}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {new Date(ex.dateStr).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e52d27', backgroundColor: '#fff5f5', padding: '0.3rem 0.6rem', borderRadius: '4px', border: '1px solid #feb2b2' }}>
                {formatCountdown(ex.dateStr)}
              </span>
              <button 
                onClick={() => removeExam(ex.id)}
                style={{ padding: '0.25rem', color: '#a0aec0', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={addExam} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px dashed var(--border-color)', paddingTop: '1.25rem' }}>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: 0 }}>Add Target Deadline / Exam</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr auto', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="text" 
            value={newSub} 
            onChange={(e) => setNewSub(e.target.value)} 
            placeholder="Exam / Topic name"
            className="option-input"
            required
          />
          <input 
            type="datetime-local" 
            value={newDate} 
            onChange={(e) => setNewDate(e.target.value)} 
            className="option-input"
            required
          />
          <button 
            type="submit"
            style={{
              padding: '0.55rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#ffffff',
              backgroundColor: '#e52d27',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            + Add
          </button>
        </div>
      </form>
    </div>
  );
};
