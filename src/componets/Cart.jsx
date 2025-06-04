import React, { useState } from "react";
import { Trash2 } from "lucide-react"; // Importing delete bin icon

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", price: 500, quantity: 1, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Product 2", price: 700, quantity: 2, image: "https://via.placeholder.com/100" },
  ]);

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b py-4">
              {/* Product Image */}
              <div className="flex flex-col items-center sm:flex-row sm:space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md" />
                <p className="font-semibold text-center sm:text-left">{item.name}</p>
              </div>

              {/* Price */}
              <p className="text-gray-700 hidden sm:block">₹{item.price}</p>

              {/* Quantity Controls */}
              <div className="flex flex-col items-center sm:flex-row sm:space-x-2 mt-2 sm:mt-0">
                {item.quantity === 1 ? (
                  <button 
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                ) : (
                  <button 
                    className="px-3 bg-gray-200 rounded-md" 
                    onClick={() => updateQuantity(item.id, -1)}
                  >-</button>
                )}
                
                <span className="px-3">{item.quantity}</span>

                <button 
                  className="px-3 bg-gray-200 rounded-md" 
                  onClick={() => updateQuantity(item.id, 1)}
                >+</button>
              </div>

              {/* Price (for mobile) */}
              <p className="text-gray-700 sm:hidden mt-2">₹{item.price}</p>

              {/* Delete Button */}
              <button 
                className="text-red-500 hover:text-red-700 font-bold hidden sm:block"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-4 font-bold text-lg">
            <p>Total:</p>
            <p>₹{totalPrice}</p>
          </div>
          
          <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;