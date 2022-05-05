import { useState, useEffect } from 'react';
import Cards from './Components/Cards';
import Win from './Components/Win';
import citiesObject from './cities';
import leaf from './Assets/maple-leaf.svg';
import './Styles/App.css';

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
  const [bestScore, setBestScore] = useState(
    () => localStorage.getItem('highScore') || 0
  );
  const [winState, setWinState] = useState(false);

  useEffect(() => {
    localStorage.setItem('highScore', bestScore);
  }, [bestScore]);

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
      <h1 className="title">Memory Cards: Canada Edition</h1>
      <img src={leaf} alt="Canadian maple leaf" className="maple-leaf" />
      <p className="instructions">
        Click on each Canadian city or territory once (and only once) to win
      </p>
      <ScoreBoard score={score} bestScore={bestScore} />
      <Cards score={score} setScore={setScore} winState={winState} />
      <Win winState={winState} setWinState={setWinState} />
    </div>
  );
}

export default App;
