import './Styles/App.css';
import { useState, useEffect } from 'react';
import Cards from './Components/Cards';
import citiesObject from './cities';

// In App:
// State will be score, best score, win state
// Score and best score will be passed to scoreboard
// Win state will be passed to confetti component (ts particles)

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

  console.log("App is rendering! Score is " + score)

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }

    if (score == citiesObject.length) {
      setWinState(true);
    }

  }, [score]);

  useEffect(()=> {
    if (winState) {
      alert("You won!")
      setWinState(false)
    }
  }, [winState])

  return (
    <div className="app">
      <header>
        <h1 className="title">Memory Cards: Canada Edition</h1>
        <p className="instructions">
          Click on each Canadian city or territory once (and only once) to win
        </p>
        <ScoreBoard score={score} bestScore={bestScore} />
        <Cards score={score} setScore={setScore} winState={winState}/>
      </header>
    </div>
  );
}

export default App;
