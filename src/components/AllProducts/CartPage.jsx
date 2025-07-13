import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${baseURL}/cart`, {
        withCredentials: true,
      });
      console.log("Cart fetched:", response.data.data);
      setCartItems(response.data.data.items);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const confirmRemove = (item) => {
    setItemToRemove(item);
    setShowModal(true);
  };

  const handleRemoveConfirmed = async () => {
    try {
      await axios.delete(`${baseURL}/cart/remove`, {
        data: {
          productId: itemToRemove.product._id,
        },
        withCredentials: true,
      });
      // refetch cart
      await fetchCart();
      setShowModal(false);
      setItemToRemove(null);
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item from cart.");
    }
  };

  const cancelRemove = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  const confirmOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/order");
  };

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="max-w-5xl p-6 mx-auto bg-white shadow-md dark:bg-gray-800 rounded-xl">
        <div className="mb-6">
          <Link
            to="/ourproducts/allproducts"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span className="mr-2 text-xl">←</span> Back to Shopping
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold dark:text-white">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-lg text-center text-gray-600 dark:text-gray-300">
            Your cart is empty.{" "}
            <Link
              to="/ourproducts/allproducts"
              className="text-blue-500 underline"
            >
              Go back to products.
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center justify-between p-4 shadow sm:flex-row sm:items-start dark:text-white dark:bg-gray-700 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center w-full gap-4 sm:w-auto">
                    <img
                      src={item.product.imageFile.url}
                      alt={item.product.title}
                      className="flex-shrink-0 object-cover w-24 h-24 rounded-lg"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">
                        {item.product.title}
                      </h2>
                      <p className="text-gray-600 dark:text-yellow-300">
                        Price: Rs. {item.product.price} × {item.quantity}
                      </p>
                      <p className="mt-1 font-bold text-green-700 dark:text-yellow-400">
                        Total: Rs.{" "}
                        {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => confirmRemove(item)}
                    className="flex items-center gap-2 mt-4 text-red-600 sm:mt-0 hover:underline"
                    aria-label={`Remove ${item.product.title} from cart`}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center sm:text-right">
              <h2 className="mb-4 text-2xl font-bold dark:text-white">
                Grand Total: Rs. {getTotal()}
              </h2>
              <button
                onClick={confirmOrder}
                className="w-full px-6 py-3 text-white transition bg-green-600 sm:w-auto hover:bg-green-700 rounded-xl"
              >
                ✅ Confirm Order
              </button>
            </div>
          </>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold dark:text-white">
                Remove Item
              </h2>
              <p className="mb-6 dark:text-gray-300">
                Are you sure you want to remove{" "}
                <span className="font-bold">{itemToRemove?.product.title}</span>{" "}
                from your cart?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={handleRemoveConfirmed}
                  className="w-full px-5 py-2 text-white transition bg-red-600 rounded hover:bg-red-700 sm:w-auto"
                >
                  Yes, Remove
                </button>
                <button
                  onClick={cancelRemove}
                  className="w-full px-5 py-2 text-gray-800 transition bg-gray-300 rounded hover:bg-gray-400 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
