import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mockBooks from "../data/mockBooks";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [showToast, setShowToast] = useState(false); // ✅ for success message

  // 🔄 Load books from localStorage + mock data
  const loadBooks = () => {
    const normalBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const sellBooks = JSON.parse(localStorage.getItem("sellBooks") || "[]");
    const exchangeBooks = JSON.parse(localStorage.getItem("exchangeBooks") || "[]");

    const formattedSellBooks = sellBooks.map((b) => ({
      ...b,
      price: Number(b.transaction?.price || b.price || 0),
      condition: b.condition || "70% - Good condition, minor wear",
      type: "Sell",
    }));

    const formattedExchangeBooks = exchangeBooks.map((b) => ({
      ...b,
      price: 0,
      condition: b.condition || "70% - Good condition, minor wear",
      type: "Exchange",
    }));

    const formattedNormalBooks = normalBooks.map((b) => ({
      ...b,
      price: 0,
      condition: b.condition || "100% - New / Fresh",
      type: "Normal",
    }));

    const combined = [
      ...formattedNormalBooks,
      ...formattedSellBooks,
      ...formattedExchangeBooks,
      ...mockBooks.map((b) => ({
        ...b,
        price: Number(b.price || 0),
        condition: b.condition || "70% - Good condition, minor wear",
        type: b.type || "Sell",
      })),
    ];

    setAllBooks(combined);

    // ✅ Show success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Run on mount and refocus
  useEffect(() => {
    loadBooks();
    window.addEventListener("focus", loadBooks);
    const onStorageChange = () => loadBooks();
    window.addEventListener("storage", onStorageChange);
    return () => {
      window.removeEventListener("focus", loadBooks);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  // 🧠 Filter Logic (Fixed)
  const filteredBooks = allBooks.filter((book) => {
    const title = (book.title || "").toLowerCase();
    const author = (book.author || "").toLowerCase();
    const conditionText = (book.condition || "").toLowerCase();
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      title.includes(searchTerm) || author.includes(searchTerm);

    // ✅ Smarter condition matching
    const matchesCondition = condition
      ? conditionText.includes(condition.toLowerCase()) ||
        conditionText.includes(`${condition}%`)
      : true;

    const price = Number(book.price) || 0;
    const matchesPrice =
      priceRange === "low"
        ? price < 300
        : priceRange === "mid"
        ? price >= 300 && price <= 500
        : priceRange === "high"
        ? price > 500
        : true;

    return matchesSearch && matchesCondition && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 relative">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        📚 Student Book Marketplace
      </h1>

      {/* 🔍 Search + Filter Section */}
      <div className="backdrop-blur-md bg-white/60 p-5 rounded-xl shadow-md mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* Condition Filter */}
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full md:w-1/4 border rounded px-3 py-2"
        >
          <option value="">All Conditions</option>
          <option value="100">100% - New / Fresh</option>
          <option value="90">90% - Almost New</option>
          <option value="70">70% - Good</option>
          <option value="60">60% - Used</option>
          <option value="40">40% - Old / Worn</option>
        </select>

        {/* Price Filter */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full md:w-1/4 border rounded px-3 py-2"
        >
          <option value="">All Prices</option>
          <option value="low">Below ₹300</option>
          <option value="mid">₹300 - ₹500</option>
          <option value="high">Above ₹500</option>
        </select>

        {/* Refresh Button */}
        <button
          onClick={loadBooks}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center justify-center gap-2"
        >
          🔄 Refresh
        </button>
      </div>

      {/* 📚 Book List Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id || book.title}
              className="backdrop-blur-md bg-white/70 shadow-lg rounded-xl p-4 flex flex-col hover:shadow-xl hover:scale-105 transition"
            >
              <h2 className="text-lg font-bold text-indigo-700">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>

              {book.type === "Sell" && (
                <p className="text-gray-800 font-semibold mt-2">
                  💰 Price: ₹{book.price?.toFixed(2) ?? 0}
                </p>
              )}

              <p className="text-sm text-gray-500 mb-2 mt-1">
                Condition: {book.condition}
              </p>

              <p className="text-xs text-indigo-600 mb-2">
                {book.type ? `Type: ${book.type}` : ""}
              </p>

              <Link
                to={`/books/${book.id}`}
                className="mt-auto bg-indigo-600 text-white text-center py-2 rounded hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">
            No books found. Try changing filters or refresh 🔄
          </p>
        )}
      </div>

      {/* ✅ Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          ✅ Books refreshed successfully!
        </div>
      )}

      {/* ✨ Animation style */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
