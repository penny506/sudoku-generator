import React, { useState, useEffect } from 'react';
import { fetchPuzzle, validate } from './hooks/backendAPI';
import SudokuBoard from './SudokuBoard'; 
import SudokuStats from './SudokuStats';
import './App.css';

function App() {
  const [puzzle, setPuzzle] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isValidationRed, setIsValidationRed] = useState(false);

  const handleValidate = () => {
    validateHelper(difficulty, puzzle, board).then((validated) => {
      // Trigger the red fade effect
      setIsValidationRed(true);
      console.debug("Validated: " + validated);
      // Remove the effect after 3 seconds
      setTimeout(() => {
        setIsValidationRed(false);
      }, 3000);
    });
  }

  const updateBoard = (newBoard) => {
    console.debug("Appjs Updating the board" + newBoard);
    setBoard(newBoard);
  }

  const validateHelper = async (level, board, puzzle) => {
    try {
      const response = await validate(level, board, puzzle);
      setValidated(response.data.validated);
    } catch (error) {
      console.error('Error fetching validation:', error);
    }
  }
  const fetchPuzzleHelper = async (level) => {
    try {
      const response = await fetchPuzzle(level);
      setPuzzle(response.data.puzzle);
      setValidated(false);
    } catch (error) {
      console.error('Error fetching puzzle:', error);
    }
  }

  useEffect(() => {
      }, [difficulty]);

 
  
  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <div className="controls">
        <label>Difficulty: </label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={() => fetchPuzzleHelper(difficulty)}>Generate Puzzle</button>
      </div>
      <SudokuBoard puzzle={puzzle} originalBoard={board} updateBoard={updateBoard} /> 
      <div className='gap'></div>
      { !validated && (
          <button
          className={isValidationRed ? "fade-red" : ""}
          onClick={handleValidate}
        >
          Validate
        </button>

        )}
        { validated && (
          <h2 className='solved'>Game Solved!</h2> 
        )}
        <div className="gap"></div>
      <SudokuStats />
    </div>
  );
}

export default App;
