import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("❌ Please enter both email and password");
      return;
    }

    // ✅ Retrieve registered user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
      alert("⚠️ No registered user found! Please register first.");
      return;
    }

    // ✅ Match email & password
    if (storedUser.email === email && storedUser.password === password) {
      alert("✅ Login successful!");
      console.log("Logged in user:", storedUser);
      navigate("/dashboard"); // Change route as per your app
    } else {
      alert("❌ Invalid email or password!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your registered email"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
