let sharedSolutionMap = new Map();// SHARED DATA ARRAY of Original Board Maps
let sharedSolvedMap = new Map();// store the solved boards

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
    // Since the first Row is already filled, we can start from the SECOND row
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
    const PuzzleBoard = (board.flat().join('')); // Original Puzzle Solution flattened to a string
    removeNumbers(board, 81 - clues);
    const OriginalBoard = (board.flat().join('')); // Removed values flattened to a string

    sharedSolutionMap.set(PuzzleBoard,OriginalBoard);
    console.debug(sharedSolutionMap.get(PuzzleBoard) + " is the value of " + OriginalBoard);
    console.debug("Answer to the Puzzle is " + PuzzleBoard);
    return board;
  }

  

  function validateBoard(difficulty, OriginalBoard, PuzzleBoard)   {
    console.debug("Validating the board with Value " + OriginalBoard + " and Key " + PuzzleBoard); 
    // Find the Key, then compare against the original board
    const OriginalBoardKeyValue = sharedSolutionMap.get(PuzzleBoard);
    console.debug("Same check The Original key value is " + OriginalBoardKeyValue);
    console.debug("Same check The original board is " + OriginalBoard);
    console.debug("Check size of sharedSolutionMap " + sharedSolutionMap.size); 
    console.debug("compare equals:" + (OriginalBoardKeyValue === OriginalBoard));
    
    const trueFalse = OriginalBoardKeyValue === OriginalBoard;
    console.debug("The result is " + trueFalse);

    if(trueFalse){
      sharedSolutionMap.delete(PuzzleBoard);
      sharedSolvedMap.set(PuzzleBoard,OriginalBoard);// store solved boards
      console.debug("WINNER FOUND! Deleted the board " + OriginalBoardKeyValue + " from the sharedSolutionMap");
    }
     
    return trueFalse;
  }

  // function publicSolveSudoku(playerBoard) {
  //   console.debug("Solving the board against " + sharedSolutionMap);
  //   return isGameSolved(playerBoard, sharedSolutionMap);

  // }

  // const isGameSolved = (playerBoard, sharedSolutionMap) => {
  //   for (let i = 0; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       if (playerBoard[i][j] !== sharedSolutionMap[i][j]) {
  //         return false; // Mismatch found
  //       }
  //     }
  //   }
  //   return true; // Boards match
  // };

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

  function getStats() {
    return {
       
      totalBoards: sharedSolutionMap.size,
      solvedBoards: sharedSolvedMap.size,
 
    };
  }
  
  module.exports = { generateSudoku, validateBoard, getStats };
  