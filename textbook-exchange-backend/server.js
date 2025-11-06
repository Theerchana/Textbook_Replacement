// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import CORS

// ✅ Import routes
import authRoutes from "./routes/authRoutes.js"; // make sure this matches your file name
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Allow your React app
    credentials: true,
  })
);
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Routes
app.use("/api/auth", authRoutes); // handles login/register/forgot/reset
app.use("/api/books", bookRoutes); // handles all book-related routes

// ✅ Default route for testing
app.get("/", (req, res) => {
  res.send("📚 Backend running successfully 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
