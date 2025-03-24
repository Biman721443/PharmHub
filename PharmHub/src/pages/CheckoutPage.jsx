import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import { FaCheckCircle, FaTruck, FaCreditCard, FaClipboardList } from "react-icons/fa";

const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] }; // Access cartItems from state
  const navigate = useNavigate(); // Initialize useNavigate

  const [step, setStep] = useState(1); // Current step in the checkout process
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({}); // To store validation errors

  // Calculate total price
  
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      };
  

  // Handle shipping info input change
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  // Handle payment info input change
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  // Validate shipping information
  const validateShipping = () => {
    const { name, address, city, state, zip, phone } = shippingInfo;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!zip) newErrors.zip = "ZIP Code is required.";
    if (!phone) newErrors.phone = "Phone Number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Validate payment information
  const validatePayment = () => {
    const { cardNumber, expiryDate, cvv } = paymentInfo;
    const newErrors = {};

    if (!cardNumber || cardNumber.length !== 16) {
      newErrors.cardNumber = "Invalid card number (16 digits required).";
    }
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date (MM/YY required).";
    }
    if (!cvv || cvv.length !== 3) {
      newErrors.cvv = "Invalid CVV (3 digits required).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle next step
  const handleNext = () => {
    if (step === 1 && !validateShipping()) return;
    if (step === 2 && !validatePayment()) return;
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  // Handle order confirmation
  const handleConfirmOrder = () => {
    const order = {
        id: new Date().getTime(), // Generate a unique order ID
        date: new Date().toLocaleDateString(), // Add the current date
        products: cartItems, // Use the cartItems as products
        total: calculateTotal(), // Calculate the total
      };
    
      // Save the order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders.push(order);
      localStorage.setItem("orders", JSON.stringify(existingOrders));
    
      alert("Order placed successfully!");
      navigate("/home");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center space-x-2 ${
              step >= 1 ? "text-green-600" : "text-gray-400"
            }`}
          >
            <FaTruck size={20} />
            <span>Shipping</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div
            className={`flex items-center space-x-2 ${
              step >= 2 ? "text-green-600" : "text-gray-400"
            }`}
          >
            <FaCreditCard size={20} />
            <span>Payment</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div
            className={`flex items-center space-x-2 ${
              step >= 3 ? "text-green-600" : "text-gray-400"
            }`}
          >
            <FaClipboardList size={20} />
            <span>Review</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div
            className={`flex items-center space-x-2 ${
              step >= 4 ? "text-green-600" : "text-gray-400"
            }`}
          >
            <FaCheckCircle size={20} />
            <span>Confirmation</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Shipping Information</h3>
          <form className="space-y-4">
            {["name", "address", "city", "state", "zip", "phone"].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  placeholder={
                    field === "zip"
                      ? "ZIP Code"
                      : field === "phone"
                      ? "Phone Number"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={shippingInfo[field]}
                  onChange={handleShippingChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Payment Information</h3>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={paymentInfo.expiryDate}
                onChange={handlePaymentChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6">Order Review</h3>
          <div className="space-y-4">
            {/* Shipping Information */}
            <div>
              <h4 className="text-lg font-semibold">Shipping Information</h4>
              <p>{shippingInfo.name}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
              <p>{shippingInfo.phone}</p>
            </div>

            {/* Payment Information */}
            <div>
              <h4 className="text-lg font-semibold">Payment Information</h4>
              <p>Card Ending in: {paymentInfo.cardNumber.slice(-4)}</p>
            </div>

            {/* Product Details */}
            <div>
              <h4 className="text-lg font-semibold">Product Details</h4>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <p className="text-gray-800">{item.product_name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-green-600 font-semibold">
                    ₹{((item.price * (1 - item.discount / 100)) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <h4 className="text-lg font-semibold">Order Summary</h4>
              <p>Total: ₹{calculateTotal()}</p>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Order Placed Successfully!</h3>
          <p>Thank you for your purchase. Your order will be delivered soon.</p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && step < 4 && (
          <button
            onClick={handlePrevious}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Previous
          </button>
        )}
        {step < 3 && (
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Next
          </button>
        )}
        {step ===3&& (
          <button
            onClick={handleConfirmOrder}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Confirm Order
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;