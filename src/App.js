

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "../components/Layout.jsx";
import Layout from "./componets/Layout.jsx";
import HomePage from "./pages/Homepage.jsx";

// import HomePage from "./pages/Homepage.jsx";
import ProductPage from "./pages/Productpage.jsx"; // your product search/display page
import ViewPage from "./pages/ProductView.jsx";

import { Cartppage } from "./pages/Cartppage.jsx";
import MywishPage from "./pages/Mywish.jsx";
import Proedit from "./pages/Proedit.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductPage />} />
          {/* add more routes as needed */}
          <Route path="/product/view/:id" element={<ViewPage />} />
          <Route path="cart" element={<Cartppage/>}/>
          {/* <Route path="wishlist" element={<WishPage/>}/> */}
          <Route path="wishlist" element={<MywishPage/>}/>
          <Route path="profile/edit" element={<Proedit/>}/>
          



        </Route>
      </Routes>
    </Router>
  );
};

export default App;
