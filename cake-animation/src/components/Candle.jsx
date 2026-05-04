import React from 'react';
import './Candle.css';

const Candle = ({ number, delay = '0s', isLit = false, isBlown = false }) => {
  const candleClass = `number-candle${isBlown ? ' is-blown' : ''}`;

  return (
    <div className={candleClass} style={{ '--drop-delay': delay }}>
      <div className="wick"></div>
      {isLit && !isBlown && (
        <>
          <div className="flame"></div>
          <div className="flame"></div>
          <div className="flame"></div>
          <div className="flame"></div>
          <div className="flame"></div>
        </>
      )}
      {isBlown && (
        <>
          <div className="smoke"></div>
          <div className="smoke smoke-two"></div>
        </>
      )}
      <span>{number}</span>
    </div>
  );
};

export default Candle;
