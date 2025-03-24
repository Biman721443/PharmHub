import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // To get the logged-in user's email

const ProfilePage = () => {
  const { user } = useAuth(); // Get the logged-in user's email from AuthContext
  const [orders, setOrders] = useState([]); // State to store order history

  // Fetch order data from localStorage
  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log("Orders from localStorage:", existingOrders); // Debugging
    setOrders(existingOrders);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
      </div>

      {/* User Information Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Information</h2>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">Order Date:</span> {order.date}
                  </p>
                  <p className="text-green-600 font-semibold">
                    Total: ₹{Number(order.total).toFixed(2)}
                  </p>
                </div>

                {/* Products List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-800 font-medium">{product.product_name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                        <p className="text-green-600 font-semibold">
                          ₹{(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;