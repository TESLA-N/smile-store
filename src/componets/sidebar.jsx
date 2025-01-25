import React from "react";

const Sidebar = () => {
  return (
    <div className="text-white w-80 h-screen overflow-y-auto bg-gray-900">
      {/* Welcome Section */}
      <div className="bg-blue-700 h-12 flex items-center pl-4">
        <img
          src="/user-icon.svg" // Replace with the path to your user icon
          alt="User Icon"
          className="w-6 h-6 mr-2"
        />
        <h2 className="text-lg font-semibold">Hello, User!</h2>
      </div>

      {/* Sitcoms Form */}
     
      <div className="mb-6 pl-4 my-4">
        <h3 className="text-md font-semibold mb-2">Sitcoms</h3>
        <ul className="space-y-2 pl-0 list-none">
          <li className="cursor-pointer hover:text-gray-400">Friends</li>
          <li className="cursor-pointer hover:text-gray-400">The Big Bang Theory</li>
          <li className="cursor-pointer hover:text-gray-400">
           How I Met Your Mother
          </li>
          <li className="cursor-pointer hover:text-gray-400">
          The Office
          </li>
          <li className="cursor-pointer hover:text-gray-400">
      Modern Family
          </li>
          <li className="cursor-pointer hover:text-gray-400">
           Broklyn Nine-Nine
          </li>
        </ul>
      </div>
      <hr className="border-gray-600 my-4" />

      {/* Trending Section */}
      <div className="mb-6 pl-4">
        <h3 className="text-md font-semibold mb-2">Trending</h3>
        <ul className="space-y-2 pl-0 list-none">
          <li className="cursor-pointer hover:text-gray-400">Best Sellers</li>
          <li className="cursor-pointer hover:text-gray-400">New Arrivals</li>
          <li className="cursor-pointer hover:text-gray-400">
            Seasonal Specials
          </li>
        </ul>
      </div>

      <hr className="border-gray-600 my-4" />

      {/* Shop Section */}
      <div className="mb-6 pl-4">
        <h3 className="text-md font-semibold mb-2">Shop</h3>
        <ul className="space-y-2 pl-0 list-none">
          <li className="cursor-pointer hover:text-gray-400">Clothes</li>
          <li className="cursor-pointer hover:text-gray-400">Shoes</li>
          <li className="cursor-pointer hover:text-gray-400">Merchandise</li>
          <li className="cursor-pointer hover:text-gray-400">Artifacts</li>
          <li className="cursor-pointer hover:text-gray-400">Accessories</li>
        </ul>
      </div>

      <hr className="border-gray-600 my-4" />

      {/* Help and Settings Section */}
      <div className="mb-6 pl-4">
        <h3 className="text-md font-semibold mb-2">Help and Settings</h3>
        <ul className="space-y-2 pl-0 list-none">
          <li className="cursor-pointer hover:text-gray-400">Your Account</li>
          <li className="cursor-pointer hover:text-gray-400">
            Light/Dark Mode
          </li>
          <li className="cursor-pointer hover:text-gray-400">Sign In/Out</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
