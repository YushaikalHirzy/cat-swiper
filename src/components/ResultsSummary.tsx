import { useState } from 'react';
import type { CatImage } from '../types';
import './ResultsSummary.css';

interface ResultsSummaryProps {
  likedCats: CatImage[];
  onRestart: () => void;
}

export function ResultsSummary({ likedCats, onRestart }: ResultsSummaryProps) {
  const [selectedCat, setSelectedCat] = useState<CatImage | null>(null);
  
  const totalCats = 15;
  const likedCount = likedCats.length;
  const likePercentage = Math.round((likedCount / totalCats) * 100);

  function getMessage() {
    if (likedCount === 0) return "No cats caught your fancy today! 😿";
    if (likedCount <= 3) return "You're quite selective! 🧐";
    if (likedCount <= 7) return "A good balance of pickiness! 😸";
    if (likedCount <= 12) return "You're a cat lover! 😻";
    return "You love ALL the cats! 🙀💕";
  }

  function getEmoji() {
    if (likedCount === 0) return "😿";
    if (likedCount <= 3) return "🧐";
    if (likedCount <= 7) return "😸";
    if (likedCount <= 12) return "😻";
    return "🙀";
  }

  return (
    <div className="results">
      <div className="results-header">
        <div className="emoji">{getEmoji()}</div>
        <h1>Your Cat Preferences</h1>
        <p className="message">{getMessage()}</p>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="number">{likedCount}</div>
          <div className="label">Cats Liked</div>
        </div>
        <div className="stat">
          <div className="number">{likePercentage}%</div>
          <div className="label">Like Rate</div>
        </div>
        <div className="stat">
          <div className="number">{totalCats - likedCount}</div>
          <div className="label">Cats Passed</div>
        </div>
      </div>

      {likedCats.length > 0 && (
        <div className="liked-cats">
          <h2>Your Favorite Cats 💕</h2>
          <div className="cat-grid">
            {likedCats.map((cat, index) => (
              <div
                key={cat.id}
                className="cat-thumb"
                onClick={() => setSelectedCat(cat)}
              >
                <img
                  src={cat.url}
                  alt={`Liked cat ${index + 1}`}
                />
                <div className="heart">❤️</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="actions">
        <button className="restart-btn" onClick={onRestart}>
          <span>🔄</span>
          Swipe More Cats
        </button>
      </div>

      {selectedCat && (
        <div className="modal" onClick={() => setSelectedCat(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={() => setSelectedCat(null)}
            >
              ×
            </button>
            <img src={selectedCat.url} alt="Selected cat" />
          </div>
        </div>
      )}
    </div>
  );
}