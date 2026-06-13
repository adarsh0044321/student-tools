import React, { useState, useEffect, useRef } from 'react';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getModeDuration = (m: TimerMode) => {
    switch (m) {
      case 'work': return 25 * 60;
      case 'shortBreak': return 5 * 60;
      case 'longBreak': return 15 * 60;
    }
  };

  useEffect(() => {
    setTimeLeft(getModeDuration(mode));
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            playAlertChime();
            // Trigger HTML5 notification if permissions are set
            if (Notification.permission === 'granted') {
              new Notification("Timer Finished! 🎓", {
                body: mode === 'work' ? "Time to take a short break!" : "Time to focus again!"
              });
            }
            return getModeDuration(mode);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode]);

  const toggleTimer = () => {
    // Request notification permissions
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getModeDuration(mode));
  };

  const playAlertChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Beep 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.35);

      // Beep 2
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2); // E5
      gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc2.start(ctx.currentTime + 0.2);
      osc2.stop(ctx.currentTime + 0.55);
    } catch (e) {
      console.error('Web Audio beep error:', e);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
      {/* Mode Switches */}
      <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--light-bg)', padding: '0.35rem', borderRadius: '8px', width: '100%', justifyContent: 'space-between' }}>
        {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              flex: 1,
              padding: '0.5rem 0.25rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: mode === m ? 'var(--white)' : 'transparent',
              color: mode === m ? '#e52d27' : 'var(--text-muted)',
              boxShadow: mode === m ? 'var(--shadow-sm)' : 'none',
              transition: '0.15s ease'
            }}
          >
            {m === 'work' ? '📚 Focus' : m === 'shortBreak' ? '☕ Break' : '🌴 Rest'}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div style={{
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        border: '6px solid #e52d27',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--white)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'monospace', margin: 0 }}>
          {formatTime(timeLeft)}
        </h2>
        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          {mode === 'work' ? 'Time to Study' : 'Rest Up'}
        </span>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <button
          onClick={toggleTimer}
          style={{
            flex: 2,
            padding: '0.8rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#ffffff',
            backgroundColor: isActive ? '#ff6a00' : '#e52d27',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {isActive ? '⏸ Pause' : '▶ Start Session'}
        </button>
        <button
          onClick={resetTimer}
          style={{
            flex: 1,
            padding: '0.8rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            backgroundColor: 'var(--light-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};
