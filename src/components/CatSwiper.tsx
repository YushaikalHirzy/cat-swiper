import { useState, useEffect } from 'react';
import { SwipeCard } from './SwipeCard';
import { createCatImages } from '../services/catApi';
import type { CatImage, SwipeDirection } from '../types';
import './CatSwiper.css';

interface CatSwiperProps {
  onComplete: (likedCats: CatImage[]) => void;
}

export function CatSwiper({ onComplete }: CatSwiperProps) {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cats when component starts
  useEffect(() => {
    const loadCats = async () => {
      setLoading(true);
      const catList = createCatImages(15);
      setCats(catList);
      setLoading(false);
    };
    
    loadCats();
  }, []);

  // Handle swipe
  function handleSwipe(direction: SwipeDirection) {
    const currentCat = cats[currentIndex];
    
    if (direction === 'right') {
      setLikedCats([...likedCats, currentCat]);
    }
    
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    
    // Check if we're done
    if (nextIndex >= cats.length) {
      const finalLikedCats = direction === 'right' 
        ? [...likedCats, currentCat] 
        : likedCats;
      setTimeout(() => onComplete(finalLikedCats), 300);
    }
  }

  // Show cards
  function renderCards() {
    const cards = [];
    const remainingCats = cats.slice(currentIndex);
    const maxCards = Math.min(3, remainingCats.length);

    for (let i = maxCards - 1; i >= 0; i--) {
      const cat = remainingCats[i];
      const isTop = i === 0;
      
      cards.push(
        <SwipeCard
          key={cat.id}
          cat={cat}
          onSwipe={handleSwipe}
          isTop={isTop}
        />
      );
    }
    
    return cards;
  }

  const remaining = cats.length - currentIndex;
  const progress = (currentIndex / cats.length) * 100;

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner large"></div>
        <h2>Loading cats...</h2>
      </div>
    );
  }

  if (currentIndex >= cats.length) {
    return (
      <div className="complete-screen">
        <h2>All done! 🎉</h2>
        <p>Showing your results...</p>
      </div>
    );
  }

  return (
    <div className="cat-swiper">
      <div className="header">
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>{remaining} cats remaining</p>
      </div>

      <div className="cards">
        {renderCards()}
      </div>

      <div className="buttons">
        <button 
          className="btn dislike"
          onClick={() => handleSwipe('left')}
        >
          ❌ Nope
        </button>
        
        <button 
          className="btn like"
          onClick={() => handleSwipe('right')}
        >
          💚 Like
        </button>
      </div>

      <div className="instructions">
        <p>Swipe right to like, left to pass</p>
      </div>
    </div>
  );
}