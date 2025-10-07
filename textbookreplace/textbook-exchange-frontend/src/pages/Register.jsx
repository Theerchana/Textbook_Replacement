import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const allowedDomains = [
    "mkce.ac.in",
    "psgtech.ac.in",
    "vit.ac.in",
    "srmist.edu.in",
    "annauniv.edu",
    "smail.iitm.ac.in",
    "nitt.edu",
    "students.amrita.edu",
    "learner.manipal.edu",
    "lpu.in",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailDomain = formData.email.split("@")[1];

    if (!allowedDomains.includes(emailDomain)) {
      alert(
        `❌ Only college emails from:\n${allowedDomains.join(", ")} are allowed.`
      );
      return;
    }

    if (!isStrongPassword(formData.password)) {
      alert(
        "❌ Weak password! \nPassword must be at least 8 characters long and include:\n- One uppercase letter\n- One lowercase letter\n- One number\n- One special character (@$!%*?&)"
      );
      return;
    }

    // ✅ Save registered user in localStorage
    localStorage.setItem("registeredUser", JSON.stringify(formData));

    alert("✅ Registration successful! You can now log in.");
    console.log("Registered user:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "student",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Student Register
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your name"
          />
        </div>

        {/* College Email */}
        <div className="mb-4">
          <label className="block text-gray-700">College Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="example@mkce.ac.in"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter strong password"
          />
          <p className="text-sm text-gray-500 mt-1">
            Must include uppercase, lowercase, number, and special character
          </p>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
          >
            <option value="student">Student</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
