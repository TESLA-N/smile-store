import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";

const Navbar2 = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSidebarVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSidebarVisible]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Brand names you want to route with `brand=...`
  const brands = ["Apple", "Rolex", "Furniture Co."];

  // All navbar items (brands + categories)
  const navItems = [
    "Apple",
    "New Arrivals",
    "Accessories",
    "Seasonal Specials",
    "Home",
    "Rolex",
    "Furniture Co.",
    "Groceries",
    "Sports",
    "Cosmetics"
  ];

  // Handle click: decide brand or category
  const handleItemClick = (item) => {
    const isBrand = brands.includes(item);
    const query = isBrand
      ? `brand=${encodeURIComponent(item)}`
      : `category=${encodeURIComponent(item)}`;
    navigate(`/products?${query}`);
  };

  return (
    <div className="relative">
      {/* Navbar for large screens */}
      <div className="hidden lg:flex bg-gray-950 text-white text-sm justify-between gap-2 items-center px-3 py-2 w-full h-12">
        {/* Menu Button */}
        <div
          className="cursor-pointer flex items-center justify-center space-x-2 px-3 py-2 hover:outline hover:outline-1 hover:outline-white"
          onClick={toggleSidebar}
        >
          <img src="/burger-menu-svgrepo-com.svg" alt="Menu" className="w-5 h-5" />
          <div>ALL</div>
        </div>

        {/* Navbar Links */}
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center justify-between gap-5">
            {navItems.map((item, index) => (
              <span
                key={index}
                className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navbar for small screens */}
      <div className="lg:hidden bg-gray-950 text-white text-sm flex items-center px-3 py-2 w-full h-12 justify-between">
        <div className="flex items-center space-x-2 p-2 rounded-md shadow-md">
          {/* Delivery Icon */}
          <img src="icons8-location-50.png" alt="Delivery Icon" className="w-6 h-6" />
          {/* Address */}
          <span className="text-white text-sm font-medium">
            Delivery to: 123 Main Street, Springfield
          </span>
        </div>
      </div>

      {/* Sidebar and Overlay */}
      {isSidebarVisible && (
        <div className="fixed inset-0 flex z-50">
          {/* Clickable Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          ></div>

          {/* Sidebar Container */}
          <div className="relative w-72 h-screen bg-gray-800 shadow-lg overflow-y-auto overflow-x-hidden max-h-screen scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <Sidebar />
          </div>

          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-[290px] text-white text-2xl p-2 rounded hover:bg-gray-700 transition"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar2;
