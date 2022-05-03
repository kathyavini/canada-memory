import './App.css';
import { useState } from 'react';

// The following from https://stackoverflow.com/questions/53762640/how-to-import-all-images-from-a-folder-in-reactjs
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context('./Assets', false, /\.(png|jpe?g|svg)$/)
);

console.log(images);
console.log(images.length);

// In App:
// State will be score, best score, win state
// Score and best score will be passed to scoreboard
// Win state will be passed to confetti component (ts particles)

// In Cards:
// Scoring function to update score (just pass the setter I think)
// Shuffle function
// Each individual card will be its own component -- can be in the same component file for all cards

// In Scoreboard: (or could make a whole header component with also a light dark toggle)

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

function Card({ city, index, handleClick }) {
  return (
    <figure className="city-card" onClick={handleClick}>
      <img src={images[index]} />
      <figcaption>{city}</figcaption>
    </figure>
  );
}

function Cards() {
  const [history, setHistory] = useState([]);

  function recordClick(city) {
    console.log(history);
    console.log(city);
    setHistory((prevHistory) => [...prevHistory, city]);
  }

  function shuffleCards() {}

  const cities = [
    'calgary',
    'charlottetown',
    'edmonton',
    'fredericton',
    'halifax',
    'montreal',
    'nunavut',
    'ottawa',
    'quebec city',
    'saskatoon',
    "st. john's",
    'toronto',
    'vancouver',
    'victoria',
    'winnipeg',
    'yellowknife',
    'yukon',
  ];

  const displayCards = cities.map((city, index) => (
    <Card
      city={city}
      key={index}
      index={index}
      handleClick={() => {
        recordClick(city);
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
        <ScoreBoard score={score} bestScore={bestScore} />
        <Cards />
      </header>
    </div>
  );
}

export default App;
