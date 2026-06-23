import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Download, Printer, RefreshCw, AlertCircle } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TimetableSlot {
  time: string;
  subject: string;
  focusTip: string;
}

interface DayPlan {
  dayNumber: number;
  dateString: string;
  slots: TimetableSlot[];
}

export const StudyPlanner: React.FC = () => {
  // Setup default dates
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getFutureDateString = (daysAhead: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState(getTodayString());
  const [examDate, setExamDate] = useState(getFutureDateString(14)); // 2 weeks from now
  const [dailyHours, setDailyHours] = useState(4);
  
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 'sub1', name: 'Mathematics', difficulty: 'hard' },
    { id: 'sub2', name: 'Physics', difficulty: 'medium' },
    { id: 'sub3', name: 'English Literature', difficulty: 'easy' }
  ]);

  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectDiff, setNewSubjectDiff] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timetable, setTimetable] = useState<DayPlan[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    const newSub: Subject = {
      id: 'sub_' + Date.now(),
      name: newSubjectName.trim(),
      difficulty: newSubjectDiff
    };
    setSubjects([...subjects, newSub]);
    setNewSubjectName('');
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const generateTimetable = () => {
    if (subjects.length === 0) {
      alert('Please add at least one subject to study.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(examDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive

    if (diffDays <= 0) {
      alert('The exam date must be after the start date.');
      return;
    }

    if (diffDays > 60) {
      alert('To maintain high plan quality, please choose a study range of 60 days or less.');
      return;
    }

    // Allocate study slots based on difficulty weighting
    // Hard = 3 slots, Medium = 2 slots, Easy = 1 slot
    const weightedPool: string[] = [];
    subjects.forEach(sub => {
      const weight = sub.difficulty === 'hard' ? 3 : sub.difficulty === 'medium' ? 2 : 1;
      for (let i = 0; i < weight; i++) {
        weightedPool.push(sub.name);
      }
    });

    // We split daily study hours into 2-hour block sessions
    // E.g., 4 hours = 2 sessions, 6 hours = 3 sessions
    const sessionsPerDay = Math.max(1, Math.round(dailyHours / 2));
    const dayPlans: DayPlan[] = [];

    // Focus tips based on difficulty
    const tipsForSubject = (subjectName: string) => {
      const sub = subjects.find(s => s.name === subjectName);
      if (!sub) return 'Review core concepts.';
      switch (sub.difficulty) {
        case 'hard':
          return 'Focus on solving practice equations, active recall, and reviewing past exam mistakes.';
        case 'medium':
          return 'Draft summarized outlines, explain concepts aloud (Feynman technique), and complete workbook questions.';
        case 'easy':
          return 'Quickly review slide decks, test yourself with vocabulary flashcards, or draft brief summary summaries.';
      }
    };

    let poolIndex = 0;
    const shuffledPool = [...weightedPool].sort(() => 0.5 - Math.random());

    for (let d = 0; d < diffDays; d++) {
      const currentDay = new Date(start);
      currentDay.setDate(start.getDate() + d);

      const dateStr = currentDay.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      const slots: TimetableSlot[] = [];

      for (let s = 0; s < sessionsPerDay; s++) {
        // Recycle pool if exhausted
        if (poolIndex >= shuffledPool.length) {
          poolIndex = 0;
        }
        const assignedSubject = shuffledPool[poolIndex] || subjects[0].name;
        poolIndex++;

        // Calculate session start times
        // E.g., Session 1: 09:00 - 11:00, Session 2: 13:00 - 15:00, Session 3: 16:00 - 18:00
        let timeString = '';
        if (s === 0) timeString = '09:00 AM - 11:00 AM';
        else if (s === 1) timeString = '01:00 PM - 03:00 PM';
        else if (s === 2) timeString = '04:00 PM - 06:00 PM';
        else timeString = `${8 + s * 3}:00 PM - ${10 + s * 3}:00 PM`;

        slots.push({
          time: timeString,
          subject: assignedSubject,
          focusTip: tipsForSubject(assignedSubject)
        });
      }

      dayPlans.push({
        dayNumber: d + 1,
        dateString: dateStr,
        slots
      });
    }

    setTimetable(dayPlans);
    setHasGenerated(true);
  };

  // Export Timetable to CSV File
  const exportToCSV = () => {
    if (timetable.length === 0) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Day,Date,Time Slot,Subject,Focus Study Tip\n';

    timetable.forEach(day => {
      day.slots.forEach(slot => {
        const row = [
          `Day ${day.dayNumber}`,
          `"${day.dateString}"`,
          `"${slot.time}"`,
          `"${slot.subject}"`,
          `"${slot.focusTip.replace(/"/g, '""')}"`
        ].join(',');
        csvContent += row + '\n';
      });
    });

    const encodedUri = encodeURI(csvContent);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', encodedUri);
    downloadLink.setAttribute('download', 'Student_Study_Schedule.csv');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '1rem', width: '100%', color: 'var(--text-dark)' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)' }}>📅 Study Planner & Revision Schedule</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>Generate an optimized, difficulty-weighted study plan for exams locally.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Form and Configurations Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Configurations Box */}
          <div style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0 }}>⚙️ Plan Configuration</h3>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '130px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: '130px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Exam Date</label>
                <input
                  type="date"
                  value={examDate}
                  onChange={e => setExamDate(e.target.value)}
                  style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Daily Study Hours</span>
                <strong>{dailyHours} Hours/Day</strong>
              </label>
              <input
                type="range"
                min={2}
                max={12}
                step={2}
                value={dailyHours}
                onChange={e => setDailyHours(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#e52d27', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>We divide hours into 2-hour blocks with breaks suggestion.</span>
            </div>

            <button
              onClick={generateTimetable}
              style={{
                padding: '0.75rem',
                backgroundColor: '#e52d27',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <RefreshCw size={16} /> Generate Timetable
            </button>
          </div>

          {/* Subjects Box */}
          <div style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0 }}>📚 Subject List</h3>
            
            {/* Add Subject Form */}
            <form onSubmit={handleAddSubject} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Add subject name..."
                value={newSubjectName}
                onChange={e => setNewSubjectName(e.target.value)}
                required
                style={{ flex: 1.5, minWidth: '150px', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
              />
              <select
                value={newSubjectDiff}
                onChange={e => setNewSubjectDiff(e.target.value as any)}
                style={{ flex: 1, minWidth: '80px', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--light-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </form>

            {/* List of Subjects */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto' }}>
              {subjects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>No subjects added yet.</div>
              ) : (
                subjects.map(sub => (
                  <div
                    key={sub.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--light-bg)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{sub.name}</span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          color: sub.difficulty === 'hard' ? '#cf1322' : sub.difficulty === 'medium' ? '#d46b08' : '#389e0d',
                          backgroundColor: sub.difficulty === 'hard' ? '#fff1f0' : sub.difficulty === 'medium' ? '#fff7e6' : '#f6ffed',
                          border: `1px solid ${sub.difficulty === 'hard' ? '#ffa39e' : sub.difficulty === 'medium' ? '#ffd591' : '#b7eb8f'}`
                        }}
                      >
                        {sub.difficulty}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteSubject(sub.id)}
                      style={{ padding: '0.15rem', background: 'none', border: 'none', cursor: 'pointer', color: '#ff6a00' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Timetable Results Section */}
        {hasGenerated && timetable.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }} className="print-timetable-wrapper">
            
            {/* Header / Export Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>📋 Your Generated Revision Timetable</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={exportToCSV}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.45rem 0.8rem',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--white)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Download size={14} /> Export CSV
                </button>
                <button
                  onClick={handlePrint}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.45rem 0.8rem',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--white)',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Printer size={14} /> Print / Save PDF
                </button>
              </div>
            </div>

            {/* Timetable List Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {timetable.map(day => (
                <div
                  key={day.dayNumber}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--white)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#e52d27' }}>
                      📆 Day {day.dayNumber} - {day.dateString}
                    </h4>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                      {day.slots.length} Study Blocks
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {day.slots.map((slot, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--light-bg)',
                          alignItems: 'flex-start'
                        }}
                      >
                        <div style={{ minWidth: '140px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                          ⏰ {slot.time}
                        </div>
                        <div style={{ minWidth: '120px', fontSize: '0.88rem', fontWeight: 800 }}>
                          📚 {slot.subject}
                        </div>
                        <div style={{ flex: 1, minWidth: '220px', fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', gap: '0.25rem', alignItems: 'flex-start' }}>
                          <AlertCircle size={14} style={{ color: '#e52d27', marginTop: '2px', flexShrink: 0 }} />
                          <span>{slot.focusTip}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
