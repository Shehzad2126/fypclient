import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;
const ConfirmOrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    shipping: "Standard",
    payment: "Cash on Delivery",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const checkoutType = localStorage.getItem("checkoutType");

    if (checkoutType === "buyNow") {
      const singleProduct = JSON.parse(localStorage.getItem("buyNowProduct"));
      setCartItems([{ product: singleProduct, quantity: 1 }]);
    } else {
      const fetchCart = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/cart`,

            {
              withCredentials: true,
            }
          );
          setCartItems(response.data.data.items);
        } catch (err) {
          console.error("Failed to fetch cart:", err);
        }
      };

      fetchCart();
    }
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/users/current-user`,

          { withCredentials: true }
        );
        const userData = response.data.data;
        setCurrentUser(userData);
        console.log("Current user data from API:", userData);
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    fetchCurrentUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      const address = currentUser.address || "";
      const parts = address.split(",");
      const cityFromAddress = parts[parts.length - 2]?.trim() || "";
      setFormData((prev) => ({
        ...prev,
        name: currentUser.fullName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        city: cityFromAddress || "",
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("buyNowProduct");
    localStorage.removeItem("checkoutType");
    try {
      // Step 1: Submit the order
      await axios.post(
        `${baseURL}/orders/confirm`,

        {
          ...formData,
          cartItems,
        },
        { withCredentials: true }
      );

      // Step 2: Clear the cart
      await axios.delete(`${baseURL}/cart/clear`, {
        withCredentials: true,
      });

      localStorage.removeItem("buyNowProduct");
      localStorage.removeItem("checkoutType");
      setIsOpen(true);
    } catch (err) {
      console.error("Order or cart clearing failed", err);
      alert("Failed to confirm order or clear cart.");
    }
  };

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  };
  const handleClose = () => {
    setIsOpen(false);
    navigate("/ourproducts/allproducts");
  };
  return (
    <div className="min-h-screen px-4 py-10 dark:bg-gray-900 sm:px-6">
      <div className="max-w-xl p-6 mx-auto bg-white shadow-md rounded-xl dark:bg-gray-700 dark:text-white">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Confirm Your Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form Inputs */}
          {["name", "email", "phone", "address", "city"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")
              }
              required
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}

          {/* Payment Method */}
          <select
            id="payment"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>

          {/* 🧾 Order Summary */}
          <div className="mt-6">
            <h3 className="mb-2 font-semibold">Order Summary:</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300">
                No items in cart.
              </p>
            ) : (
              <ul className="space-y-1 text-gray-700 list-disc list-inside dark:text-yellow-200">
                {cartItems.map((item, index) => (
                  <li key={index}>
                    {item.product.title}: Rs. {item.product.price} ×{" "}
                    {item.quantity} = Rs.{" "}
                    {(item.product.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-lg font-bold dark:text-white">
              Total: Rs. {getTotal()}
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Confirm Order
          </button>
        </form>

        {/* 🎉 Confirmation Modal */}
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <Dialog.Panel className="w-full max-w-md p-6 text-center bg-gray-200 rounded-lg shadow-lg dark:bg-gray-800">
              <Dialog.Title className="mb-2 text-lg font-bold dark:text-white">
                Order Confirmed
              </Dialog.Title>
              <Dialog.Description className="mt-2 dark:text-gray-300">
                Thank you, <strong>{formData.name}</strong>! Your order with{" "}
                <strong>{formData.payment}</strong> has been confirmed.
              </Dialog.Description>
              <button
                onClick={() => handleClose()}
                className="px-6 py-2 mt-6 text-white transition bg-green-600 rounded hover:bg-green-700"
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ConfirmOrderForm;
