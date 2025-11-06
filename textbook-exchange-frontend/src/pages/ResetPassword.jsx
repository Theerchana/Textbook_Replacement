// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { token, password }
      );

      if (response.data.success) {
        setMessage("✅ Password reset successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(response.data.message || "❌ Reset failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl p-8 flex flex-col gap-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">Reset Password</h2>
          <p className="text-gray-700 mt-1 text-sm">
            Enter your new password below to reset your account.
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
            <label className="block text-gray-800 font-medium mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          Go back to{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
