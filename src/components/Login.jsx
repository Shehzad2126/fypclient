import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("This is form data", formData);
    try {
      console.log("this is start");
      const response = await axios.post(
        `${baseURL}/users/login`,

        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("This is response data", response);
      const { accessToken, user } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("currentUser", JSON.stringify(user));

      console.log("Login successful", user);

      toast.success("Login successful!"); // success toast
      setShowPopup(true);

      setTimeout(() => {
        navigate("/createaccount");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Invalid email or password!"); // error toast
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover">
      <ToastContainer position="top-right" autoClose={3000} />

      {showPopup && (
        <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-green-800">
              Login Successful!
            </h3>
            <p className="mb-4">Welcome back! Redirecting to your account...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-lg w-96 dark:bg-gray-300 dark:text-white"
      >
        <h2 className="mb-4 text-3xl font-bold text-center text-green-800">
          Login
        </h2>

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
          <div className="mt-1 text-right">
            <Link
              to="/forgotpassword"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-green-900 rounded-lg hover:bg-green-800"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-700 dark:text-black">
          If you have not logged in, please{" "}
          <Link
            to="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            sign up
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
