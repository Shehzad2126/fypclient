import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { MdAccountCircle } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
const baseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About Us", link: "/about" },
  {
    id: 3,
    name: "Our Products",
    link: "#",
    dropdown: [
      { id: 31, name: "All Products", link: "/ourproducts/allproducts" },
      { id: 32, name: "Fruits", link: "/ourproducts/fruit" },
      { id: 33, name: "Vegetables", link: "/ourproducts/vegetable" },
      { id: 34, name: "Crops", link: "/ourproducts/crop" },
    ],
  },
  { id: 4, name: "Blogs", link: "/blogs" },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, [cartItems]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${baseURL}/cart`, {
        withCredentials: true,
      });
      console.log("Cart fetched..................:", response.data.data);
      setCartItems(response.data.data.items);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const trimmedTerm = searchTerm.trim().toLowerCase();
      if (trimmedTerm.length === 0) return;
      navigate(
        `/ourproducts/allproducts?search=${encodeURIComponent(trimmedTerm)}`
      );
      setSearchTerm("");
    }
  };
  useEffect(() => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    if (trimmedTerm.length > 0) {
      const delay = setTimeout(() => {
        navigate(
          `/ourproducts/allproducts?search=${encodeURIComponent(trimmedTerm)}`
        );
      }, 500); // wait 500ms after user stops typing
      return () => clearTimeout(delay);
    }
  }, [searchTerm, navigate]);

  return (
    <div className="sticky top-0 z-50 duration-200 bg-white shadow-md dark:bg-gray-900 dark:text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-primary md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 text-xl font-bold text-white sm:text-2xl max-h-12"
        >
          <img
            src={logo}
            alt="logo"
            className="w-12 sm:w-16 sm:h-16 h-12 md:h[80px] md:w[80px] lg:h[90px]  lg:w[90px]  object-contain"
          />
          <span className="whitespace-nowrap">Agriculture Market</span>
        </Link>

        {/* Desktop Search */}
        <div className="items-center hidden gap-4 sm:flex">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
            />
            <IoMdSearch
              className="absolute text-gray-500 -translate-y-1/2 cursor-pointer group-hover:text-primary top-1/2 right-3"
              onClick={handleSearch}
            />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-4 py-1 text-white rounded-full bg-gradient-to-r from-primary to-secondary"
          >
            <span className="hidden sm:block">My Cart</span>
            <FaCartShopping className="text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-xs text-white rounded-full px-1.5 py-0.5">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* Dark Mode */}
          <DarkMode />

          {/* Profile Dropdown */}
          <div className="relative group">
            <MdAccountCircle className="text-3xl text-white cursor-pointer" />
            <ul className="absolute right-0 z-50 invisible w-40 py-2 transition-all duration-300 bg-white rounded-md shadow-md opacity-0 top-10 dark:bg-gray-800 group-hover:opacity-100 group-hover:visible">
              <li>
                <Link
                  to="/createaccount"
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Your Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="ml-2 text-3xl text-white sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 py-2 bg-white border-t border-gray-200 sm:hidden dark:bg-gray-900 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
          />
          <IoMdSearch
            className="absolute text-gray-500 -translate-y-1/2 cursor-pointer top-1/2 right-4"
            onClick={handleSearch}
          />
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:flex sm:justify-center bg-white dark:bg-gray-900 px-4 sm:px-0 border-t dark:border-gray-800`}
      >
        <ul className="items-center gap-4 py-2 sm:flex">
          {Menu.map((item) => (
            <li key={item.id} className="relative group">
              {item.dropdown ? (
                <>
                  <button className="inline-flex items-center px-4 py-2 duration-200 hover:text-primary">
                    {item.name}
                    <FaCaretDown className="ml-1" />
                  </button>
                  <ul className="absolute left-0 z-50 invisible w-40 py-2 transition-all duration-300 bg-white rounded-md shadow-md opacity-0 top-full dark:bg-gray-800 group-hover:opacity-100 group-hover:visible">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          to={subItem.link}
                          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={item.link}
                  className="block px-4 py-2 duration-200 hover:text-primary"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
