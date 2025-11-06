// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [exchangeBooks, setExchangeBooks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [completedExchanges, setCompletedExchanges] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBook, setModalBook] = useState(null);

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser") || "null") ||
    JSON.parse(localStorage.getItem("user") || "null") || { name: "You" };
  const currentUserName = currentUser.name || currentUser.email || "You";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
      const localExchange = JSON.parse(localStorage.getItem("exchangeBooks") || "[]");
      setExchangeBooks(localExchange);
      setNotifications(JSON.parse(localStorage.getItem("exchangeNotifications") || "[]"));

      const completed = localExchange
        .flatMap((book) =>
          (book.requests || [])
            .filter((r) => r.status === "accepted")
            .map((r) => ({
              bookTitle: book.title,
              owner: book.owner,
              requester: r.user,
              acceptedAt: r.createdAt,
            }))
        )
        .sort((a, b) => new Date(b.acceptedAt) - new Date(a.acceptedAt));

      setCompletedExchanges(completed);
    } catch (error) {
      console.error(error);
      setBooks(JSON.parse(localStorage.getItem("books") || "[]"));
      setExchangeBooks(JSON.parse(localStorage.getItem("exchangeBooks") || "[]"));
      setNotifications(JSON.parse(localStorage.getItem("exchangeNotifications") || "[]"));
    }
  }

  // 🌸 New aesthetic book background (stacked books + sunlight)
  const backgroundImage =
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80";
  // (Warm, cozy, aesthetic: book stack with soft light)

  return (
    <div
      className="relative min-h-screen flex flex-col items-center p-6 md:p-10 overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(80, 40, 120, 0.55), rgba(180, 120, 200, 0.45)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Soft glowing lights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full opacity-25 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400 rounded-full opacity-25 blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
        📚 Your BookSwap Dashboard
      </h1>

      {/* Main card */}
      <div className="relative w-full max-w-6xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 space-y-10 border border-white/20">
        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/add-book"
            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl shadow hover:shadow-lg transition"
          >
            ➕ Add Book
          </Link>
          <Link
            to="/sell-book"
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-xl shadow hover:shadow-lg transition"
          >
            💰 Sell Book
          </Link>
          <Link
            to="/exchange-book"
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-xl shadow hover:shadow-lg transition"
          >
            🔄 Exchange Book
          </Link>
        </div>

        {/* Notifications Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">🔔 Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-200">No notifications right now.</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="bg-white/20 backdrop-blur p-4 rounded-2xl flex justify-between items-center shadow border border-white/30"
                >
                  <div>
                    <p className="font-medium text-white">{n.message}</p>
                    <p className="text-xs text-gray-300">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications((prev) => prev.filter((x) => x.id !== n.id))
                    }
                    className="text-sm text-pink-200 hover:text-white transition"
                  >
                    ✖ Dismiss
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Books Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">📘 My Books</h2>
          {books.length === 0 ? (
            <p className="text-gray-200">No books added yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white/20 backdrop-blur p-4 rounded-2xl shadow hover:shadow-xl transition"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">{book.title}</h3>
                  <p className="text-gray-200 mb-1">Author: {book.author}</p>
                  <p className="text-gray-200 mb-2">Condition: {book.condition}</p>
                  <button
                    onClick={() =>
                      setBooks((prev) => prev.filter((b) => b.id !== book.id))
                    }
                    className="w-full py-2 rounded-xl bg-red-400/30 hover:bg-red-500/40 text-white font-medium shadow transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Exchange Listings Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">🔄 Exchange Listings</h2>
          {exchangeBooks.length === 0 ? (
            <p className="text-gray-200">No exchange listings yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {exchangeBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white/20 backdrop-blur p-4 rounded-2xl shadow hover:shadow-xl transition"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">{book.title}</h3>
                  <p className="text-gray-200 mb-1">Author: {book.author}</p>
                  <p className="text-gray-200 mb-1">Condition: {book.condition}</p>
                  <p className="text-sm text-gray-300 mb-2">
                    Owner: {book.owner || "Unknown"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
