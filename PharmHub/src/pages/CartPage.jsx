import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaTruck, FaTag } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth(); // Get the logged-in user from AuthContext
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to the login page
    }
  }, [user, navigate]);

  // If user is not authenticated, show nothing (or a loading spinner)
  if (!user) {
    return null; // Or return a loading spinner
  }

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) => total + (item.price * (1 - item.discount / 100)) * item.quantity,
        0
      )
      .toFixed(2);
  };

  // Calculate total savings
  const calculateSavings = () => {
    return cartItems
      .reduce(
        (savings, item) => savings + (item.price * item.quantity * (item.discount / 100)),
        0
      )
      .toFixed(2);
  };

  // Slider settings for the image carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section: Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="w-full md:w-1/3">
                  {/* Display a single image if `image` is present */}
                  {item.image && !item.images && (
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="w-full h-48 object-contain rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200"; // Fallback image
                      }}
                    />
                  )}

                  {/* Display a slider if `images` is present */}
                  {item.images && (
                    <Slider {...sliderSettings}>
                      {item.images.map((img, index) => (
                        <div key={index}>
                          <img
                            src={img}
                            alt={`${item.product_name} - Image ${index + 1}`}
                            className="w-full h-48 object-contain rounded-lg"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/200"; // Fallback image
                            }}
                          />
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>

                {/* Product Details */}
                <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-6">
                  <h3 className="text-xl font-bold">{item.product_name}</h3>
                  <p className="text-gray-500 line-through mt-2">
                    MRP: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-green-600 font-semibold">
                    Price: ₹{((item.price * (1 - item.discount / 100)) * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-red-500 mt-1">
                    You save: ₹{(item.price * item.quantity * (item.discount / 100)).toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="px-4 py-1 bg-gray-100 rounded">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 text-red-600 flex items-center space-x-2 hover:text-red-800 transition-colors duration-200"
                  >
                    <FaTrash /> <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section: Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Cart Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="text-green-600">-₹{calculateSavings()}</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="text-gray-600 font-semibold">Total:</span>
                <span className="text-xl font-bold text-green-600">₹{calculateTotal()}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 flex items-center space-x-2 text-green-600">
              <FaTruck className="w-5 h-5" />
              <span>Free Delivery</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout", { state: { cartItems } })}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;