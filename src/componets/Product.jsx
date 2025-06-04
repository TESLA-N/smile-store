import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.thumbnail); // Default selected image
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#f5f5f5]">
        <p className="text-lg font-medium">Loading product...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#f5f5f5]">
        <p className="text-lg text-red-600">Product not found.</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 bg-[#f5f5f5] min-h-[70vh]">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden p-4 md:flex relative">
        
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 items-center">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[300px] object-contain"
          />

          <div className="flex gap-2 flex-wrap justify-center">
            {(product.images || []).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                  selectedImage === img ? "ring-2 ring-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between relative">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>

            {/* Price */}
            <p className="mt-4 text-xl font-semibold text-green-700">${product.price}</p>

            {/* Product Details */}
            <div className="mt-6 space-y-3 text-gray-800 text-sm">
              {/* <p className="text-gray-600">Discount: {product.discountPercentage}%</p> */}
              <p className="font-medium">Rating: {product.rating}</p>
              <p className="font-medium">Stock: {product.stock}</p>
              <p className="font-medium">Brand: {product.brand}</p>
              <p className="font-medium capitalize">Category: {product.category}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Add to Cart
            </button>
            <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
              Order Now
            </button>
          </div>

          {/* Wishlist Icon in bottom right */}
          <div className="absolute bottom-4 right-4">
            <FavoriteBorderIcon className="text-pink-600 cursor-pointer text-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductView;
