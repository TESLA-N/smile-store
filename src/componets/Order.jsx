import React, { useEffect, useState } from "react";
import {
  LocationOn,
  Payment,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [fromCart, setFromCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedAddress = {
    name: "Nitish Kumar",
    phone: "+91 9876543210",
    line1: "123, Main Street",
    line2: "Nihal Vihar, Delhi - 110041",
  };

  useEffect(() => {
    const state = location.state;
    setLoading(true);

    if (state?.product) {
      // Single product order
      setProducts([{ ...state.product, quantity: 1 }]);
      setFromCart(false);
      setLoading(false);
    } else {
      // From cart
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const items = (data.cartItems || []).map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }));
          setProducts(items);
          setFromCart(true);
        })
        .catch((err) => console.error("Error fetching cart:", err))
        .finally(() => setLoading(false));
    }
  }, [location.state, token]);

  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((item) => item._id !== id));
  };

  const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Products Scrollable Box */}
        <div className="md:col-span-2">
          <div className="bg-blue-50 p-4 rounded-xl shadow h-[500px] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            {loading ? (
              <div className="flex justify-center items-center h-[400px]">
                <CircularProgress color="primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((item) => (
                  <div key={item._id} className="flex items-center border-b pb-3">
                    <img
                      src={item.thumbnail || "/placeholder.jpg"}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium text-base">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 font-semibold text-sm">
                        ${(item.quantity || 1) * item.price}
                      </span>
                      <DeleteIcon
                        onClick={() => handleRemove(item._id)}
                        className="cursor-pointer text-gray-500 hover:text-red-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Box */}
        <div className="bg-blue-50 p-6 rounded-xl shadow space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              <div className="flex items-start gap-2 text-sm">
                <LocationOn className="text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">{selectedAddress.name}</p>
                  <p>{selectedAddress.line1}</p>
                  <p>{selectedAddress.line2}</p>
                  <p className="text-gray-600">{selectedAddress.phone}</p>
                </div>
              </div>

              <hr />

              <div>
                <h3 className="text-lg font-semibold mb-2">Bill Summary</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-2">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                <Payment />
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
