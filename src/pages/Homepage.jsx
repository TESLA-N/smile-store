// src/pages/HomePage.js
import React from "react";
import Navbar from "../componets/Navbar";
import Navbar2 from "../componets/Navbar2";
import Sidebar from "../componets/sidebar";
import Carousel from "../componets/Carousel";
import Footer from "../componets/Footer";
import "../pages/Homepage.css"; // Importing styles for HomePage

const HomePage = () => {
  return (
    <div className="homePage flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Navbar Components */}
      <Navbar />
      <Navbar2 />
      <Carousel/>
      <Footer/>

      {/* <Sidebar/> */}

      {/* Main Content */}
      {/* <div className="homePage__content flex flex-col items-center justify-center text-center px-4 py-6 md:px-8 lg:px-16">
        <h2 className="text-lg md:text-2xl font-bold mb-2">
          Welcome to Smile Store!
        </h2>
        <p className="text-sm md:text-base">
          Your one-stop shop for all things sitcoms!
        </p>
      </div> */}
    </div>
  );
};

export default HomePage;
