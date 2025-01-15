import React, { useState, useEffect } from 'react';
import './SudokuBoard.css';

const SudokuBoard = ({ puzzle }) => {
  const [board, setBoard] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    setBoard(puzzle);
  }, [puzzle]);

  const handleCellClick = (value) => {
    if (value !== 0) {
      // Toggle highlight: un-highlight if already selected
      setSelectedNumber(selectedNumber === value ? null : value);
    } else {
      setSelectedNumber(null);
    }
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const inputValue = e.target.value;
    
    // Ensure only digits 1-9 can be entered
    if (/^[1-9]?$/.test(inputValue)) {
      const updatedBoard = board.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? (inputValue === '' ? 0 : parseInt(inputValue)) : cell
        )
      );
      setBoard(updatedBoard);
    } else {
      e.preventDefault();
    }
  };

  const isHighlighted = (value) => selectedNumber !== null && selectedNumber === value;

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cell !== 0 ? cell : ''}
              onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
              readOnly={cell !== 0}
              className={`cell ${isHighlighted(cell) ? 'highlight' : ''}`}
              onClick={() => handleCellClick(cell)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
