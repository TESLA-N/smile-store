

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "../components/Layout.jsx";
import Layout from "./componets/Layout.jsx";
import HomePage from "./pages/Homepage.jsx";

// import HomePage from "./pages/Homepage.jsx";
import ProductPage from "./pages/Productpage.jsx"; // your product search/display page
import ViewPage from "./pages/ProductView.jsx";
import CartPa from "./pages/Cartpage.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductPage />} />
          {/* add more routes as needed */}
          <Route path="/product/view/:id" element={<ViewPage />} />
          <Route path="cart" element={<CartPa/>}/>



        </Route>
      </Routes>
    </Router>
  );
};

export default App;
