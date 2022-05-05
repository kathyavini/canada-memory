import { useState } from 'react';
import Confetti from 'react-confetti';
import { useReward } from 'react-rewards';
import canada from '../Assets/canada.svg';
import '../Styles/Win.css';

export default function Win({ winState, setWinState }) {
  // Don't love it but this is in addition to winState merely for use with CSS animations
  const [msgVis, setMsgVis] = useState(true);

  const { reward, isAnimating } = useReward('reward-id', 'emoji', {
    emoji: ['🇨🇦', '🍁'],
    lifetime: 200,
    elementSize: 24,
    elementCount: 35,
    spread: 90,
  });

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <>
      {winState && (
        <div className="win-container">
          <Confetti
            colors={['#d90429', '#edf2f4']}
            recycle={false}
            numberOfPieces={2500}
            tweenDuration={30000}
          />
          <div
            className={`win-message${msgVis ? ' visible' : ''}`}
            onClick={async () => {
              reward();
              setMsgVis(false);
              await delay(3000);
              setWinState(false);
              setMsgVis(true);
            }}
            disabled={isAnimating}
          >
            <h3>Congratulations!</h3>
            <img src={canada} alt="Canada" className="canada"></img>
            <div id="reward-id"></div>
            <p>Click or tap to play again</p>
          </div>
        </div>
      )}
    </>
  );
}
