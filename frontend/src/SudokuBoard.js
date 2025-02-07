import React, { useState, useEffect  } from 'react';

import { remotecheckCompletion } from './hooks/backendAPI';
import './SudokuBoard.css';
// puzzle : Original State of the Board at beginning of game (static)
// board : Latest state of the Board during gameplay with selections
const SudokuBoard = ({ puzzle, originalBoard, updateBoard, isValidationRed }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [board, setBoard] = useState([]);
  const [highlightedCells] = useState(new Set());


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
      // Check for completion of row, column, or 3x3 grid
      checkCompletionHelper(updatedBoard, rowIndex, colIndex);
      e.readOnly=false;
    } else{
      // if they hit 'delete'?
      console.debug(e)
    }
  };

  const checkCompletionHelper = (solvedBoard, row, col) => {
  
    // Call remote Method, return isRowComplete, isColComplete, isSquareComplete
    remotecheckCompletion(puzzle, solvedBoard, row, col).then((response) => {
      console.debug("Response: " + response);
      if (response.data.isRowComplete) animateRow(row);
      if (response.data.isColComplete) animateColumn(col);
      if (response.data.isSquareComplete) animateSquare(response.data.startRow, response.data.startCol);
    });

 
  };

const animateRow = (row) => {
  document.querySelectorAll(`.row:nth-child(${row + 1}) .cell`).forEach((cell) => {
    cell.classList.add('animate-row');
    setTimeout(() => cell.classList.remove('animate-row'), 1000);
  });
};

const animateColumn = (col) => {
  document.querySelectorAll(`.cell:nth-child(${col + 1})`).forEach((cell) => {
    cell.classList.add('animate-column');
    setTimeout(() => cell.classList.remove('animate-column'), 1000);
  });
};

const animateSquare = (startRow, startCol) => {
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      const cell = document.querySelector(`.row:nth-child(${i + 1}) .cell:nth-child(${j + 1})`);
      if (cell) {
        cell.classList.add('animate-square');
        setTimeout(() => cell.classList.remove('animate-square'), 1000);
      }
    }
  }
};

  return (
    <div className="board-container" style={{ position: "relative" }}>
      {isValidationRed && <div className="fade-red-overlay">X</div>} {/* Large 'X' overlay */}
      
    
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
    </div>
  );
};

export default SudokuBoard;
