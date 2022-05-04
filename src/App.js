import './Styles/App.css';
import { useState, useEffect } from 'react';
import Cards from './Components/Cards';
import citiesObject from './cities';
import Confetti from 'react-confetti';
import leaf from './maple-leaf.svg';

function ScoreBoard({ score, bestScore }) {
  return (
    <div className="score-board">
      <div className="score-section">
        <h2>Current Score: </h2>
        <h3>{score}</h3>
      </div>
      <div className="score-section">
        <h2>Best Score: </h2>
        <h3>{bestScore}</h3>
      </div>
    </div>
  );
}


function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [winState, setWinState] = useState(false);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }

    if (score == citiesObject.length) {
      setWinState(true);
    }
  }, [score]);

  return (
    <div className="app">
      <header>
        <h1 className="title">Memory Cards: Canada Edition</h1>
        <img src={leaf} alt="Canadian maple leaf" className="maple-leaf" />
        <p className="instructions">
          Click on each Canadian city or territory once (and only once) to win
        </p>
        <ScoreBoard score={score} bestScore={bestScore} />
        <Cards score={score} setScore={setScore} winState={winState} />
        {winState && (
          <Confetti
            colors={['#d90429', '#edf2f4']}
            onConfettiComplete={() => {
              setWinState(false);
            }}
            recycle={false}
            numberOfPieces={3000}
            tweenDuration={30000}
          />
        )}
      </header>
    </div>
  );
}

export default App;
