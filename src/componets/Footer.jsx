import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Desktop Content */}
        <div className="ml-20 mr-20 hidden sm:flex sm:flex-row justify-between gap-8">
          {/* Connect With Us Section */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Connect With Us</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-400">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Help</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Customer Support</a></li>
              <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
            </ul>
          </div>

          {/* Sell Section */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Sell</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Become a Seller</a></li>
              <li><a href="#" className="hover:text-gray-400">Seller Support</a></li>
            </ul>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="font-semibold text-lg sm:text-xl mb-2">Shop</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Shop Now</a></li>
              <li><a href="#" className="hover:text-gray-400">Trending Products</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="block sm:hidden">
  <div className="  px-8 sm:px-8"> {/* Container to center and add padding */}
    <div className="grid grid-cols-2 gap-4">
      {/* Connect With Us Section for Small Screens */}
      <div>
        <h3 className="font-semibold text-lg sm:text-xl mb-2">Follow Us</h3>
        <ul>
          <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
          <li><a href="#" className="hover:text-gray-400">Instagram</a></li>
          <li><a href="#" className="hover:text-gray-400">YouTube</a></li>
        </ul>
      </div>

      {/* Customer Service Section */}
      <div>
        <h3 className="font-semibold text-lg sm:text-xl mb-2"> Services</h3>
        <ul>
          <li><a href="#" className="hover:text-gray-400">Support</a></li>
          <li><a href="#" className="hover:text-gray-400">Returns</a></li>
          <li><a href="#" className="hover:text-gray-400">Order Tracking</a></li>
        </ul>
      </div>

      {/* New Section for "Heading 3" */}
      <div>
        <h3 className="font-semibold text-lg sm:text-xl mb-2">Help</h3>
        <ul>
          <li><a href="#" className="hover:text-gray-400">Customer Support</a></li>
          <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
        </ul>
      </div>

      {/* New Section for "Heading 4" */}
      <div>
        <h3 className="font-semibold text-lg sm:text-xl mb-2">Sell</h3>
        <ul>
          <li><a href="#" className="hover:text-gray-400">Become a Seller</a></li>
          <li><a href="#" className="hover:text-gray-400">Seller Support</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>


        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm sm:text-base">
       
          <p>&copy; 2025 Smile Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;