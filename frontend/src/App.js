import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SudokuBoard from './SudokuBoard';
import './App.css';

function App() {
  const [puzzle, setPuzzle] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');

  const fetchPuzzle = async (level) => {
    try {
      const response = await axios.get(`http://localhost:3001/sudoku?difficulty=${level}`);
      setPuzzle(response.data.puzzle);
    } catch (error) {
      console.error('Error fetching puzzle:', error);
    }
  };

  useEffect(() => {
    fetchPuzzle(difficulty);
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
        <button onClick={() => fetchPuzzle(difficulty)}>Generate Puzzle</button>
      </div>
      <SudokuBoard puzzle={puzzle} />
    </div>
  );
}

export default App;
