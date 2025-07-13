import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    password: "",
    confirmPassword: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    console.log("Before API HIt");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          category: formData.category,
          username: formData.name.toLowerCase().replace(/\s/g, ""),
          phone: formData.phone,
        }
      );
      console.log("After API HIt");
      console.log("Signup successful:", response.data);
      setShowPopup(true);
      toast.success("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      toast.error("User with this email already exists!");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
      <ToastContainer position="top-right" autoClose={3000} />

      {showPopup && (
        <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-green-800">
              You have signed up!
            </h3>
            <p className="mb-4">Go to your account to continue.</p>
            <Link
              to="/login"
              className="inline-block px-4 py-2 text-white bg-green-700 rounded hover:bg-green-800"
            >
              Login first
            </Link>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-lg w-96 dark:bg-gray-300 dark:text-white"
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-green-800">
          Sign Up
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setFormData({ ...formData, phone: value });
              }
            }}
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            inputMode="numeric"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Category</option>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-900 rounded-lg hover:bg-green-800"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-gray-700 dark:text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
