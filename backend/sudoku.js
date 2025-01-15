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
    for (let row = 0; row < 9; row++) {
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
  
    removeNumbers(board, 81 - clues);
    return board;
  }
  
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
  