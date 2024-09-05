import React from 'react'

const AbcCard = ({ image, word, onClick, isFlipped }) => {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
      style={{
        backgroundImage: isFlipped ? `url(${image})` : 'none',
        backgroundColor: isFlipped ? 'transparent' : '#ddd',
      }}
    >
      {isFlipped && <span className="word">{word}</span>}
    </div>
  );
};

export default AbcCard