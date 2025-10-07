import React, { useState } from "react";
import { Link } from "react-router-dom";
import mockBooks from "../data/mockBooks";

export default function Home() {
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesCondition = condition ? book.condition === condition : true;

    const matchesPrice =
      priceRange === "low"
        ? book.price < 300
        : priceRange === "mid"
        ? book.price >= 300 && book.price <= 500
        : priceRange === "high"
        ? book.price > 500
        : true;

    return matchesSearch && matchesCondition && matchesPrice;
  });

  return (
    <div>
      {/* Search + Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full md:w-1/4 border rounded px-3 py-2"
        >
          <option value="">All Conditions</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Used">Used</option>
        </select>

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
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-800 font-semibold">₹{book.price}</p>
              <p className="text-sm text-gray-500 mb-2">{book.condition}</p>
              <Link
                to={`/books/${book.id}`}
                className="mt-auto text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No books found.</p>
        )}
      </div>
    </div>
  );
}
