import React, { useEffect, useState } from 'react';
import './Hero.css';
import Candle from './Candle';

const confettiPieces = Array.from({ length: 76 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 19) * 0.06}s`,
  duration: `${2.8 + (index % 7) * 0.18}s`,
  color: ['#ff6f98', '#ffd166', '#7bdff2', '#b2f7a5', '#f6a4ff'][index % 5],
  size: `${0.42 + (index % 4) * 0.08}rem`,
  spin: `${(index % 2 === 0 ? 1 : -1) * (180 + index * 17)}deg`,
}));

const balloons = [
  { id: 1, left: '7%', delay: '1.5s', color: '#ff7aa8' },
  { id: 2, left: '18%', delay: '2.3s', color: '#ffd166' },
  { id: 3, left: '82%', delay: '1.9s', color: '#7bdff2' },
  { id: 4, left: '91%', delay: '2.8s', color: '#b2f7a5' },
];

const fireworks = [
  { id: 1, left: '22%', top: '24%', delay: '0.2s' },
  { id: 2, left: '77%', top: '27%', delay: '0.6s' },
  { id: 3, left: '50%', top: '16%', delay: '1s' },
];

const Hero = () => {
  const [sequenceKey, setSequenceKey] = useState(0);
  const [candlesLit, setCandlesLit] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);

  useEffect(() => {
    setCandlesLit(false);
    setCelebrating(false);
    setCakeCut(false);

    const lightTimer = window.setTimeout(() => {
      setCandlesLit(true);
    }, 5200);

    return () => window.clearTimeout(lightTimer);
  }, [sequenceKey]);

  const blowCandles = () => {
    if (!candlesLit) return;
    setCelebrating(true);
  };

  const cutCake = () => {
    setCakeCut(true);
  };

  const replayScene = () => {
    setSequenceKey((currentKey) => currentKey + 1);
  };

  return (
    <main key={sequenceKey} className="hero-container">
      <div className="ambient-glow" aria-hidden="true"></div>

      <div className="balloons" aria-hidden="true">
        {balloons.map((balloon) => (
          <span
            key={balloon.id}
            className="balloon"
            style={{
              '--balloon-left': balloon.left,
              '--balloon-delay': balloon.delay,
              '--balloon-color': balloon.color,
            }}
          ></span>
        ))}
      </div>

      <div className="dust-name" aria-hidden="true">
        <span>Ajay</span>
        <i></i>
      </div>

      {celebrating && (
        <>
          <div className="confetti" aria-hidden="true">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                style={{
                  '--left': piece.left,
                  '--delay': piece.delay,
                  '--duration': piece.duration,
                  '--color': piece.color,
                  '--size': piece.size,
                  '--spin': piece.spin,
                }}
              ></span>
            ))}
          </div>

          <div className="fireworks" aria-hidden="true">
            {fireworks.map((firework) => (
              <span
                key={firework.id}
                style={{
                  '--firework-left': firework.left,
                  '--firework-top': firework.top,
                  '--firework-delay': firework.delay,
                }}
              ></span>
            ))}
          </div>
        </>
      )}

      <section className="cake-scene" aria-label="Birthday cake with 3 candles">
        <div className="candles">
          <Candle number="" delay="3.1s" isLit={candlesLit} isBlown={celebrating} />
          <Candle number="" delay="3.3s" isLit={candlesLit} isBlown={celebrating} />
          <Candle number="" delay="3.55s" isLit={candlesLit} isBlown={celebrating} />
        </div>

        <div className={`cake-body${cakeCut ? ' is-cut' : ''}`}>
          <div className="icing icing-top"></div>
          <div className="cake-layer top-layer">
            <span className="drip drip-one"></span>
            <span className="drip drip-two"></span>
            <span className="drip drip-three"></span>
          </div>
          <div className="filling"></div>
          <div className="cake-layer bottom-layer"></div>
          <div className="cake-sparkles" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="cut-line" aria-hidden="true"></div>
          <div className="cake-knife" aria-hidden="true">
            <span></span>
          </div>
          <div className="cake-slice" aria-hidden="true">
            <span className="slice-icing"></span>
            <span className="slice-top"></span>
            <span className="slice-filling"></span>
            <span className="slice-bottom"></span>
          </div>
          <div className="slice-plate" aria-hidden="true"></div>
          <div className="cake-plate"></div>
        </div>
      </section>

      <div className="text">
        <p>Happy Birthday Ajay</p>
        {celebrating && (
          <h1>Wishing you a year full of light, laughter, and wins.</h1>
        )}
      </div>

      <div className="scene-actions">
        {!celebrating && (
          <button type="button" onClick={blowCandles} disabled={!candlesLit}>
            {candlesLit ? 'Blow candles' : 'Lighting candles'}
          </button>
        )}
        {celebrating && !cakeCut && (
          <button type="button" onClick={cutCake}>
            Cut cake
          </button>
        )}
        {celebrating && !cakeCut && (
          <button type="button" className="secondary-action" onClick={replayScene}>
            Replay
          </button>
        )}
        {celebrating && cakeCut && (
          <button type="button" onClick={replayScene}>
            Replay
          </button>
        )}
      </div>
    </main>
  );
};

export default Hero;
