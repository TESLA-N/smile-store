// src/ProductPage.js
import React from "react";
// import { useNavigate } from "react-router-dom";
import AllProd from "../componets/Allproducts";
import Navbar from "../componets/Navbar";
import Navbar2 from "../componets/Navbar2";
import Footer from "../componets/Footer";


const ProductPage = () => {
  // const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Navbar2 />

     <AllProd/>
      <Footer />
    </>
  );
};

export default ProductPage;