import React, { useState } from 'react';

export const AgeCalculator: React.FC = () => {
  const [birthdate, setBirthdate] = useState('2005-01-01');

  const calculateAge = () => {
    const today = new Date();
    const birth = new Date(birthdate);
    if (isNaN(birth.getTime())) return null;

    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();
    let ageDays = today.getDate() - birth.getDate();

    if (ageDays < 0) {
      ageMonths--;
      // Get days in last month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += prevMonth.getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    // Next birthday countdown
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > nextBday) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = nextBday.getTime() - today.getTime();
    const nextBdayDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { years: ageYears, months: ageMonths, days: ageDays, countdown: nextBdayDays };
  };

  const age = calculateAge();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* Date selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Select Birth Date</label>
        <input 
          type="date" 
          value={birthdate} 
          onChange={(e) => setBirthdate(e.target.value)} 
          className="option-input"
        />
      </div>

      {/* Grid displays */}
      {age && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Your Exact Age</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#e52d27', margin: '0.5rem 0' }}>
              {age.years} yrs, {age.months} mos
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>and {age.days} days old</p>
          </div>
          
          <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Next Birthday In</span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ff6a00', margin: '0.5rem 0' }}>
              {age.countdown} Days
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Wish you advance celebrations! 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
};
