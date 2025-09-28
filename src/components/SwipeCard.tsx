import { useState } from 'react';
import type { CatImage, SwipeDirection } from '../types';
import './SwipeCard.css';

interface SwipeCardProps {
  cat: CatImage;
  onSwipe: (direction: SwipeDirection) => void;
  isTop: boolean;
}

export function SwipeCard({ cat, onSwipe, isTop }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle mouse/touch start
  function handleStart(clientX: number, clientY: number) {
    if (!isTop) return;
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  }

  // Handle mouse/touch move
  function handleMove(clientX: number, clientY: number) {
    if (!isDragging || !isTop) return;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setPosition({ x: deltaX, y: deltaY });
  }

  // Handle mouse/touch end
  function handleEnd() {
    if (!isDragging || !isTop) return;
    setIsDragging(false);
    
    // Check if swiped far enough
    if (Math.abs(position.x) > 100) {
      const direction = position.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    } else {
      // Snap back to center
      setPosition({ x: 0, y: 0 });
    }
  }

  // Mouse events
  function onMouseDown(e: React.MouseEvent) {
    handleStart(e.clientX, e.clientY);
  }

  function onMouseMove(e: React.MouseEvent) {
    handleMove(e.clientX, e.clientY);
  }

  // Touch events
  function onTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }

  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }

  const cardStyle = {
    transform: `translate(${position.x}px, ${position.y}px) rotate(${position.x / 10}deg)`,
    transition: isDragging ? 'none' : 'transform 0.3s ease',
  };

  // Show swipe indicator
  const showIndicator = isDragging && Math.abs(position.x) > 50;
  const indicatorType = position.x > 0 ? 'like' : 'dislike';

  return (
    <div
      className={`swipe-card ${isTop ? 'top-card' : ''}`}
      style={cardStyle}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleEnd}
    >
      {!imageLoaded && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading cat...</p>
        </div>
      )}
      
      <img
        src={cat.url}
        alt="A cute cat"
        className={imageLoaded ? 'loaded' : ''}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        draggable={false}
      />
      
      {showIndicator && (
        <div className={`indicator ${indicatorType}`}>
          {indicatorType === 'like' ? '💚 LIKE' : '❌ NOPE'}
        </div>
      )}
    </div>
  );
}