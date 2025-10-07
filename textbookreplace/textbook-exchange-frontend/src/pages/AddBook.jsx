import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockBooks from "../data/mockBooks";

export default function AddBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !price || !condition) {
      alert("Please fill in all fields");
      return;
    }

    // For now we just push into mockBooks (later this will go to backend)
    const newBook = {
      id: mockBooks.length + 1,
      title,
      author,
      price: parseInt(price),
      condition,
    };

    mockBooks.push(newBook);

    // Redirect back to home
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Condition</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
