function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) {
        return false;
      }
    }
  
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }
    return true;
  }
  
  function fillGrid(board) {
    // Since the first Row is already filled, we can start from the second row
    for (let row = 1; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  
          for (let num of numbers) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
  
              if (fillGrid(board)) {
                return true;
              }
  
              board[row][col] = 0;
            }
          }
  
          return false;
        }
      }
    }
    return true;
  }
  
  function generateSudoku(difficulty = 'easy') {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  // Take the new Board, and replace the first row with a random permutation of 1-9
  board[0] = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  // now when I pass the board to the fillGrid, I can SKIP the first row
    fillGrid(board);
  
    let clues;
    switch (difficulty) {
      case 'easy':
        clues = 40;
        break;
      case 'medium':
        clues = 32;
        break;
      case 'hard':
        clues = 25;
        break;
      default:
        clues = 40;
    }
    // I feel I need to store the Original Board somewhere, so I can compare the user's input to the original board
    setOriginalBoard(board);
    removeNumbers(board, 81 - clues);
    return board;
  }
  
  setOriginalBoard = (board) => {
    const originalBoard = JSON.parse(JSON.stringify(board));
  };

  function publicSolveSudoku(playerBoard) {
    return isGameSolved(playerBoard, originalBoard);

  }

  const isGameSolved = (playerBoard, originalBoard) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (playerBoard[i][j] !== originalBoard[i][j]) {
          return false; // Mismatch found
        }
      }
    }
    return true; // Boards match
  };

  function removeNumbers(board, removeCount) {
    while (removeCount > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
  
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        removeCount--;
      }
    }
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  module.exports = { generateSudoku };
  