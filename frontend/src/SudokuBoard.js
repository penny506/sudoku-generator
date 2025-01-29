import React, { useState, useEffect  } from 'react';
import './SudokuBoard.css';
// puzzle : Original State of the Board at beginning of game (static)
// board : Latest state of the Board during gameplay with selections
const SudokuBoard = ({ puzzle, originalBoard, updateBoard }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [board, setBoard] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState(new Set());


  // Initialize the board with the puzzle
  useEffect(() => {
    setBoard(puzzle);
  }, [puzzle]);

  const handleCellClick = (value) => {
    console.debug("Cell value " + value);
    if (value !== 0) {
      // Toggle highlight: un-highlight if already selected
      setSelectedNumber(selectedNumber === value ? null : value);
    } else {
      setSelectedNumber(null);
    }
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const inputValue = e.target.value;
    //console.debug(e);
    console.debug("I entered a number " + inputValue + " at position:" + rowIndex + ":" + colIndex);  
    // Ensure only digits 1-9 can be entered
    if (/^[1-9]?$/.test(inputValue)) {
      const updatedBoard = board.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? (inputValue === '' ? 0 : parseInt(inputValue)) : cell
        )
      );
      setBoard(updatedBoard);
      updateBoard(updatedBoard);
      //console.debug(updatedBoard)
      e.readOnly=false;
    } else{
      // if they hit 'delete'?
      console.debug(e)
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
              className={`cell 
                ${cell === selectedNumber ? 'highlight' : ''} 
                ${highlightedCells.has(`${rowIndex}-${colIndex}`) ? 'highlighted-cell' : ''}`}
              onClick={() => handleCellClick(cell)}
            />
          ))}
          
        </div>
        
      ))}
      
    </div> 
  );
};

export default SudokuBoard;
