const express = require('express');
const cors = require('cors');
const { generateSudoku,validateBoard, getStats } = require('./sudoku');
const { get } = require('http');

const app = express();
const PORT = 2999;

app.use(cors());  // Enable CORS for frontend requests

app.get('/sudoku', (req, res) => {
  const difficulty = req.query.difficulty || 'easy';
  const puzzle = generateSudoku(difficulty);
  res.json({ difficulty, puzzle });
});

app.get('/validate', (req, res) => {
  const difficulty = req.query.difficulty || 'easy';
  const originalBoard = req.query.originalBoard.replaceAll(',', '') || [];
  const solvedBoard = req.query.solvedBoard.replaceAll(',', '') || [];
  const validated = validateBoard(difficulty,originalBoard,solvedBoard);
  res.json({ validated });
});

app.get('/stats', (req, res) => {
  const stats = getStats();
  //console.debug("stats:" + stats);
  res.json(stats);
});

app.listen(PORT, () => {
  console.debug(`Backend running on http://localhost:${PORT}`);
});
