// src/components/Pcategory.jsx

import React from 'react';

const categories = [
    { name: 'Clothing', image: '/assets/images/image.png' },
 { name: 'Footwear', image: '/assets/images/footwear.png' },
  { name: 'Electronics', image: '/assets/images/Ele.png' },
  { name: 'Home Decor', image: '/assets/images/HD.png' },
  { name: 'Beauty', image: '/assets/images/BT.png' },
  { name: 'Accessories', image:'/assets/images/A.png' },
  { name: 'Sports', image: '/assets/images/Sp.png' },
  { name: 'Books', image: '/assets/images/Books.png' },
//   { name: 'Toys', image: 'https://via.placeholder.com/300x200?text=Toys' },
];

const Pcategory = () => {
  return (
    <section className="w-full py-10 px-4 bg-gradient-to-br from-blue-100 to-purple-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome to Smile Store</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            // className="bg-white rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            className="bg-white rounded-xl overflow-hidden shadow-md transform lg:hover:scale-105 transition-transform duration-300 cursor-pointer"

          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700 text-center">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pcategory;
