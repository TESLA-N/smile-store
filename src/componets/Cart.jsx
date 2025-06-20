import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
// import AuthModal from './AuthModal.jsx';
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
// const [isAuthOpen, setIsAuthOpen] = useState(false);
//   const [authMode, setAuthMode] = useState("login");
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCartItems(data.cartItems || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantity = async (productId, type) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      fetchCart();
    } catch (error) {
      console.error(`Failed to ${type} quantity:`, error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Please login to view your cart.");
    //   setAuthMode("login");
    // setIsAuthOpen(true);
    setLoading(false);
          

      return;
    }
    fetchCart();
  }, [navigate, token]);

  return (
    <section className="px-4 py-8 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress style={{ color: 'blue' }} />
          </div>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden w-full h-auto sm:h-[180px] lg:h-[150px] cursor-pointer"
                  onClick={(e) => {
                    if (
                      e.target.closest("button") ||
                      e.target.closest("svg")
                    ) return;
                    navigate(`/product/view/${item.product._id}`);
                  }}
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
                  <div className="flex flex-col justify-between p-4 w-full sm:w-2/3 bg-blue-50">
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
                        ${item.product.price}
                      </span>

                      <div className="flex items-center gap-2">
                        <RemoveIcon
                          className="cursor-pointer text-red-500 hover:text-red-600"
                          onClick={() => handleQuantity(item.product._id, 'decrease')}
                        />
                        <span className="font-medium">{item.quantity}</span>
                        <AddIcon
                          className="cursor-pointer text-green-600 hover:text-green-700"
                          onClick={() => handleQuantity(item.product._id, 'increase')}
                        />
                      </div>

                      <DeleteIcon
                        className="cursor-pointer text-gray-600 hover:text-black"
                        onClick={() => handleRemove(item.product._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Button */}
            <div className="flex justify-center sm:justify-end mt-10">

              <button
                className="bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 text-lg shadow"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;
