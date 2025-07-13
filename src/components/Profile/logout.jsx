import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const baseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;
export default function Logout() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);

  const handleLogout = async () => {
    try {
      // Call logout API
      await axios.post(
        `${baseURL}/users/logout`,
        // "http://localhost:3000/api/v1/users/logout",
        {},
        {
          withCredentials: true, // important if your backend is using cookies
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    navigate(-1); // back
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-center">
            <h2 className="mb-4 text-lg font-semibold">
              Do you want to logout your account?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-black bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
