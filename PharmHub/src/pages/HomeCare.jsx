import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
const HomeCare = () => {
        const { addToCart } = useCart();
    
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/homecare.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const productList = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
          setProducts(productList.slice(0, 14));
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 py-4 px-8 hover:from-blue-600 hover:to-green-600 transition-all duration-500">
      Home & Harmony
      </h2>
        <button
          className="text-blue-700 font-bold cursor-pointer"
          onClick={() => navigate("/homecare-product")}
        >
          View All
        </button>
      </div>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-3 rounded-lg shadow-md text-center w-40 flex-shrink-0"
            >
              <img
                src={product.image}
                alt={product.product_name}
                className="w-24 h-24 object-contain mx-auto cursor-pointer"
                onClick={() => navigate(`/homecare-page/${product.id}`)}
              />
              <h3 className="text-sm font-semibold truncate mt-2">
                {product.product_name}
              </h3>
              <div className="text-xs text-gray-600 mt-1">
                <p className="text-green-600 font-bold">₹{(product.price * 0.5).toFixed(1)}</p>
                <p className="line-through text-red-500">MRP {product.price}</p>
                <p className="text-green-500">50% off</p>
              </div>
              <button onClick={() => addToCart(product)} className="mt-2 bg-green-700 text-white px-3 py-1 rounded text-xs">
                ADD
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default HomeCare;
