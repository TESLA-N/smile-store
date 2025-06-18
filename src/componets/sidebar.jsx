import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user, handleLogout, setAuthMode, setIsAuthOpen }) => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  const handleAuthClick = () => {
    if (user) {
      handleLogout();
    } else {
      setAuthMode("login");
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="text-white h-screen overflow-y-auto bg-gray-900 w-64 md:w-72 lg:w-80 min-w-fit">
      {/* Welcome Section */}
      <div className="bg-blue-700 h-16 flex items-center pl-4 space-x-3">
        <img
          src={user?.profilePic || "/user-icon.svg"}
          alt="User Icon"
          className="w-8 h-8 rounded-full"
        />
        <h2 className="text-lg font-semibold">
          Hello, {user?.name || "Guest"}!
        </h2>
      </div>

      {/* Home Link */}
      <div className="pl-4 py-4">
        <h3
          className="text-md font-semibold cursor-pointer hover:text-gray-400"
          onClick={() => navigate("/")}
        >
          Home
        </h3>
      </div>

      {/* Top Brands */}
      <div className="mb-6 pl-4">
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
          <li
            className="cursor-pointer hover:text-gray-400"
            onClick={handleAuthClick}
          >
            {user ? "Sign Out" : "Sign In"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
