import React, { useState } from 'react';
import './SudokuBoard.css';

const SudokuBoard = ({ puzzle }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleCellClick = (value) => {
    if (value !== 0) {
      // Toggle highlight: un-highlight if already selected
      setSelectedNumber(selectedNumber === value ? null : value);
    } else {
      setSelectedNumber(null);
    }
  };

  return (
    <div className="board">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cell !== 0 ? cell : ''}
              readOnly={cell !== 0}
              className={`cell ${cell === selectedNumber ? 'highlight' : ''}`}
              onClick={() => handleCellClick(cell)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
