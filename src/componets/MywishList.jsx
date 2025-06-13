import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCardClick = (product) => {
    navigate(`/product/view/${product._id}`);
  };

  const fetchWishlist = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/users/wishlist', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setWishlistItems(data.wishlistItems || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await fetch(`http://localhost:4000/api/users/wishlist/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchWishlist();
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Please login to view your wishlist.");
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, [navigate, token]);

  return (
    <section className="px-4 py-8 bg-gradient-to-br from-pink-100 to-yellow-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                onClick={(e) => {
                  if (
                    e.target.closest("button") ||
                    e.target.closest("svg")
                  ) return;
                  handleCardClick(item.product);
                }}
                className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden w-full h-auto sm:h-[180px] lg:h-[150px] cursor-pointer"
              >
                {/* Image Section */}
                <div className="w-full sm:w-1/3 h-[200px] sm:h-full flex items-center justify-center bg-white">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-[90%] h-[90%] object-contain"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-between p-4 w-full sm:w-2/3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {item.product.description || 'No description available'}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-green-700 font-semibold">
                      ₹{item.product.price}
                    </span>
                    <FavoriteIcon className="text-red-500" />
                    <DeleteIcon
                      className="cursor-pointer text-gray-600 hover:text-black"
                      onClick={() => handleRemove(item.product._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
