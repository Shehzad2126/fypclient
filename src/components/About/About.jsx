import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import about from "../../assets/about.jpg";
import about2 from "../../assets/about2.jpg";
import about3 from "../../assets/about3.jpg";
import about4 from "../../assets/about4.jpg";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-white dark:bg-gray-800 dark:text-white py-10 px-5 sm:px-10 md:px-20 min-h-screen flex flex-col items-center">
      <h2
        className="text-3xl sm:text-4xl font-bold text-[#755A1F] dark:text-white text-center mb-5"
        data-aos="fade-up"
      >
        About Us
      </h2>
      <p
        className="text-sm sm:text-base text-gray-900 dark:text-white max-w-4xl text-center mb-8"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Welcome to our Farmers Marketplace, a platform designed to connect farmers
        with consumers, ensuring access to fresh and organic products. We provide farmers
        with a fair marketplace where they can showcase their produce, reaching a wider
        audience without intermediaries. Our mission is to promote sustainable agriculture
        and ethical sourcing, ensuring consumers receive high-quality, chemical-free products
        straight from the farm. By supporting local farmers, we help strengthen rural economies
        and encourage responsible consumption. Whether you're looking for farm-fresh fruits,
        vegetables, or other organic goods, our marketplace makes it easy to buy directly from
        trusted sources. Join us in fostering a healthier and more sustainable food ecosystem!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {[
          { img: about, text: "Farmers at work" },
          { img: about2, text: "Fresh organic produce" },
          { img: about3, text: "Farmland scenery" },
          { img: about4, text: "Harvesting crops" },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg dark:shadow-yellow-100 shadow-green-900 bg-gray-300 dark:bg-gray-700 p-4 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:-translate-y-2"
            data-aos="zoom-in"
            data-aos-delay={index * 200}
          >
            <img
              src={item.img}
              alt={item.text}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
