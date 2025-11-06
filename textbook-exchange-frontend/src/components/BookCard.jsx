import React from "react";

export default function BookCard({ book }) {
  if (!book) return null;

  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-gray-600">₹{book.price}</p>
      <p className="text-sm text-gray-500">{book.status}</p>
    </div>
  );
}
