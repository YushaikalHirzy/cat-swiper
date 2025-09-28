import { useState } from 'react';
import { CatSwiper } from './components/CatSwiper';
import { ResultsSummary } from './components/ResultsSummary';
import type { CatImage } from './types';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'swiping' | 'results'>('swiping');
  const [likedCats, setLikedCats] = useState<CatImage[]>([]);

  function handleComplete(cats: CatImage[]) {
    setLikedCats(cats);
    setCurrentView('results');
  }

  function handleRestart() {
    setLikedCats([]);
    setCurrentView('swiping');
  }

  return (
    <div className="app">
      {currentView === 'swiping' ? (
        <CatSwiper onComplete={handleComplete} />
      ) : (
        <ResultsSummary 
          likedCats={likedCats} 
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
