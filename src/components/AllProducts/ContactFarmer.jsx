import React, { useEffect, useState } from "react";
import { Phone, MapPin, Home } from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;

const ContactFarmer = () => {
  const location = useLocation();
  const ownerId = location.state?.ownerId;
  const [farmer, setFarmer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(ownerId);
    if (!ownerId) return;

    const fetchFarmer = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/users/${ownerId}`,

          {
            withCredentials: true,
          }
        );

        const user = response.data.data;
        setFarmer(user);
      } catch (err) {
        console.error("Failed to fetch farmer data:", err);
        setError("Failed to load farmer data.");
      }
    };

    fetchFarmer();
  }, [ownerId]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 text-red-500 dark:bg-gray-800">
        {error}
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 text-gray-500 dark:text-white dark:bg-gray-800">
        Loading farmer details...
      </div>
    );
  }

  return (
    <div className="max-w-md h-[400px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-700 dark:text-white">
      <h1 className="mb-4 text-2xl font-bold text-center text-green-700">
        Farmer Contact Info
      </h1>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={farmer.avatar}
          alt={farmer.fullName}
          className="object-cover w-24 h-24 rounded-full"
        />
        <h2 className="text-xl font-semibold">{farmer.fullName}</h2>

        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-blue-500" />
          <span>{farmer.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-500" />
          <span>{farmer.address}</span>
        </div>

        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-yellow-500" />
          <span>{farmer.cropType} Farmer</span>
        </div>
      </div>
    </div>
  );
};

export default ContactFarmer;
