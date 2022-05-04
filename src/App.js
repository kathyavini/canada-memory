import './App.css';
import { useState, useEffect } from 'react';
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

function Card({ city, index, url, handleClick }) {
  return (
    <figure className="city-card" onClick={handleClick}>
      <img
        src={url}
        // On android, the following works in Chrome but not Firefox (sigh) to suppress the long press context menu
        // onContextMenu={(event) => {
        //   event.preventDefault();
        //   event.stopPropagation();
        // }}
      />
      <figcaption>{city}</figcaption>
    </figure>
  );
}

function Cards() {
  const [history, setHistory] = useState([]);

  const [orderedCities, setOrderedCities] = useState(citiesObject);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    console.log(history);
  }, [history]);

  function recordClick(city) {
    setHistory((prevHistory) => [...prevHistory, city]);
  }

  async function shuffleCards() {
    // Fisher-Yates; did not think it up myself
    function randomSort(array) {
      // Starting at last element
      for (let i = array.length - 1; i > 0; i--) {
        // Pick a random element from earlier in the array
        let j = Math.floor(Math.random() * (i + 1));
        // swap with current elements
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledCities = randomSort(citiesObject).map((city) => ({
      ...city,
    }));

    await timeout(400);
    setOrderedCities(shuffledCities);
  }

  const displayCards = orderedCities.map((city) => (
    <Card
      city={city.name}
      key={city.index}
      index={city.index}
      url={city.url}
      handleClick={() => {
        recordClick(city.name);
        shuffleCards();
      }}
    />
  ));

  return <div className="all-cards">{displayCards}</div>;
}

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="app">
      <header>
        <h1 className="title">Memory Cards: Canada Edition</h1>
        <p className="instructions">
          Click on each Canadian city or territory once (and only once) to win.
        </p>
        <ScoreBoard score={score} bestScore={bestScore} />
        <Cards />
      </header>
    </div>
  );
}

export default App;
