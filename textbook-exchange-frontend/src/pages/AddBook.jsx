// src/components/AddBook.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function getDefaultOwner() {
  try {
    const u =
      JSON.parse(localStorage.getItem("currentUser") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null");
    return (u && (u.name || u.email)) || "You";
  } catch {
    return "You";
  }
}

export default function AddBook() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    editionYear: "",
    condition: "Good",
    owner: getDefaultOwner(),
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      setMessage("❌ Please provide both title and author.");
      return;
    }

    if (
      formData.editionYear &&
      (Number(formData.editionYear) < 1900 || Number(formData.editionYear) > currentYear)
    ) {
      setMessage(`❌ Edition year must be between 1900 and ${currentYear}.`);
      return;
    }

    // Retrieve stored books (default empty array)
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");

    // Prepare new book entry
    const newBook = {
      id: Date.now(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      editionYear: formData.editionYear ? Number(formData.editionYear) : null,
      condition: formData.condition,
      owner: formData.owner,
      type: "add", // ✅ Important for AdminDashboard filtering
      createdAt: new Date().toISOString(),
    };

    // Save updated list
    localStorage.setItem("books", JSON.stringify([newBook, ...storedBooks]));

    // Notify AdminDashboard (live update)
    window.dispatchEvent(new Event("users-updated"));

    // Confirmation + redirect
    setMessage("✅ Book added successfully!");
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  // Background image
  const bgImage =
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80";

  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-purple-900 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(240,230,255,0.7)), url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 max-w-lg w-full text-center space-y-6 backdrop-blur-[2px] p-6 rounded-2xl">
        {/* Header */}
        <div className="mb-4">
          <div className="text-6xl mb-3 animate-bounce">📖</div>
          <h2 className="text-4xl font-extrabold text-indigo-800 drop-shadow-lg">
            Add a New Book
          </h2>
          <p className="text-indigo-900 mt-2 font-medium">
            Share your book and let someone else enjoy it!
          </p>
        </div>

        {/* Status message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${
              message.includes("✅")
                ? "bg-green-200/60 text-green-900"
                : "bg-red-200/60 text-red-900"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left bg-transparent">
          {/* Title */}
          <div>
            <label className="block text-lg font-semibold text-indigo-800 mb-1">
              Book Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/50 placeholder-indigo-400 text-indigo-900 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-lg font-semibold text-indigo-800 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author's name"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/50 placeholder-indigo-400 text-indigo-900 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Edition Year */}
          <div>
            <label className="block text-lg font-semibold text-indigo-800 mb-1">
              Edition Year
            </label>
            <input
              type="number"
              name="editionYear"
              value={formData.editionYear}
              onChange={handleChange}
              min="1900"
              max={currentYear}
              placeholder="e.g. 2023"
              className="w-full px-4 py-3 rounded-xl bg-white/50 placeholder-indigo-400 text-indigo-900 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-lg font-semibold text-indigo-800 mb-1">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/50 text-indigo-900 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>New (100%)</option>
              <option>Almost New (90%)</option>
              <option>Good (75%)</option>
              <option>Used (60%)</option>
              <option>Old (40%)</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition transform hover:scale-105"
          >
            ✅ Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
