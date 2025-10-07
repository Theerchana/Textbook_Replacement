import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTransactions } from "../contexts/TransactionContext";

export default function Dashboard() {
  const { user } = useAuth();
  const { transactions } = useTransactions();

  // Temporary mock data until backend is connected
  const myBooks = [
    { id: 1, title: "Data Structures in C", price: 250, status: "Available" },
    { id: 2, title: "Operating System Concepts", price: 400, status: "Exchanged" },
  ];

  const exchanges = [
    { id: 1, book: "Introduction to Algorithms", withUser: "Arun", status: "Pending" },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">👤 Profile</h2>
        {user ? (
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Role:</span> {user.role || "Student"}</p>
          </div>
        ) : (
          <p className="text-gray-500">Login to view your profile details.</p>
        )}
      </section>

      {/* My Books */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">📚 My Books</h2>
        {myBooks.length > 0 ? (
          <ul className="space-y-2">
            {myBooks.map((book) => (
              <li
                key={book.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <span>
                  {book.title} — ₹{book.price}
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    book.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {book.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven’t listed any books yet.</p>
        )}
      </section>

      {/* My Exchanges */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">🔄 My Exchanges</h2>
        {exchanges.length > 0 ? (
          <ul className="space-y-2">
            {exchanges.map((ex) => (
              <li
                key={ex.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <span>
                  {ex.book} with {ex.withUser}
                </span>
                <span className="text-yellow-600 font-medium">{ex.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No exchange activity yet.</p>
        )}
      </section>

      {/* Transactions */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">💳 My Transactions</h2>
        {transactions && transactions.length > 0 ? (
          <ul className="space-y-2">
            {transactions
              .filter(
                (tx) => tx.buyerEmail === user?.email || tx.sellerEmail === user?.email
              )
              .map((tx) => (
                <li
                  key={tx.id}
                  className="flex justify-between items-center p-3 border rounded"
                >
                  <span>
                    {tx.type === "buy" ? "🛒 Purchase" : "🔄 Exchange"} — Book #{tx.bookId}  
                    <span className="ml-2 text-gray-600 text-sm">
                      (with {tx.buyerEmail === user?.email ? tx.sellerEmail : tx.buyerEmail})
                    </span>
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      tx.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : tx.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No transactions yet.</p>
        )}
      </section>
    </div>
  );
}
