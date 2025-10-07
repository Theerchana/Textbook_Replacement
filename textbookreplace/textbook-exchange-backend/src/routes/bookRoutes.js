// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// ✅ Add a new book
router.post('/add', async (req, res) => {
  try {
    const { title, author, description, price } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      price,
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully!', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
});

// ✅ Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

// ✅ Get single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
});

// ✅ Delete book by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});

module.exports = router;
