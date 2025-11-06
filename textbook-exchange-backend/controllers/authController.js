// controllers/authController.js
import User from "../src/models/User.js";
import jwt from "jsonwebtoken";

// ✅ Register Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Create user; password will be hashed by pre-save hook
    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// ✅ Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // ✅ Compare password with hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "MY_SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
