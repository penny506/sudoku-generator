const express = require('express');
const cors = require('cors');
const { generateSudoku } = require('./sudoku');

const app = express();
const PORT = 3001;

app.use(cors());  // Enable CORS for frontend requests

app.get('/sudoku', (req, res) => {
  const difficulty = req.query.difficulty || 'easy';
  const puzzle = generateSudoku(difficulty);
  res.json({ difficulty, puzzle });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
