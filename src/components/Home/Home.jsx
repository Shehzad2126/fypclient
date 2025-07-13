import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroimg from "../../assets/heroimg.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import bg5 from "../../assets/bg5.jpg";
import Chatbot from "../Chatbot/Chat";
import TopRatedProducts from "../AllProducts/TopRatedProducts";

const Home = () => {
  const images = [
    `url(${heroimg})`,
    `url(${bg3})`,
    `url(${bg4})`,
    `url(${bg5})`,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center brightness-50 transition-opacity duration-1000 ease-in-out"
          style={{ backgroundImage: images[currentIndex] }}
        ></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-1 leading-tight">
            Pakistan's Agriculture Marketplace
          </h1>
          <div className="w-full max-w-3xl mt-2">
            <p className="text-xs sm:text-sm md:text-lg leading-relaxed">
              Welcome to Farmers Marketplace, a digital platform designed to
              connect farmers directly with buyers. We make it easy for farmers
              to sell their fresh produce at fair prices while ensuring
              consumers get high-quality, organic, and locally sourced
              products. No middlemen, no extra costs—just fresh, farm-to-table
              goodness.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link to="/login">
              <button className="px-6 py-3 text-sm sm:text-base text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 to-yellow-500 hover:scale-105 transition">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex - 1 + images.length) % images.length
            )
          }
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full z-10"
        >
          ❮
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
          }
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full z-10"
        >
          ❯
        </button>

        {/* ✅ Chatbot (can be moved to fixed corner for better mobile experience) */}
        <div className="absolute bottom-4 right-4">
          <Chatbot />
          <img src="bot.png" alt="Chatbot" className="w-10 h-10" />
        </div>
      </div>

      {/* ✅ Top Rated Products */}
      <div className="w-full px-4 sm:px-6 md:px-12">
        <TopRatedProducts />
      </div>
    </div>
  );
};

export default Home;
