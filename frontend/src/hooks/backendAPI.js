import axios from 'axios';

export const fetchPuzzle = async (level) => {
    try {
      const response = await axios.get(`http://localhost:2999/sudoku?difficulty=${level}`);
      return response;
    } catch (error) {
      console.error('Error fetching puzzle:', error);
    }
  };

export  const remotecheckCompletion = async (originalBoard, solvedBoard, row, col) => {
    console.debug("Checking for completion");
    try {
      const response = await axios.get(`http://localhost:2999/checkCompletion?originalBoard=${originalBoard}&solvedBoard=${solvedBoard}&row=${row}&col=${col}`);
      console.debug("Response: " + response.data);
      return response;
    } catch (error) {
      console.error('Error fetching Completion:', error);
    }
  }

export const validate = async (level,board, puzzle) => {

    console.debug("Validating the board" + board);
    try {
      const response = await axios.get(`http://localhost:2999/validate?difficulty=${level}&originalBoard=${board}&solvedBoard=${puzzle}`);
        return response;   
    } catch (error) {
      console.error('Error fetching Validation:', error);
    }
  }

