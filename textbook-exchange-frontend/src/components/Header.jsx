// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 shadow-md"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1500&q=80')", // bright white book background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Slight white overlay to keep it bright */}
      <div className="bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-gray-800 hover:text-blue-700 transition-all"
          >
            📚 <span className="ml-2">Book Swap & Sell</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-medium items-center text-gray-900">
            <Link to="/" className="hover:text-blue-700 transition-colors">
              Home
            </Link>
            <Link to="/search-book" className="hover:text-blue-700 transition-colors">
              Search Books
            </Link>
            <Link to="/login" className="hover:text-blue-700 transition-colors">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-700 transition-colors">
              Register
            </Link>
            <Link to="/add-book" className="hover:text-blue-700 transition-colors">
              Add Book
            </Link>
            <Link to="/sell-book" className="hover:text-blue-700 transition-colors">
              Sell Book
            </Link>
            <Link to="/exchange-book" className="hover:text-blue-700 transition-colors">
              Exchange Book
            </Link>
            <Link to="/dashboard" className="hover:text-blue-700 transition-colors">
              Dashboard
            </Link>
            <Link to="/admin-login" className="hover:text-blue-700 transition-colors">
              Admin Login
            </Link>
            <Link to="/admin" className="hover:text-blue-700 transition-colors">
              Admin Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 hover:text-blue-700 focus:outline-none transition-colors"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 border-t border-gray-300 shadow-lg">
            <nav className="flex flex-col items-center space-y-4 py-4 text-gray-900 font-medium">
              <Link to="/" onClick={toggleMenu} className="hover:text-blue-700">
                Home
              </Link>
              <Link to="/search-book" onClick={toggleMenu} className="hover:text-blue-700">
                Search Books
              </Link>
              <Link to="/login" onClick={toggleMenu} className="hover:text-blue-700">
                Login
              </Link>
              <Link to="/register" onClick={toggleMenu} className="hover:text-blue-700">
                Register
              </Link>
              <Link to="/add-book" onClick={toggleMenu} className="hover:text-blue-700">
                Add Book
              </Link>
              <Link to="/sell-book" onClick={toggleMenu} className="hover:text-blue-700">
                Sell Book
              </Link>
              <Link to="/exchange-book" onClick={toggleMenu} className="hover:text-blue-700">
                Exchange Book
              </Link>
              <Link to="/dashboard" onClick={toggleMenu} className="hover:text-blue-700">
                Dashboard
              </Link>
              <Link to="/admin-login" onClick={toggleMenu} className="hover:text-blue-700">
                Admin Login
              </Link>
              <Link to="/admin" onClick={toggleMenu} className="hover:text-blue-700">
                Admin Dashboard
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
