import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import Dashboard from "./pages/Dashboard"; // ✅ Add this
import NotFound from "./pages/NotFound"; // 404 page

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation bar */}
      <Header />

      {/* Main content */}
      <main className="container mx-auto flex-grow p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Book-related Routes */}
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ New */}

          {/* Fallback for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
