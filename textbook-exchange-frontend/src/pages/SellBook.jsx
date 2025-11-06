// src/pages/SellBook.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import qrImage from "../assets/gpay_scan.jpg";

// 🧭 Get logged-in user as default book owner
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

export default function SellBook() {
  const navigate = useNavigate();

  // 📋 Form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    condition: "Good (70%) – Minor wear",
    owner: getDefaultOwner(),
    transactionStatus: "pending",
  });

  const [message, setMessage] = useState("");

  // 🧠 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💳 Simulate payment
  const handlePayment = () => {
    const confirmPay = window.confirm(
      `📱 Proceed to pay ₹${formData.price} via GPay simulation?`
    );
    if (confirmPay) {
      setFormData((prev) => ({ ...prev, transactionStatus: "paid" }));
      setMessage("✅ Payment simulated successfully!");
      setTimeout(() => setMessage(""), 1500);
    }
  };

  // 💾 Handle book submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.author || !formData.price) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    // Create new book entry
    const newBook = {
      id: Date.now(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      condition: formData.condition,
      price: Number(formData.price),
      owner: formData.owner,
      transactionStatus: formData.transactionStatus,
      createdAt: new Date().toISOString(),
      type: "sell", // ✅ Key fix: lowercase 'sell' for AdminDashboard
      transaction: {
        price: Number(formData.price),
        status: formData.transactionStatus,
        method: "GPay",
      },
    };

    // Retrieve and update book lists
    const allBooks = JSON.parse(localStorage.getItem("books") || "[]");
    allBooks.unshift(newBook);
    localStorage.setItem("books", JSON.stringify(allBooks));

    const sellBooks = JSON.parse(localStorage.getItem("sellBooks") || "[]");
    sellBooks.unshift(newBook);
    localStorage.setItem("sellBooks", JSON.stringify(sellBooks));

    // 🔄 Notify AdminDashboard to update live
    window.dispatchEvent(new Event("users-updated"));

    // Success message and redirect
    setMessage("✅ Book listed for sale successfully!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  // 🎨 Background image
  const backgroundImage =
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80";

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-10 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(80, 40, 120, 0.6), rgba(40, 0, 70, 0.8)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-3 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        💰 Sell Your Book
      </h1>
      <p className="text-lg mb-6 text-pink-100 text-center drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]">
        Turn your old books into new opportunities ✨
      </p>

      {/* Status Message */}
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

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-5 text-white font-medium"
      >
        {/* Title */}
        <div>
          <label className="block text-pink-200 mb-2 text-lg">📚 Book Title</label>
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
          <label className="block text-pink-200 mb-2 text-lg">✍️ Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author's name"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-pink-200 mb-2 text-lg">📖 Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
          >
            <option className="text-black">New (100%) – Perfect condition</option>
            <option className="text-black">Almost New (90%) – Barely used</option>
            <option className="text-black">Good (70%) – Minor wear</option>
            <option className="text-black">Used (60%) – Old but readable</option>
            <option className="text-black">Old (40%) – Heavily used</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-pink-200 mb-2 text-lg">💸 Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-200 border border-white/40 focus:ring-2 focus:ring-pink-300 outline-none transition-all"
          />
        </div>

        {/* Payment Section */}
        {formData.transactionStatus === "pending" && (
          <div className="flex flex-col items-center mt-6">
            <h3 className="text-lg mb-2 font-semibold text-pink-200">📱 Scan & Pay</h3>
            <img
              src={qrImage}
              className="w-44 h-44 rounded-xl shadow-lg border border-white/40"
              alt="QR"
            />
            <p className="text-sm opacity-80 mt-2 text-center text-gray-200">
              Complete payment via UPI to continue
            </p>
          </div>
        )}

        {/* Payment Status */}
        <div className="flex justify-between items-center mt-4">
          <span
            className={`font-semibold text-lg ${
              formData.transactionStatus === "paid"
                ? "text-green-400"
                : "text-yellow-300"
            }`}
          >
            Status: {formData.transactionStatus.toUpperCase()}
          </span>

          {formData.transactionStatus === "pending" && (
            <button
              onClick={handlePayment}
              type="button"
              className="px-5 py-2 bg-green-500/80 hover:bg-green-600 text-white rounded-2xl shadow-md transition hover:shadow-lg"
            >
              💳 Pay Now
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white font-bold shadow-lg transition-all duration-200 active:scale-95 mt-3"
        >
          ✅ Submit for Sale
        </button>
      </form>
    </div>
  );
}
