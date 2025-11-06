import Book from "../src/models/Book.js";

// ✅ Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear, owner } = req.body;
    const newBook = new Book({ title, author, publishedYear, owner });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("owner", "name email");
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("owner", "name email");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update a book
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete a book
export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
