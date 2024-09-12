import React from 'react'

const AbcCard = ({ content, type, onClick, isFlipped }) => {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      {isFlipped ? (
        <div className="card-content">
          {type === 'image' ? (
            <img src={content} alt="content" className="card-image" />
          ) : (
            <span className="card-word">{content}</span>
          )}
        </div>
      ) : (
        <div className="card-back"></div> 
      )}
    </div>
  );
};

export default AbcCard