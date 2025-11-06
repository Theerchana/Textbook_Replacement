// backend/src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ensures all emails are stored in lowercase
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // 🔹 Fields for Forgot Password feature
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

//
// ✅ Hash password before saving (only when changed)
//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

//
// ✅ Compare entered password with hashed password
//
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
