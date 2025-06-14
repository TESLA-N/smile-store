import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddTowish = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to wishlist.");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product added to wishlist!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart.");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product added to cart!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(location.search);
      const query = params.get("search");
      const category = params.get("category");

      const apiParams = new URLSearchParams();
      if (query) apiParams.append("q", query);
      if (category) apiParams.append("category", category);

      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/products/search?${apiParams.toString()}`);
      const data = await res.json();
      setProducts(data);
      setVisibleCount(5);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location.search]);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const handleCardClick = (product) => {
    navigate(`/product/view/${product._id}`);
  };

  return (
    <section className="px-4 py-8 bg-[#f5f5f5] min-h-screen">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress style={{ color: 'blue' }} />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {products.slice(0, visibleCount).map((product) => (
                <div
                  key={product._id}
                  className="
                    flex flex-col sm:flex-row
                    bg-[#e2e2e2] rounded-xl shadow-md overflow-hidden w-full
                    h-auto sm:h-[180px] lg:h-[150px]
                    cursor-pointer
                  "
                  onClick={(e) => {
                    if (
                      e.target.closest("button") ||
                      e.target.closest("svg")
                    ) return;
                    handleCardClick(product);
                  }}
                >
                  {/* Image Section */}
                  <div className="w-full sm:w-1/3 h-[200px] sm:h-full flex items-center justify-center bg-white">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-[90%] h-[90%] object-contain"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between p-4 w-full sm:w-2/3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 truncate">{product.title}</h3>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                        {product.description || 'No description available'}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-green-700 font-semibold">${product.price || 'N/A'}</span>

                      <button
                        onClick={() => handleAddToCart(product._id)}
                        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                      >
                        Add to Cart
                      </button>

                      <FavoriteBorderIcon
                        className="text-pink-600 cursor-pointer"
                        fontSize="large"
                        onClick={() => handleAddTowish(product._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < products.length && (
              <div className="mt-8 flex justify-start">
                <button
                  onClick={handleShowMore}
                  className="text-blue-600 hover:underline font-medium text-sm"
                >
                  More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductList;
