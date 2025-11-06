// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api"; // Make sure you have this API call

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await forgotPassword({ email });

      if (data.success) {
        setMessage("✅ Reset link sent! Check your email.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "❌ Email not found");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-sky-200 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl p-8 flex flex-col gap-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">Forgot Password</h2>
          <p className="text-gray-700 mt-1 text-sm">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${
              message.includes("✅") ? "bg-green-100/70 text-green-900" : "bg-red-100/70 text-red-900"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-800 font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/90 placeholder-gray-400 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm hover:shadow-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
