import React, { useState } from "react";
import Sidebar from "./sidebar";

const Navbar2 = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="bg-gray-950 text-white text-sm justify-between gap-2 flex items-center px-3 py-2 w-full h-12">
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
          <div className="flex items-center justify-between gap-0">
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              Friends
            </span>
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              New Arrivals
            </span>
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              Merchandise
            </span>
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              Seasonal Specials
            </span>
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              Home & Living
            </span>
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              Accessories
            </span>
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              Posters & Art
            </span>
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              Collectibles
            </span>
            <span className="cursor-pointer px-4 py-2 hover:outline hover:outline-1 hover:outline-white transition-all text-center">
              Gifts
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="fixed inset-0 bg-gray-800 text-white z-50 w-80 h-full">
            <div>
            <Sidebar />

            </div>
          
          <div
            className="absolute top-0 right-0 p-4 cursor-pointer text-xl hover:text-gray-400"
            onClick={toggleSidebar}
          >
            &times;
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar2;
