import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import vegImg from "../../assets/vegetables.png";
import fruitImg from "../../assets/fruits.png";
import cropImg from "../../assets/crops.png";

const CategoriesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const categories = [
    {
      title: 'Fruits',
      items: ['Apple', 'Banana', 'Mango'],
      image: fruitImg,
      bgColor: 'bg-pink-100',
    },
    {
      title: 'Vegetables',
      items: ['Carrot', 'Potato', 'Tomato'],
      image: vegImg,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Crops',
      items: ['Wheat', 'Rice', 'Corn'],
      image: cropImg,
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-12 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">Product Categories</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg dark:text-black overflow-hidden ${category.bgColor} transition-transform transform hover:scale-105`}
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-40 sm:h-48 md:h-56 object-cover shadow-lg transform transition duration-300 hover:scale-110 hover:-translate-y-2"
              data-aos="zoom-in"
            />
            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center">{category.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
