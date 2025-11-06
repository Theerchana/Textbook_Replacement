// src/pages/ExchangeBook.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function getDefaultOwner() {
  try {
    const user =
      JSON.parse(localStorage.getItem("currentUser") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null");
    return (user && (user.name || user.email)) || "You";
  } catch {
    return "You";
  }
}

export default function ExchangeBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    condition: "Good (75%)",
    owner: getDefaultOwner(),
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit and save book to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    const newBook = {
      id: Date.now(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      condition: formData.condition,
      owner: formData.owner,
      type: "exchange", // 👈 Important for AdminDashboard filtering
      requests: [],
      createdAt: new Date().toISOString(),
    };

    // ✅ Save to both exchangeBooks and books list
    const exchangeBooks = JSON.parse(localStorage.getItem("exchangeBooks") || "[]");
    localStorage.setItem("exchangeBooks", JSON.stringify([newBook, ...exchangeBooks]));

    const allBooks = JSON.parse(localStorage.getItem("books") || "[]");
    localStorage.setItem("books", JSON.stringify([newBook, ...allBooks]));

    // ✅ Create a notification for admin or user tracking
    const notifications = JSON.parse(localStorage.getItem("exchangeNotifications") || "[]");
    notifications.unshift({
      id: Date.now(),
      message: `${formData.owner} listed "${formData.title}" for exchange.`,
      bookId: newBook.id,
      owner: formData.owner,
      createdAt: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem("exchangeNotifications", JSON.stringify(notifications));

    // ✅ Notify AdminDashboard to refresh automatically
    window.dispatchEvent(new Event("users-updated"));

    setMessage("✅ Exchange book added successfully!");
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  // Background image
  const backgroundImage =
    "https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&w=1600&q=80";

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-10 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 20, 60, 0.5), rgba(30, 20, 60, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Title */}
      <h2 className="text-5xl font-extrabold mb-4 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        📚 Exchange Your Book
      </h2>
      <p className="text-lg mb-8 text-center text-pink-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]">
        Give a book, get a story ✨
      </p>

      {/* Message Display */}
      {message && (
        <div
          className={`mb-5 px-6 py-3 rounded-xl text-center font-medium shadow-lg ${
            message.includes("✅")
              ? "bg-green-600/70 text-white"
              : "bg-red-600/70 text-white"
          }`}
        >
          {message}
        </div>
      )}

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-5 text-white font-medium"
      >
        {/* Title */}
        <div>
          <label className="block text-pink-200 mb-2 text-lg drop-shadow-sm">
            📘 Book Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-pink-200 mb-2 text-lg drop-shadow-sm">
            ✍️ Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-pink-200 mb-2 text-lg drop-shadow-sm">
            📖 Condition
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
          >
            <option className="text-black">New (100%)</option>
            <option className="text-black">Almost New (90%)</option>
            <option className="text-black">Good (75%)</option>
            <option className="text-black">Used (60%)</option>
            <option className="text-black">Old (40%)</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold shadow-lg transition-all duration-200 active:scale-95"
        >
          ✅ Add for Exchange
        </button>
      </form>
    </div>
  );
}
