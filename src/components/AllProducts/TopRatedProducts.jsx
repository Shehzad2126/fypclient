import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;
const TopRatedProducts = () => {
  const [products, setProducts] = useState([]);
  const getRandomProducts = (allProducts, count = 4) => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/products`, {
          withCredentials: true,
        });
        const fetchedProducts = response.data.data.docs;
        const randomFour = getRandomProducts(fetchedProducts);
        setProducts(randomFour);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({ ...product, quantity: 1 })
    );
    localStorage.setItem("checkoutType", "buyNow");
  };

  const handleAddToCart = async (product) => {
    try {
      const res = await axios.post(
        `${baseURL}/cart/add`,

        {
          productId: product._id,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Added to cart:", res.data);
      toast.success("Product added to cart!", {
        className: "bg-green-500 text-white font-semibold ",
        bodyClassName: "text-sm",
        progressClassName: "bg-gray-200",
      });
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add product to cart.");
    }
  };

  return (
    <div className="px-6 py-6 sm:px-6 lg:px-0 dark:bg-gray-900 dark:text-white">
      <h2 className="mb-4 text-2xl font-bold text-center sm:text-left">
        Top Rated Products
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col p-4 transition bg-white rounded-lg shadow-md dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <img
              src={product.imageFile?.url}
              alt={product.title}
              className="object-cover w-full h-40 rounded-md sm:h-32"
            />
            <h3 className="mt-3 text-sm font-semibold sm:text-base line-clamp-1">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
            <p className="text-sm font-bold text-green-600 sm:text-base">
              Rs. {product.price}
            </p>

            <div className="flex flex-col gap-2 mt-4 sm:flex-row">
              <Link to="/order" className="flex-1">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="w-full py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Buy Now
                </button>
              </Link>
              <Link to="/cart" className="flex-1">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
            <Link
              to={`/productdetails/${product._id}`}
              className="mt-2 text-sm text-blue-600 hover:underline sm:text-base"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedProducts;
