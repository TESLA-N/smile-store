// src/pages/HomePage.js
import React from "react";
import Navbar from "../componets/Navbar";
import Navbar2 from "../componets/Navbar2";
// import Sidebar from "../componets/sidebar";
import Cart from "../componets/Cart";
import Footer from "../componets/Footer";
import "../pages/Homepage.css"; // Importing styles for HomePage

const CartPage = () => {
  return (
    <div className="homePage flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Navbar Components */}
      <Navbar />
      <Navbar2 />
     <Cart/>
      <Footer/>

      
    </div>
  );
};

export default CartPage ;