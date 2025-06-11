import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="text-white w-80 h-screen overflow-y-auto bg-gray-900">
      {/* Welcome Section */}
      <div className="bg-blue-700 h-12 flex items-center pl-4">
        <img
          src="/user-icon.svg"
          alt="User Icon"
          className="w-6 h-6 mr-2"
        />
        <h2 className="text-lg font-semibold">Hello, User!</h2>
      </div>

      {/* Top Brands */}
      <div className="mb-6 pl-4 my-4">
        <h3 className="text-md font-semibold mb-2">Top Brands</h3>
        <ul className="space-y-2 pl-0 list-none">
          {["Apple", "Shades", "Rolex", "Realme", "Samsung", "Furniture Co."].map((brand, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-gray-400"
              onClick={() => handleBrandClick(brand)}
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-600 my-4" />

      {/* Trending Categories */}
      <div className="mb-6 pl-4">
        <h3 className="text-md font-semibold mb-2">Trending</h3>
        <ul className="space-y-2 pl-0 list-none">
          {["Best Sellers", "New Arrivals", "Seasonal Specials"].map((cat, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-gray-400"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-600 my-4" />

      {/* Help and Settings */}
      <div className="mb-6 pl-4">
        <h3 className="text-md font-semibold mb-2">Help and Settings</h3>
        <ul className="space-y-2 pl-0 list-none">
          <li className="cursor-pointer hover:text-gray-400">Your Account</li>
          <li className="cursor-pointer hover:text-gray-400">Sign In/Out</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
