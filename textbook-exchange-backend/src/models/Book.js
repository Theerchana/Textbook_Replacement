import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional: who owns the book
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
