// src/components/Navbar.js
import React, { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('EN');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Update login status
  const categoryRef = useRef(null);

  // Adjust the width of the category selector dynamically
  useEffect(() => {
    if (categoryRef.current) {
      const selectedOption = categoryRef.current.options[categoryRef.current.selectedIndex];
      const textWidth = selectedOption.text.length * 8; // Approximate width per character
      categoryRef.current.style.width = `${textWidth + 20}px`; // Add padding
    }
  }, [category]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement product search functionality here
  };

  const handleCategorySelect = (e) => {
    setCategory(e.target.value);
    // Handle category selection logic here
  };
  const getSelectWidth = () => {
    if (!categoryRef.current) return '120px'; // Default width for 'All'
    const optionText = categoryRef.current.options[categoryRef.current.selectedIndex].text;
    return `${optionText.length + 1}ch`; // Adjust width based on the length of the selected option text
  };

  return (
    <div>
      <div className="bg-gray-800 text-white  flex items-center  justify-start px-4 py-2 space-x-2">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <img
              src="/sm-logo.png"
              alt="Smile Store Logo"
              className="hidden sm:block md:h-20 md:w-20 lg:h-20 lg:w-20 p-2"
            />
          </div>

          {/* Location */}
          <div className="text-sm">
            <p>New York, John Doe</p>
          </div>
        </div>

        {/* Search Section */}
        <form
  onSubmit={handleSearchSubmit}
  className="flex items-center bg-white rounded-md border border-gray-300 overflow-hidden h-12 w-[600px]" // Increased form width to ensure space
>
  {/* Category Selector */}
  <select
    ref={categoryRef}
    value={category}
    onChange={handleCategorySelect}
    className="bg-gray-200 text-black px-4 h-full border-r border-gray-300 outline-none flex-grow-0"
    style={{
      width: getSelectWidth(), // Adjust width dynamically based on selected text length
      minWidth: '120px', // Ensure the select box remains visible even for short options like 'All'
    }}
  >
    <option value="">All</option>
    <option value="Friends">Friends</option>
    <option value="The Big Bang Theory">The Big Bang Theory</option>
    <option value="How I Met Your Mother">How I Met Your Mother</option>
    <option value="Modern Family">Modern Family</option>
    <option value="BN99">Brooklyn Nine-Nine</option>
    <option value="TO">The Office</option>
  </select>

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search products"
    value={searchTerm}
    onChange={handleSearchChange}
    className="flex-grow px-4 text-gray-700 outline-none"
  />

  {/* Search Button */}
  <button
    type="submit"
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 h-full flex items-center justify-center"
  >
    {/* Magnifying Glass Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
      />
    </svg>
  </button>
</form>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language */}
          <button
            onClick={() => setLanguage(language === "EN" ? "ES" : "EN")}
            className="bg-gray-700 hover:bg-gray-600 text-white rounded-md px-4 py-1"
          >
            {language}
          </button>

          {/* Login */}
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-1"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
