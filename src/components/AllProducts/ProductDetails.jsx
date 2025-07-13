import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Products } from "./AllProducts";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
const ProductDetails = () => {
  const [product, setProducts] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  // const product = Products.find((item) => item.id === parseInt(id));
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/products/${id}`,

          {
            withCredentials: true, // important if your backend is using cookies
          }
        );

        setProducts(response.data.data); // Adjust depending on your API structure
        console.log(
          "These are the all products....................",
          response.data.data.owner._id
        );
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, [id]);
  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/cart/add`,
        {
          productId: product._id, // your API expects this
          quantity: 1,
        },
        {
          withCredentials: true, // if your API uses cookies
        }
      );
      console.log("Added to cart successfully:", response.data);
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

  const handleBuyNow = (product) => {
    localStorage.setItem(
      "buyNowProduct",
      JSON.stringify({ ...product, quantity: 1 })
    );
    localStorage.setItem("checkoutType", "buyNow");
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 text-center text-gray-500 dark:text-white dark:bg-gray-800">
        Loading product details...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 text-center text-red-500 dark:bg-gray-700">
        {error}
      </div>
    );
  }
  return (
    <div className="min-h-screen px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="max-w-4xl p-6 mx-auto bg-white shadow-md dark:bg-gray-700 rounded-xl">
        <div className="mb-6">
          <Link
            to="http://localhost:5173/ourproducts/allproducts"
            className="inline-flex items-center text-blue-600 hover:underline dark:text-white"
          >
            <span className="mr-2 text-xl">←</span> Back to Products
          </Link>
        </div>

        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          <img
            src={product.imageFile.url}
            alt={product.title}
            className="object-cover w-full h-64 sm:h-80 rounded-xl"
          />

          <div className="flex flex-col">
            <h1 className="mb-3 text-2xl font-bold sm:text-3xl dark:text-white">
              {product.title}
            </h1>
            <p className="mb-1 text-gray-600 dark:text-gray-300">
              Category: {product.category}
            </p>
            <p className="mb-4 text-xl font-bold text-green-700 dark:text-yellow-300">
              Rs. {product.price}
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-200">
              {product.description}
            </p>

            <div className="flex flex-col gap-3 mt-auto sm:flex-row sm:gap-4">
              <button
                onClick={addToCart}
                className="w-full px-5 py-3 text-white transition bg-blue-600 rounded sm:w-auto hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <Link to="/order">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="w-full px-5 py-3 text-white transition bg-purple-600 rounded sm:w-auto hover:bg-purple-700"
                >
                  Buy Now
                </button>
              </Link>
              <Link to="/contactfarmer" state={{ ownerId: product.owner._id }}>
                <button className="w-full px-5 py-3 text-white transition bg-green-600 rounded sm:w-auto hover:bg-green-700">
                  Contact Farmer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
