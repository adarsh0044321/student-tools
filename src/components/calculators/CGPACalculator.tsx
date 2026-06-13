import React, { useState } from 'react';

interface Course {
  name: string;
  credits: number;
  gradePoints: number;
}

interface Semester {
  id: number;
  courses: Course[];
}

export const CGPACalculator: React.FC = () => {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 1,
      courses: [
        { name: 'Course 1', credits: 3, gradePoints: 10 },
        { name: 'Course 2', credits: 4, gradePoints: 9 },
      ]
    }
  ]);

  const addSemester = () => {
    const nextId = semesters.length > 0 ? semesters[semesters.length - 1].id + 1 : 1;
    setSemesters([...semesters, { id: nextId, courses: [{ name: 'Course 1', credits: 3, gradePoints: 10 }] }]);
  };

  const removeSemester = (semId: number) => {
    setSemesters(semesters.filter(s => s.id !== semId));
  };

  const addCourse = (semId: number) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semId) {
        return {
          ...sem,
          courses: [...sem.courses, { name: `Course ${sem.courses.length + 1}`, credits: 3, gradePoints: 10 }]
        };
      }
      return sem;
    }));
  };

  const removeCourse = (semId: number, courseIdx: number) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semId) {
        const nextCourses = [...sem.courses];
        nextCourses.splice(courseIdx, 1);
        return { ...sem, courses: nextCourses };
      }
      return sem;
    }));
  };

  const updateCourse = (semId: number, courseIdx: number, field: keyof Course, value: any) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semId) {
        const nextCourses = sem.courses.map((c, idx) => {
          if (idx === courseIdx) {
            return { ...c, [field]: value };
          }
          return c;
        });
        return { ...sem, courses: nextCourses };
      }
      return sem;
    }));
  };

  // Calculations
  const calculateSemesterGPA = (sem: Semester) => {
    let totalCredits = 0;
    let totalPoints = 0;
    sem.courses.forEach(c => {
      totalCredits += c.credits;
      totalPoints += c.credits * c.gradePoints;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    semesters.forEach(sem => {
      sem.courses.forEach(c => {
        totalCredits += c.credits;
        totalPoints += c.credits * c.gradePoints;
      });
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <div style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Overall Cumulative CGPA</span>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#e52d27', margin: '0.5rem 0' }}>{calculateCGPA()}</h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Calculated from {semesters.length} semesters</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {semesters.map((sem, semIdx) => (
          <div key={sem.id} style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Semester {semIdx + 1} <span style={{ fontSize: '0.85rem', color: '#ff6a00', marginLeft: '0.5rem' }}>(GPA: {calculateSemesterGPA(sem)})</span></h3>
              {semesters.length > 1 && (
                <button 
                  onClick={() => removeSemester(sem.id)}
                  style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', color: '#c53030', backgroundColor: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Delete Sem
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sem.courses.map((course, cIdx) => (
                <div key={cIdx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    value={course.name} 
                    onChange={(e) => updateCourse(sem.id, cIdx, 'name', e.target.value)} 
                    placeholder="Course name"
                    style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                  <input 
                    type="number" 
                    value={course.credits} 
                    onChange={(e) => updateCourse(sem.id, cIdx, 'credits', parseFloat(e.target.value) || 0)} 
                    placeholder="Credits"
                    style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                  <input 
                    type="number" 
                    value={course.gradePoints} 
                    onChange={(e) => updateCourse(sem.id, cIdx, 'gradePoints', parseFloat(e.target.value) || 0)} 
                    placeholder="Grade Points"
                    style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                  <button 
                    onClick={() => removeCourse(sem.id, cIdx)}
                    disabled={sem.courses.length <= 1}
                    style={{ padding: '0.5rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={() => addCourse(sem.id)}
              style={{ marginTop: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}
            >
              + Add Course
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={addSemester}
        style={{ padding: '0.75rem', fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', backgroundColor: '#e52d27', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        + Add Semester
      </button>
    </div>
  );
};
