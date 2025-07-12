import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../src/components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homes from "./Pages/Homes";
import About from "./Pages/About";
import AllProducts from "./Pages/AllProducts";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import OrderPage from "./Pages/OrderPage";
import Blogs from "./Pages/Blogs";
import CreateAccount from "./components/Profile/CreateAccount";
import LogOutAccount from "./components/Profile/logout";
import Readmore1 from "./Pages/Readmore1"; // Corrected import
import Footer from "./components/footer";
import ForgetPassword from "./components/ForgetPassword"; // ✅ Import added
import ContactFarmer from "./Pages/ContactFarmer"; // Import

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      <Navbar />

      {/* ✅ Toast container (add only once globally) */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/account"
          element={isLoggedIn ? <CreateAccount /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />{" "}
        {/* ✅ New Route */}
        <Route path="/ourproducts/allproducts" element={<AllProducts />} />
        <Route path="/ourproducts/:category" element={<AllProducts />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/logout" element={<LogOutAccount />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/readmore1/:id" element={<Readmore1 />} />{" "}
        {/* Route for ReadMore1 */}
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} /> {/* ✅ Add this */}
        <Route path="/order" element={<OrderPage />} /> {/* ✅ Add this */}
        <Route path="/contactfarmer" element={<ContactFarmer />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
