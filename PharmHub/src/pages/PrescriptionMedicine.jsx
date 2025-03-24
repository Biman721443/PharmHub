// src/components/PrescriptionMedicine.js
import React from "react";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Import CartContext

const PrescriptionMedicine = () => {
        const { addToCart } = useCart();
    
  const location = useLocation();
  const { products } = location.state || { products: [] };

  // Function to handle "Add to Cart" button click
 

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Prescription Results</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
                {product.product_name}
              </h3>
              <p className="text-green-600 font-bold text-xl mb-2">
                ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
              </p>
              <p className="line-through text-red-500 text-sm">MRP ₹{product.price}</p>
              <p className="text-green-500 text-sm mb-4">{product.discount}% off</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-red-500 text-lg">No matching products found.</p>
          <p className="text-gray-600 mt-2">Please check your prescription and try again.</p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionMedicine;