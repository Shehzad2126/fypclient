import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Farmers Market</h2>
          <p className="text-xs sm:text-sm">
            A platform to connect farmers and buyers to sell and purchase fresh fruits, vegetables, and crops directly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h2>
          <ul className="text-xs sm:text-sm space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/createaccount" className="hover:underline">Account</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Contact</h2>
          <p className="text-xs sm:text-sm">Email: support@farmersmarket.com</p>
          <p className="text-xs sm:text-sm">Phone: +92 300 1234567</p>
          <p className="text-xs sm:text-sm">Location: Lahore, Pakistan</p>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-4 text-2xl sm:text-3xl">
            <a href="#" className="hover:text-green-300" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" className="hover:text-green-300" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-green-300" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-xs sm:text-sm text-gray-300 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Farmers Market. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
