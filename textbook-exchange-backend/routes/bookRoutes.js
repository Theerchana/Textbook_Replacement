import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// ✅ CRUD Routes
router.post("/", createBook);        // Create a book
router.get("/", getAllBooks);       // Get all books
router.get("/:id", getBookById);    // Get book by ID
router.put("/:id", updateBook);     // Update book
router.delete("/:id", deleteBook);  // Delete book

export default router;
