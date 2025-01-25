// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-12"> {/* Adjusted gap */}
          {/* Connect With Us Section */}
          <div className="mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-2">Connect With Us</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-400">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-2">Help</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Customer Support</a></li>
              <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
            </ul>
          </div>

          {/* Sell Section */}
          <div className="mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-2">Sell</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Become a Seller</a></li>
              <li><a href="#" className="hover:text-gray-400">Seller Support</a></li>
            </ul>
          </div>

          {/* Shop Section */}
          <div className="mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-2">Shop</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Shop Now</a></li>
              <li><a href="#" className="hover:text-gray-400">Trending Products</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; 2025 Smile Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
