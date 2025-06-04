import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useLocation, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const query = params.get("search");
      const category = params.get("category");

      const apiParams = new URLSearchParams();
      if (query) apiParams.append("q", query);
      if (category) apiParams.append("category", category);

      const res = await fetch(`http://localhost:4000/api/products/search?${apiParams.toString()}`);
      const data = await res.json();
      setProducts(data);
      setVisibleCount(5);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location.search]);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const handleCardClick = (product) => {
    // navigate("/view", { state: { product } });
    // navigate(`/view/${product._id}`);
    navigate(`/product/view/${product._id}`);


  };

  return (
    <section className="px-4 py-8 bg-[#f5f5f5] min-h-screen">
      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
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
              // Prevent clicks on button/wishlist from triggering card navigation
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
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                >
                  Add to Cart
                </button>

                <FavoriteBorderIcon
                  className="text-pink-600 cursor-pointer"
                  fontSize="large"
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More button */}
      {visibleCount < products.length && (
        <div className="mt-8 flex justify-start max-w-6xl mx-auto">
          <button
            onClick={handleShowMore}
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            More
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductList;
