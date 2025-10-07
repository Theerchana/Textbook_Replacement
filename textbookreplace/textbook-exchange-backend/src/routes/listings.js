const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Add Book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: 'Book added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;
