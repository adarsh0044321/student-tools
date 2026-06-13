import React, { useState } from 'react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const cleanText = text.trim();
  const wordCount = cleanText === '' ? 0 : cleanText.split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount = cleanText === '' ? 0 : cleanText.split(/[.!?]+/).filter(Boolean).length;
  
  // Reading speed: average 225 words per minute
  const readingTime = Math.ceil(wordCount / 225);

  const getKeywordDensity = () => {
    if (cleanText === '') return [];
    const words = cleanText.toLowerCase().replace(/[^a-zA-Z\s]/g, '').split(/\s+/).filter(w => w.length > 3);
    const counts: Record<string, number> = {};
    words.forEach(w => {
      counts[w] = (counts[w] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const densities = getKeywordDensity();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* Text Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Paste or Type Essay Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing or paste your research paper/homework text here..."
          className="option-input"
          style={{ height: '180px', resize: 'vertical', lineHeight: 1.5 }}
        />
      </div>

      {/* Grid Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
        <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>Words</span>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.15rem 0' }}>{wordCount}</h4>
        </div>
        <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>Characters</span>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.15rem 0' }}>{charCount}</h4>
        </div>
        <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>Sentences</span>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.15rem 0' }}>{sentenceCount}</h4>
        </div>
        <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>Reading Time</span>
          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.15rem 0', color: '#e52d27' }}>{readingTime}m</h4>
        </div>
      </div>

      {/* Keyword Density */}
      {densities.length > 0 && (
        <div style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: 800, marginBottom: '0.5rem' }}>🔑 Top Keyword Density (Words &gt; 3 chars)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {densities.map(([word, count]) => (
              <span 
                key={word}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--light-bg)',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '50px',
                  border: '1px solid var(--border-color)'
                }}
              >
                {word}: <strong>{count}</strong> ({((count / wordCount) * 100).toFixed(1)}%)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
