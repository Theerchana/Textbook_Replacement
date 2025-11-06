// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Dark overlay for contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      ></div>

      {/* Centered content */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          color: "#f8f9fa",
          padding: "60px",
          borderRadius: "15px",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#ffffff",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.8)",
          }}
        >
          📚 Book Exchange Portal
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            color: "#d1e7ff",
            marginBottom: "40px",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          Discover, exchange, and share books easily with your college network!
        </p>

        <div style={{ display: "flex", gap: "25px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "14px 40px",
              fontSize: "1.1rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "14px 40px",
              fontSize: "1.1rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#28a745",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1e7e34")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}