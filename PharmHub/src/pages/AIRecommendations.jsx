import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaShoppingCart } from "react-icons/fa";

const useAIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems } = useCart();

  useEffect(() => {
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/medecine.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const allMedicines = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          let recommendedMeds = [];

          if (cartItems.length > 0) {
            const lastAddedItem = cartItems[cartItems.length - 1];
            recommendedMeds = allMedicines.filter(
              (med) =>
                (med.category === lastAddedItem.category ||
                  med.brand === lastAddedItem.brand) &&
                med.id !== lastAddedItem.id
            );
          }

          if (recommendedMeds.length === 0) {
            recommendedMeds = allMedicines
              .filter((med) => med.discount > 15)
              .slice(0, 6);
          }

          setRecommendations(recommendedMeds.slice(0, 6));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching AI recommendations:", err);
        setLoading(false);
      });
  }, [cartItems]);

  return { recommendations, loading };
};

const AIRecommendations = () => {
  const { recommendations, loading } = useAIRecommendations();
  const { addToCart } = useCart();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-5 text-blue-900">
        For Your Recommendations
      </h3>
      {loading ? (
        <p className="text-gray-500 text-center text-lg animate-pulse">Loading recommendations...</p>
      ) : (
        <Slider {...sliderSettings} className="px-2">
          {recommendations.map((product) => (
            <div key={product.id} className="p-4">
              <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.product_name}
                    className="w-28 h-28 object-contain rounded-lg hover:rotate-2 transition-transform"
                  />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
                    No Image
                  </div>
                )}
                <h3 className="text-md font-semibold mt-3 text-gray-800 text-center">
                  {product.product_name}
                </h3>
                <p className="text-green-600 font-bold text-lg">
                  ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                </p>
                <p className="text-sm text-red-500 line-through">
                  MRP ₹{product.price}
                </p>
                <p className="text-xs text-green-500 bg-green-100 px-3 py-1 rounded-md">
                  {product.discount}% off
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-xl"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default AIRecommendations;