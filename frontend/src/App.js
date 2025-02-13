import React, { useState, useEffect } from 'react';
import { fetchPuzzle, validate } from './hooks/backendAPI';
import SudokuBoard from './SudokuBoard'; 
import SudokuStats from './SudokuStats';
import { Button } from 'primereact/button';

import { Dialog } from "primereact/dialog";
// TODO: Complete this
// import { Toolbar } from 'primereact/toolbar';
import { Menubar } from 'primereact/menubar';
import './App.css';

function App() {
  const [puzzle, setPuzzle] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [board, setBoard] = useState([]);
  const [validated, setValidated] = useState(false);
  const [isValidationRed, setIsValidationRed] = useState(false);
  const [isValidationGreen, setIsValidationGreen] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const handleValidate = () => {
    validateHelper(difficulty, puzzle, board).then((result) => {
      console.debug("Validated: " + result);
      // Trigger the red fade effect IF the reuslt is false
      if(!result){
        setIsValidationRed(true);
        // Remove the effect after 3 seconds
        setTimeout(() => {
          setIsValidationRed(false);
        }, 3000);
      }
      else{
        // YOU WON!
        setIsValidationGreen(true);
        setTimeout(() => {
          setIsValidationGreen(false);
        }, 3000);

      }
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
      return response.data.validated;
    } catch (error) {
      console.error('Error fetching validation:', error);
    }
  }

  const fetchPuzzleHelper = async (level) => {
    setDifficulty(level.value)
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
  
      const difficultyLevels = [
        { label: "Easy", value: "easy" },
        { label: "Medium", value: "medium" },
        { label: "Hard", value: "hard" }
      ];
      
      const items = [
        {
          label: "Choose Difficulty Level",
          icon: "pi pi-sliders-h",
          items: difficultyLevels.map((level) => ({
            label: level.label,
            command: () => fetchPuzzleHelper(level.value),
          })),
        },
        {
          label: "Validate",
          icon: "pi pi-check",
          command: handleValidate,
        },
        {
          label: "View Stats",
          icon: "pi pi-chart-bar",
          command: () => setShowStats(true), // Opens the Stats dialog
        }
    ];

  return (
    <div className="App">
      <h1>Sudoku Game</h1> 
      <div className="card" icon=" pi-align-center">
            <Menubar model={items} />
             {/* SudokuStats Dialog */}
            <Dialog header="Sudoku Stats" visible={showStats} style={{ width: '50vw' }} onHide={() => setShowStats(false)}>
              <SudokuStats /> {/* Render your SudokuStats component inside the dialog */}
            </Dialog>
        </div>

 
          
      <div className="gap"></div>
         
        
      <SudokuBoard puzzle={puzzle} originalBoard={board} updateBoard={updateBoard} isValidationRed={isValidationRed} isValidationGreen={isValidationGreen}/> 
      
      <div className='gap'></div>
        { validated && (
            <h2 className='solved'>Game Solved!</h2> 
        )}
      
        <div className="gap"></div>
    </div>
  );
}

export default App;
