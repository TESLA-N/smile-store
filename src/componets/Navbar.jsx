import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Avatar from "@mui/material/Avatar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./sidebar";
import AuthModal from "./AuthModal";
// import Product from "../../backend/models/productModel";
import ProductList from "./ProductList";

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [user, setUser] = useState(null);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isSidebarVisible);
  }, [isSidebarVisible]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching user profile...");
        const { data } = await axios.get("http://localhost:4000/api/profile", {
          withCredentials: true,
        });
        console.log("User profile fetched:", data);
        setUser(data);
      } catch (err) {
        console.log("Not logged in:", err.response?.status);
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-menu")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/products");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/logout", {}, { withCredentials: true });
      setUser(null);
      setShowProfileMenu(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleKeyPress = (e) => e.key === "Enter" && handleSearch();
  const handleCartClick = () => navigate("/cart");
  const handleAddressClick = () => navigate("/api/address");
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const handleLoginClick = () => {
    setAuthMode("login");
    setIsAuthOpen(true);
  };

  const handleSwitchAuth = () => setAuthMode((prev) => (prev === "login" ? "signup" : "login"));
  const handleCloseAuth = () => setIsAuthOpen(false);

  const handleSuggestionClick = (product) => {
    setSearchQuery(product.name);
    setSuggestions([]);
    handleSearch();
  };

  // Function to refresh user data after login/signup
  const refreshUser = async () => {
    try {
      console.log("Refreshing user profile...");
      const { data } = await axios.get("http://localhost:4000/api/profile", {
        withCredentials: true,
      });
      console.log("User profile refreshed:", data);
      setUser(data);
    } catch (err) {
      console.log("Failed to refresh user profile:", err);
      setUser(null);
    }
  };

  return (
    <div className="bg-gray-800 text-white shadow-lg">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between px-4 py-3">
        <Link to="/">
          <img
            src="/smilestorelogo.png"
            alt="SmileStore"
            className="w-24 h-auto cursor-pointer transition-all hover:outline hover:outline-2 hover:outline-white"
          />
        </Link>

        <div className="flex flex-col text-sm cursor-pointer" onClick={handleAddressClick}>
          <div className="flex items-center text-sm">
            <img src="/icons8-location-50.png" alt="Location" className="w-6 h-6 mr-1" />
            <span className="font-semibold">Deliver to</span>
          </div>
          <span>{user?.defaultAddress?.line || "1234 Your Address"}</span>
        </div>

        <div className="relative flex items-center flex-grow max-w-2xl mx-4">
          <select
            className="bg-gray-700 text-white p-2 hover:bg-black rounded-l-lg h-full appearance-none pr-8"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
            <option>Books</option>
          </select>

          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full p-2 text-black outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border mt-1 max-h-60 overflow-y-auto z-50 rounded shadow-lg text-black">
                {suggestions.map((product) => (
                  <li
                    key={product._id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-500 p-2 rounded-r-lg hover:bg-blue-600"
          >
            <SearchIcon className="text-white" />
          </button>
        </div>

        <button onClick={handleCartClick} className="bg-gray-700 p-2 rounded-lg">
          <ShoppingCartIcon className="text-white" />
        </button>

        {user ? (
          <div className="relative profile-menu">
            <Avatar
              alt={user.name}
              src={user.profilePic || "/default-avatar.png"}
              className="ml-4 cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                <button
                  onClick={() => navigate("/profile/edit")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={() => navigate("/wishlist")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ❤️ Wishlist
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 p-2 rounded-md hover:bg-blue-600 ml-4"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden px-4 py-3 flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <button onClick={toggleSidebar} className="bg-gray-700 p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/">
            <img src="/smilestorelogo.png" alt="Logo" className="h-6" />
          </Link>

          <div className="flex items-center space-x-2">
            {user ? (
              <div className="relative profile-menu">
                <Avatar
                  alt={user.name}
                  src={user.profilePic || "/default-avatar.png"}
                  className="cursor-pointer w-8 h-8"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                    <button
                      onClick={() => {
                        navigate("/profile/edit");
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      ✏️ Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/wishlist");
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      ❤️ Wishlist
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLoginClick} className="bg-blue-500 p-2 rounded-md hover:bg-blue-600">
                <PermIdentityIcon className="text-white" />
              </button>
            )}
            <button onClick={handleCartClick} className="bg-gray-700 p-2 rounded-md">
              <ShoppingCartIcon className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full p-2 text-black rounded-l-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch} className="bg-blue-500 p-2 rounded-r-md hover:bg-blue-600">
            <SearchIcon className="text-white" />
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarVisible && (
        <div className="fixed inset-0 flex z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleSidebar}></div>
          <div className="relative w-72 h-screen bg-gray-800 shadow-lg z-50">
            <Sidebar />
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          mode={authMode}
          onClose={handleCloseAuth}
          onSwitch={handleSwitchAuth}
          refreshUser={refreshUser}
        />
      )}
    </div>
  );
}

export default Navbar;