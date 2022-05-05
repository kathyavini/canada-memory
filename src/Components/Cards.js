import { useState, useEffect } from 'react';
import citiesObject from '../cities';
import '../Styles/Cards.css';

function Card({ city, url, handleClick }) {
  return (
    <figure
      className="city-card"
      onClick={handleClick}
    >
      <img src={url} alt={city} />
      <figcaption>{city}</figcaption>
    </figure>
  );
}

export default function Cards({ setScore, winState }) {
  const [history, setHistory] = useState([]);
  const [orderedCities, setOrderedCities] = useState(citiesObject);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (winState) {
      setHistory([]);
      setScore(0);
    }
  }, [winState]);

  function recordClick(city) {
    const repeats = history.filter((entry) => entry == city);
    if (repeats.length == 0) {
      setScore((prev) => prev + 1);
      setHistory((prevHistory) => [...prevHistory, city]);
    } else {
      setScore(0);
      setHistory([]);
    }
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

    setOrderedCities(shuffledCities);
  }

  const displayCards = orderedCities.map((city) => (
    <Card
      city={city.name}
      key={city.index}
      url={city.url}
      handleClick={() => {
        recordClick(city.name);
        shuffleCards();
      }}
    />
  ));

  return <div className="all-cards">{displayCards}</div>;
}
