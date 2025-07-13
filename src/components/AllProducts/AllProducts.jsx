import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Productimages from "../Productimages";
import axios from "axios";
// Dummy products array with categories and ratings
export const Products = Array.from({ length: 17 }, (_, i) => {
  let category = "";

  if (i < 3) category = "Crops";
  else if (i < 10) category = "Vegetables";
  else category = "Fruits";

  return {
    id: i + 1,
    name: `Fresh Farm Product ${i + 1}`,
    category,
    price: (Math.random() * 500 + 50).toFixed(2),
    description: `This is a healthy and organic farm product number ${
      i + 1
    }. Perfect for your kitchen!`,
    image: Productimages[i],
    rating: Math.floor(Math.random() * 5) + 1,
  };
});

const AllProducts = () => {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/products",
          {},
          {
            withCredentials: true,
          }
        );

        let fetchedProducts = response.data.data.docs;

        // Filter products by category from the URL
        if (category && category.toLowerCase() !== "allproducts") {
          fetchedProducts = fetchedProducts.filter(
            (product) =>
              product.category &&
              product.category.toLowerCase() === category.toLowerCase()
          );
        }

        // Filter by search query too
        if (searchQuery) {
          fetchedProducts = fetchedProducts.filter(
            (product) =>
              product.title.toLowerCase().includes(searchQuery) ||
              product.category.toLowerCase().includes(searchQuery)
          );
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  const filteredProducts = Products.filter((product) => {
    const matchesCategory =
      category && category.toLowerCase() !== "allproducts"
        ? product.category.toLowerCase() === category.toLowerCase()
        : true;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen p-4 dark:bg-gray-900 dark:text-white sm:p-6 md:p-10">
      <h1 className="mb-6 text-2xl font-bold text-center sm:text-3xl sm:text-left">
        Farm Products
      </h1>

      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-red-500">
          No products found matching <strong>{searchQuery || category}</strong>
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col transition-shadow duration-300 bg-white shadow-md cursor-pointer dark:bg-gray-700 rounded-2xl hover:shadow-xl"
              tabIndex={0}
              role="button"
              aria-label={`View details for ${product.name}`}
            >
              <img
                src={product.imageFile.url}
                alt={product.title}
                className="object-cover w-full h-36 sm:h-40 md:h-44 rounded-t-2xl"
                loading="lazy"
              />
              <div className="flex flex-col flex-grow p-4">
                <h2 className="text-lg font-semibold sm:text-xl line-clamp-2">
                  {product.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                  {product.category}
                </p>
                <p className="mt-2 text-base font-bold text-green-600 sm:text-lg">
                  Rs. {product.price}
                </p>
                <p className="mt-1 text-sm font-semibold text-yellow-500 sm:text-base">
                  Rating: ⭐
                </p>
                <Link
                  to={`/productdetails/${product._id}`}
                  className="mt-auto text-sm text-blue-600 hover:underline sm:text-base"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
