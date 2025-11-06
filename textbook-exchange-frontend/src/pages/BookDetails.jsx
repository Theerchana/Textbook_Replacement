import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const allBooks = [
      ...JSON.parse(localStorage.getItem("books") || "[]"),
      ...JSON.parse(localStorage.getItem("sellBooks") || "[]"),
      ...JSON.parse(localStorage.getItem("exchangeBooks") || "[]"),
    ];
    const found = allBooks.find((b) => String(b.id) === String(id));
    setBook(found);
  }, [id]);

  if (!book) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600 mb-4">Book not found.</p>
        <Link
          to="/"
          className="text-indigo-600 hover:underline font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      {/* (A) Title + Author */}
      <h1 className="text-3xl font-bold text-indigo-700 mb-3">
        {book.title}
      </h1>
      <p className="text-gray-600 mb-2 text-lg">by {book.author}</p>

      {/* (B) Tags */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
          Condition: {book.condition || "Good"}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            book.type === "Sell"
              ? "bg-green-100 text-green-700"
              : book.type === "Exchange"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {book.type || "Normal"}
        </span>
      </div>

      {/* (C) 🟢 Special Sections start here */}
      {book.type === "Sell" && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">💰 Price</h3>
          <p className="text-xl font-bold text-green-600 mb-2">
            ₹{book.price?.toFixed(2) ?? book.transaction?.price ?? 0}
          </p>

          <p
            className={`font-medium ${
              book.transactionStatus === "paid"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            Transaction:{" "}
            {book.transactionStatus
              ? book.transactionStatus.toUpperCase()
              : "PENDING"}
          </p>

          {book.transaction && (
            <p className="text-gray-500 text-sm">
              Payment Method: {book.transaction.method}
            </p>
          )}
        </div>
      )}

      {book.type === "Exchange" && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            🔄 Exchange Information
          </h3>
          <p className="text-gray-600">
            This book is available for exchange. Contact the owner to request a trade.
          </p>
        </div>
      )}
      {/* (C) 🟢 Special Sections end here */}

      {/* (D) Owner Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">👤 Owner</h3>
        <p className="text-gray-600">{book.owner || "Unknown"}</p>
      </div>

      {/* (E) Back Navigation */}
      <Link
        to="/"
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
