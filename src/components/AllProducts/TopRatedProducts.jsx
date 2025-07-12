import React from "react";
import { Products } from "./AllProducts";
import { Link } from "react-router-dom";

const TopRatedProducts = () => {
  const topRated = [...Products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const handleBuyNow = (product) => {
    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({ ...product, quantity: 1 })
    );
    localStorage.setItem("checkoutType", "buyNow");
    localStorage.removeItem("cart");
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("checkoutType", "cart");
    localStorage.removeItem("buyNowProduct");
  };

  return (
    <div className="px-6 py-6 sm:px-6 lg:px-0 dark:bg-gray-900 dark:text-white">
      <h2 className="mb-4 text-2xl font-bold text-center sm:text-left">
        Top Rated Products
      </h2>

      {/* Grid layout — fully responsive */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {topRated.map((product) => (
          <div
            key={product.id}
            className="flex flex-col p-4 transition bg-white rounded-lg shadow-md dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-40 rounded-md sm:h-32"
            />

            <h3 className="mt-3 text-sm font-semibold sm:text-base line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-yellow-500">
              Rating: {product.rating} ⭐
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedProducts;
