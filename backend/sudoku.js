function isSafe(board, row, col, num) {
  // Check if 'num' is already present in the current row or column
  for (let x = 0; x < 9; x++) {
      // Check the row (board[row][x]) and the column (board[x][col])
      if (board[row][x] === num || board[x][col] === num) {
          return false; // If 'num' is found, it's not safe to place here
      }
  }

  // Calculate the starting indices of the 3x3 subgrid containing the cell (row, col)
  const startRow = row - (row % 3); // Top-left row index of the subgrid
  const startCol = col - (col % 3); // Top-left column index of the subgrid

  // Check if 'num' is already present in the 3x3 subgrid
  for (let i = 0; i < 3; i++) {       // Loop through the rows of the subgrid
      for (let j = 0; j < 3; j++) {   // Loop through the columns of the subgrid
          // Check the current cell in the subgrid
          if (board[i + startRow][j + startCol] === num) {
              return false; // If 'num' is found in the subgrid, it's not safe
          }
      }
  }

  // If 'num' is not found in the row, column, or subgrid, it's safe to place it
  return true;
}
  
  function fillGrid(board) {
    // Since the first Row is already filled, we can start from the second row
    for (let row = 1; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          // Optimize, as the First row =0 does not have to go through the isSafe function
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
  