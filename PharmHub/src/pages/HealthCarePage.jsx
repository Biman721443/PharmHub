import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaTruck, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Import CartContext

const HealthCarePage = () => {
        const { addToCart } = useCart();
    
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const productId = window.location.pathname.split("/").pop();
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/skincare.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data[productId]) {
          setProduct({ id: productId, ...data[productId] });
        }
      })
      .catch((err) => console.error("Error fetching product details:", err));
  }, []);

  if (!product) {
    return <div className="text-center text-gray-500 p-10">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.product_name}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110 rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.product_name}</h1>
          <p className="text-gray-600 mt-2 leading-relaxed">{product.description}</p>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-500 text-lg flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < product.rating ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </span>
            <span className="text-gray-500">({product.rating} / 5)</span>
          </div>

          {/* Pricing */}
          <div className="mt-4">
            <p className="text-green-600 font-bold text-2xl">₹{(product.price * 0.5).toFixed(1)}</p>
            <p className="line-through text-red-500 text-lg">MRP ₹{product.price}</p>
            <p className="text-green-500 text-sm">Limited Time Offer - 50% Off</p>
          </div>

          {/* Delivery Info */}
          <div className="mt-4 flex items-center gap-2 text-gray-600">
            <FaTruck className="text-green-700" />
            <p>Fast & Free Delivery in 2-3 Days</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button onClick={() => addToCart(product)} className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold">
              <FaShoppingCart /> Add to Cart
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCarePage;