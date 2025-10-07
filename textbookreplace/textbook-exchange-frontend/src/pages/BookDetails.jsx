import React from "react";
import { useParams } from "react-router-dom";
import mockBooks from "../data/mockBooks";

export default function BookDetails() {
  const { id } = useParams();
  const book = mockBooks.find((b) => b.id === Number(id));

  if (!book) {
    return <p className="text-red-500">Book not found.</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
      <p className="text-gray-600">by {book.author}</p>
      <p className="mt-4 text-gray-700">Condition: {book.condition}</p>
      <p className="text-indigo-600 font-semibold text-lg mt-2">₹{book.price}</p>
      <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        Contact Seller
      </button>
    </div>
  );
}
