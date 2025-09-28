# Cat Swiper 🐱

A fun web application that lets you swipe through adorable cat pictures to discover your preferences! Built with React and TypeScript, this app mimics the familiar swipe-based interface of dating apps but with cute cats instead.

## ✨ Features

- **Swipe Gestures**: Swipe right to like, left to pass on cat pictures
- **Mobile-Friendly**: Touch-optimized interface that works great on phones
- **Progress Tracking**: See how many cats you have left to swipe
- **Results Summary**: View statistics and see all your favorite cats
- **Interactive Gallery**: Click on liked cats to see them full-size
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download this repository
2. Navigate to the project folder in your terminal
3. Install the required packages:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎮 How to Use

1. **Start Swiping**: You'll see a cat card on screen
2. **Make Your Choice**: 
   - Swipe right (or click 💚) to like the cat
   - Swipe left (or click ❌) to pass
3. **Track Progress**: Watch the progress bar at the top
4. **View Results**: After all 15 cats, see your preferences and stats
5. **Start Over**: Click "Swipe More Cats" to try again with new cats

## 🛠 Tech Stack

- **React** - For building the user interface
- **TypeScript** - For type safety and better development experience
- **Vite** - Fast build tool and development server
- **CSS3** - For styling and animations

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CatSwiper.tsx   # Main swiping interface
│   ├── SwipeCard.tsx   # Individual cat card
│   └── ResultsSummary.tsx # Results page
├── services/           # Utility functions
│   └── catApi.ts      # Cat image generation
├── types/             # TypeScript type definitions
└── App.tsx           # Main app component
```

## 🐾 About the Cat Images

Cat pictures come from [Cataas](https://cataas.com/), a free service that provides random cat images. Each time you start the app, you get 15 new random cats to swipe through.

## 📱 Mobile Experience

The app is designed to work great on mobile:
- Touch gestures for swiping
- Proper button sizes for finger taps
- Responsive layout that adapts to screen size
- No unwanted zooming or scrolling issues

## 🎨 Design Choices

- **Purple gradient background** for a modern look
- **Card-based interface** that's familiar and intuitive
- **Smooth animations** when swiping cards
- **Clear visual feedback** showing like/dislike actions
- **Simple, clean typography** that's easy to read

## � Development Notes

This project was built as a learning exercise to practice:
- React component development
- TypeScript integration
- Touch event handling
- Responsive CSS design
- State management with useState

## 📄 License

This project is open source.