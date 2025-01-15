import React, { useState, useEffect  } from 'react';
import './SudokuBoard.css';
// puzzle : Original State of the Board at beginning of game (static)
// board : Latest state of the Board during gameplay with selections
const SudokuBoard = ({ puzzle }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [board, setBoard] = useState([]);

  // Initialize the board with the puzzle
  useEffect(() => {
    setBoard(puzzle);
  }, [puzzle]);

  const handleCellClick = (value) => {
    console.log("Cell value " + value);
    if (value !== 0) {
      // Toggle highlight: un-highlight if already selected
      setSelectedNumber(selectedNumber === value ? null : value);
    } else {
      setSelectedNumber(null);
    }
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const inputValue = e.target.value;
    //console.log(e);
    console.log("I entered a number " + inputValue + " at position:" + rowIndex + ":" + colIndex);  
    // Ensure only digits 1-9 can be entered
    if (/^[1-9]?$/.test(inputValue)) {
      const updatedBoard = board.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? (inputValue === '' ? 0 : parseInt(inputValue)) : cell
        )
      );
      setBoard(updatedBoard);
      console.log(updatedBoard)
      e.readOnly=false;
    } else{
      // if they hit 'delete'?
      console.log(e)
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"              
              onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
              maxLength="1"
              value={cell !== 0 ? cell : ''}
              readOnly={cell !== 0 && board[rowIndex][colIndex] === puzzle[rowIndex][colIndex]}  
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
