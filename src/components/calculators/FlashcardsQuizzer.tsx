import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Upload, ArrowLeft, Check, X, RefreshCw, HelpCircle } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface Deck {
  id: string;
  title: string;
  description: string;
  cards: Flashcard[];
}

const DEFAULT_DECKS: Deck[] = [
  {
    id: 'cs-basics',
    title: '💻 Computer Science Basics',
    description: 'Core concepts including networking, algorithms, and databases.',
    cards: [
      { id: 'cs1', front: 'What is DNS (Domain Name System)?', back: 'An internet service that translates human-readable domain names (like google.com) into numeric IP addresses.' },
      { id: 'cs2', front: 'Explain recursion in programming.', back: 'A method where a function calls itself to solve smaller instances of the same problem until reaching a base case.' },
      { id: 'cs3', front: 'What is a Database Index?', back: 'A data structure that improves the speed of data retrieval operations on a database table at the cost of additional write speed and storage.' },
      { id: 'cs4', front: 'What does REST stand for?', back: 'Representational State Transfer - an architectural style for designing networked applications using HTTP requests.' },
      { id: 'cs5', front: 'What is the main difference between SQL and NoSQL?', back: 'SQL databases are relational and table-based with fixed schemas. NoSQL databases are non-relational, document-based, and have dynamic schemas.' }
    ]
  },
  {
    id: 'bio-terms',
    title: '🧬 Biology Definitions',
    description: 'Fundamental biological terms, cell structures, and life processes.',
    cards: [
      { id: 'bio1', front: 'What is the Mitochondria?', back: 'The powerhouse of the cell, responsible for cellular respiration and generating chemical energy in the form of ATP.' },
      { id: 'bio2', front: 'Define Photosynthesis.', back: 'The biological process by which green plants use sunlight, water, and carbon dioxide to synthesize food (glucose) and release oxygen.' },
      { id: 'bio3', front: 'What is Homeostasis?', back: 'The state of steady internal physical and chemical conditions maintained by living systems, keeping levels like temperature and pH stable.' },
      { id: 'bio4', front: 'What is osmosis?', back: 'The spontaneous net movement of solvent molecules (water) through a semipermeable membrane into a region of higher solute concentration.' },
      { id: 'bio5', front: 'What is DNA (Deoxyribonucleic Acid)?', back: 'A molecule containing genetic instructions that specifies the development, functioning, growth, and reproduction of all organisms.' }
    ]
  }
];

export const FlashcardsQuizzer: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>(DEFAULT_DECKS);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [mode, setMode] = useState<'menu' | 'review' | 'quiz' | 'edit'>('menu');

  // New deck/card form states
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

  // Review states
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewHistory, setReviewHistory] = useState<{ [cardId: string]: boolean }>({});

  // Quiz states
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const selectedDeck = decks.find(d => d.id === selectedDeckId);

  // Load user saved decks from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('student_flashcards_decks');
      if (saved) {
        try {
          setDecks(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Save to localStorage whenever decks change
  const saveDecks = (updatedDecks: Deck[]) => {
    setDecks(updatedDecks);
    if (typeof window !== 'undefined') {
      localStorage.setItem('student_flashcards_decks', JSON.stringify(updatedDecks));
    }
  };

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;
    const newDeck: Deck = {
      id: 'deck_' + Date.now(),
      title: newDeckTitle.trim(),
      description: newDeckDesc.trim() || 'Custom flashcard deck.',
      cards: []
    };
    const next = [...decks, newDeck];
    saveDecks(next);
    setNewDeckTitle('');
    setNewDeckDesc('');
    setSelectedDeckId(newDeck.id);
    setMode('edit');
  };

  const handleDeleteDeck = (deckId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this flashcard deck?')) {
      const next = decks.filter(d => d.id !== deckId);
      saveDecks(next);
      if (selectedDeckId === deckId) {
        setSelectedDeckId(null);
        setMode('menu');
      }
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeckId || !newCardFront.trim() || !newCardBack.trim()) return;
    const newCard: Flashcard = {
      id: 'card_' + Date.now(),
      front: newCardFront.trim(),
      back: newCardBack.trim()
    };
    const next = decks.map(d => {
      if (d.id === selectedDeckId) {
        return { ...d, cards: [...d.cards, newCard] };
      }
      return d;
    });
    saveDecks(next);
    setNewCardFront('');
    setNewCardBack('');
  };

  const handleDeleteCard = (cardId: string) => {
    if (!selectedDeckId) return;
    const next = decks.map(d => {
      if (d.id === selectedDeckId) {
        return { ...d, cards: d.cards.filter(c => c.id !== cardId) };
      }
      return d;
    });
    saveDecks(next);
  };

  // Import JSON Decks
  const handleImportDecks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          // Simple validation
          const isValid = imported.every(d => d.title && Array.isArray(d.cards));
          if (isValid) {
            const next = [...decks, ...imported.map(d => ({ ...d, id: 'deck_' + Date.now() + Math.random() }))];
            saveDecks(next);
            alert('Decks imported successfully! 🎉');
          } else {
            alert('Invalid deck format. File must be a JSON array of decks.');
          }
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Export Decks
  const handleExportDeck = (deck: Deck) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify([deck], null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${deck.title.replace(/\s+/g, '_')}_deck.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Start Review Mode
  const startReview = () => {
    if (!selectedDeck || selectedDeck.cards.length === 0) {
      alert('Add at least 1 card to review.');
      return;
    }
    setCurrentCardIdx(0);
    setIsFlipped(false);
    setReviewHistory({});
    setMode('review');
  };

  const handleReviewAnswer = (confidence: boolean) => {
    const currentCard = selectedDeck?.cards[currentCardIdx];
    if (currentCard) {
      setReviewHistory(prev => ({ ...prev, [currentCard.id]: confidence }));
    }
    if (currentCardIdx < (selectedDeck?.cards.length || 0) - 1) {
      setCurrentCardIdx(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Completed all cards
      alert('Review session complete! Check your confidence list.');
      setMode('menu');
    }
  };

  // Quiz setup helper
  const setupQuizQuestion = (cardIdx: number) => {
    if (!selectedDeck) return;
    const currentCard = selectedDeck.cards[cardIdx];
    if (!currentCard) return;

    // Correct option
    const correctAns = currentCard.back;

    // Gather incorrect options from remaining deck cards
    const otherAnswers = selectedDeck.cards
      .filter(c => c.id !== currentCard.id)
      .map(c => c.back);

    // Shuffle and pick up to 3 incorrect ones
    const shuffledOthers = otherAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Fallback choices if the deck is too small
    while (shuffledOthers.length < 3) {
      shuffledOthers.push(`Alternative Study Choice ${shuffledOthers.length + 1} - Review carefully!`);
    }

    // Merge correct & incorrect and shuffle
    const options = [...shuffledOthers, correctAns].sort(() => 0.5 - Math.random());
    setQuizOptions(options);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  // Start Quiz Mode
  const startQuiz = () => {
    if (!selectedDeck || selectedDeck.cards.length === 0) {
      alert('Add at least 1 card to take a quiz.');
      return;
    }
    setCurrentCardIdx(0);
    setQuizScore(0);
    setQuizFinished(false);
    setupQuizQuestion(0);
    setMode('quiz');
  };

  const handleSelectQuizOption = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === selectedDeck?.cards[currentCardIdx].back;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizCard = () => {
    if (currentCardIdx < (selectedDeck?.cards.length || 0) - 1) {
      const nextIdx = currentCardIdx + 1;
      setCurrentCardIdx(nextIdx);
      setupQuizQuestion(nextIdx);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div style={{ padding: '1rem', width: '100%', color: 'var(--text-dark)' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)' }}>🗂 Flashcard Quizzer & Active Recall</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>Create, review, and quiz yourself on study decks entirely client-side.</p>
      </div>

      {mode === 'menu' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Decks Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {decks.map(deck => (
              <div
                key={deck.id}
                onClick={() => { setSelectedDeckId(deck.id); }}
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: selectedDeckId === deck.id ? '2px solid #e52d27' : '1px solid var(--border-color)',
                  backgroundColor: 'var(--white)',
                  cursor: 'pointer',
                  boxShadow: selectedDeckId === deck.id ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{deck.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>{deck.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#e52d27' }}>
                  <span>📇 {deck.cards.length} Cards</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleExportDeck(deck); }}
                      title="Export Deck"
                      style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer' }}
                    >
                      <Download size={14} />
                    </button>
                    {deck.id.startsWith('deck_') && (
                      <button
                        onClick={(e) => handleDeleteDeck(deck.id, e)}
                        title="Delete Deck"
                        style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', color: '#ff6a00' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            {/* Create Custom Deck Form */}
            <form onSubmit={handleCreateDeck} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, minWidth: '280px', maxWidth: '400px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>➕ Create New Study Deck</h4>
              <input
                type="text"
                placeholder="Deck Title (e.g. History Midterm)"
                value={newDeckTitle}
                onChange={e => setNewDeckTitle(e.target.value)}
                required
                style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
              />
              <input
                type="text"
                placeholder="Short Description (e.g. Chapters 1-4)"
                value={newDeckDesc}
                onChange={e => setNewDeckDesc(e.target.value)}
                style={{ padding: '0.6rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem' }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.6rem',
                  backgroundColor: '#e52d27',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Create Deck & Add Cards
              </button>
            </form>

            {/* Import Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>📂 Import Study Decks</h4>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1rem',
                  border: '1px dashed #e52d27',
                  borderRadius: '8px',
                  backgroundColor: '#fff8f8',
                  color: '#e52d27',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <Upload size={16} /> Import Decks JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportDecks}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          {selectedDeck && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Active Deck: {selectedDeck.title}</h3>
              <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' }}>
                <button
                  onClick={startReview}
                  style={{ flex: 1, padding: '0.8rem', backgroundColor: '#e52d27', color: '#ffffff', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                >
                  📇 Start Active Recall
                </button>
                <button
                  onClick={startQuiz}
                  style={{ flex: 1, padding: '0.8rem', backgroundColor: '#0070f3', color: '#ffffff', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                >
                  📝 Start Multiple Choice Quiz
                </button>
                <button
                  onClick={() => setMode('edit')}
                  style={{ padding: '0.8rem 1.2rem', backgroundColor: 'var(--light-bg)', color: 'var(--text-main)', fontWeight: 700, border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}
                >
                  ⚙️ Edit Cards
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Review Mode */}
      {mode === 'review' && selectedDeck && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '500px', alignItems: 'center' }}>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', color: '#e52d27', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ArrowLeft size={16} /> Exit
            </button>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Card {currentCardIdx + 1} of {selectedDeck.cards.length}
            </span>
          </div>

          {/* Flashcard Body */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              width: '100%',
              maxWidth: '500px',
              minHeight: '220px',
              perspective: '1000px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transition: 'transform 0.4s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'none',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)'
            }}>
              {/* Front Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: 'var(--white)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: '16px'
              }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '1rem' }}>Front / Term</span>
                <p style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.5 }}>{selectedDeck.cards[currentCardIdx]?.front}</p>
                <span style={{ fontSize: '0.75rem', color: '#e52d27', marginTop: '1.5rem', fontWeight: 700 }}>💡 Click to reveal answer</span>
              </div>

              {/* Back Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: '#fffef0',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: '16px',
                transform: 'rotateY(180deg)',
                border: '1px solid #ffe8cc'
              }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#ff6a00', fontWeight: 800, marginBottom: '1rem' }}>Back / Definition</span>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.6 }}>{selectedDeck.cards[currentCardIdx]?.back}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem', fontWeight: 700 }}>💡 Click to flip back</span>
              </div>
            </div>
          </div>

          {/* Review Self-Grading Actions */}
          {isFlipped && (
            <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' }}>
              <button
                onClick={() => handleReviewAnswer(false)}
                style={{ flex: 1, padding: '0.8rem', backgroundColor: '#fff0f0', color: '#ff4d4f', border: '1px solid #ffccc7', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
              >
                😕 Need Review
              </button>
              <button
                onClick={() => handleReviewAnswer(true)}
                style={{ flex: 1, padding: '0.8rem', backgroundColor: '#f6ffed', color: '#52c41a', border: '1px solid #b7eb8f', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
              >
                😄 Got It!
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quiz Mode */}
      {mode === 'quiz' && selectedDeck && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '500px', alignItems: 'center' }}>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', color: '#e52d27', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ArrowLeft size={16} /> Exit Quiz
            </button>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Score: {quizScore}/{quizFinished ? selectedDeck.cards.length : currentCardIdx + (isAnswered ? 1 : 0)}
            </span>
          </div>

          {!quizFinished ? (
            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Question card */}
              <div style={{ padding: '1.75rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, display: 'block', marginBottom: '0.75rem' }}>
                  Question {currentCardIdx + 1} of {selectedDeck.cards.length}
                </span>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, lineHeight: 1.5 }}>
                  {selectedDeck.cards[currentCardIdx]?.front}
                </p>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {quizOptions.map((option, idx) => {
                  const isCorrectAnswer = option === selectedDeck.cards[currentCardIdx].back;
                  const isSelected = selectedAnswer === option;

                  let bgColor = 'var(--white)';
                  let borderColor = 'var(--border-color)';
                  let textColor = 'var(--text-dark)';

                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      bgColor = '#f6ffed';
                      borderColor = '#52c41a';
                      textColor = '#237804';
                    } else if (isSelected) {
                      bgColor = '#fff0f0';
                      borderColor = '#ff4d4f';
                      textColor = '#a8071a';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(option)}
                      disabled={isAnswered}
                      style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        color: textColor,
                        fontWeight: isSelected || (isAnswered && isCorrectAnswer) ? 700 : 500,
                        fontSize: '0.88rem',
                        textAlign: 'left',
                        cursor: isAnswered ? 'default' : 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        lineHeight: 1.4,
                        transition: '0.15s ease'
                      }}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrectAnswer && <Check size={16} style={{ color: '#52c41a' }} />}
                      {isAnswered && isSelected && !isCorrectAnswer && <X size={16} style={{ color: '#ff4d4f' }} />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <button
                  onClick={handleNextQuizCard}
                  style={{
                    padding: '0.8rem',
                    backgroundColor: '#e52d27',
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    marginTop: '0.5rem'
                  }}
                >
                  {currentCardIdx === selectedDeck.cards.length - 1 ? 'Finish Quiz 🏁' : 'Next Question ➡️'}
                </button>
              )}
            </div>
          ) : (
            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--white)', boxShadow: 'var(--shadow-md)', width: '100%' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>🎉 Quiz Completed!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>You finished the quiz for <strong>{selectedDeck.title}</strong>.</p>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#e52d27', marginBottom: '0.5rem' }}>
                  {Math.round((quizScore / selectedDeck.cards.length) * 100)}%
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  Your Score: {quizScore} / {selectedDeck.cards.length}
                </div>
              </div>
              <button
                onClick={startQuiz}
                style={{ padding: '0.8rem 1.5rem', backgroundColor: '#e52d27', color: '#ffffff', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <RefreshCw size={16} /> Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* Edit Mode */}
      {mode === 'edit' && selectedDeck && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', color: '#e52d27', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Editing Deck: {selectedDeck.title}</h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {/* Add Card Form */}
            <form onSubmit={handleAddCard} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, minWidth: '280px', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--light-bg)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>➕ Add New Card</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Front (Question / Term)</label>
                <textarea
                  placeholder="e.g. What is gravity?"
                  value={newCardFront}
                  onChange={e => setNewCardFront(e.target.value)}
                  required
                  rows={3}
                  style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>Back (Answer / Definition)</label>
                <textarea
                  placeholder="e.g. A natural phenomenon by which all things with mass or energy are brought toward one another."
                  value={newCardBack}
                  onChange={e => setNewCardBack(e.target.value)}
                  required
                  rows={3}
                  style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '0.6rem',
                  backgroundColor: '#e52d27',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                Add Card
              </button>
            </form>

            {/* Existing Cards List */}
            <div style={{ flex: 1.5, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>📚 Card List ({selectedDeck.cards.length})</h4>
              {selectedDeck.cards.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No cards in this deck yet. Create some using the form on the left.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  {selectedDeck.cards.map((card, index) => (
                    <div
                      key={card.id}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--white)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem' }}>
                        <div><strong>#{index + 1} Front:</strong> {card.front}</div>
                        <div style={{ color: 'var(--text-muted)' }}><strong>Back:</strong> {card.back}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        style={{ padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#ff6a00' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
