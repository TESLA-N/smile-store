import React from "react";
import { Plus } from "lucide-react"; // Using lucide-react for the plus icon
// import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// src/Products.js
export const products = [
  {
    id: 1,
    name: "Product 1",
    rating: 4.5,
    seller: "Seller A",
    price: "$19.99",
    image: "https://via.placeholder.com/150",
    // description: "This is a detailed description of Product 1. It has various features."
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design",
    ],
  },
  {
    id: 2,
    name: "Product 2",
    rating: 4.2,
    seller: "Seller B",
    price: "$29.99",
    image: "https://via.placeholder.com/150",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design",
    ],  },
  {
    id: 3,
    name: "Product 3",
    rating: 3.8,
    seller: "Seller C",
    price: "$39.99",
    image: "https://via.placeholder.com/150",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design",
    ],  },
  {
    id: 4,
    name: "Product 4",
    rating: 4.7,
    seller: "Seller D",
    price: "$49.99",
    image: "https://via.placeholder.com/150",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design",
    ],  },
  {
    id: 5,
    name: "Product 5",
    rating: 4.1,
    seller: "Seller E",
    price: "$59.99",
    image: "https://via.placeholder.com/150",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design",
    ],  },
  {
    id: 6,
    name: "Product 6",
    rating: 4.9,
    seller: "Seller F",
    price: "$69.99",
    image: "https://via.placeholder.com/150",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design",
    ],  },
  {
    id: 7,
    name: "Product 7",
    rating: 4.4,
    seller: "Seller G",
    price: "$79.99",
    image: "https://via.placeholder.com/150",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design lorem50",
     
    ],  },
  {
    id: 8,
    name: "Product 8",
    rating: 4.3,
    seller: "Seller H",
    price: "$89.99",
    image: "https://via.placeholder.com/150",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design",
    ],  },
  {
    id: 9,
    name: "Product 9",
    rating: 4.6,
    seller: "Seller I",
    price: "$99.99",
    image: "https://via.placeholder.com/150",
    images: [
      "/images/img1.jpg",
      "/images/img2.jpg",
      "/images/img3.jpg",
      "/images/img4.jpg",
      "/images/img5.jpg",
    ],
    description: [
      "High-resolution OLED display",
      "Ultra-fast processor",
      "Long battery life",
      "Advanced camera system",
      "5G connectivity",
      "Water-resistant design",
    ],  },
];

// const Product = () => {
//   return (
    
//   );
// };

export default products