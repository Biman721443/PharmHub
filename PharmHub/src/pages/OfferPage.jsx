import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaTag, FaStar } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

const OfferPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [subscribed, setSubscribed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pharmhub-87fa3-default-rtdb.firebaseio.com/medecine.json")
      .then((response) => {
        setMedicines(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setLoading(false);
      });
  }, []);

  const handleSubscribe = (medicineName) => {
    setSubscribed(`You have subscribed for price alerts on ${medicineName}.`);
    setTimeout(() => setSubscribed(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
        💊 Best Offers on Medicines
      </h2>

      {subscribed && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 border-l-4 border-green-500 rounded flex items-center animate-fade-in">
          <FaBell className="mr-2" /> {subscribed}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <PulseLoader color="#3B82F6" size={15} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 relative transform hover:-translate-y-2"
            >
              {medicine.discount > 0 && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-xs font-bold rounded-full animate-bounce">
                  <FaTag className="inline-block mr-1" /> {medicine.discount}% Off
                </span>
              )}
              <img
                src={medicine.images[0]}
                alt={medicine.product_name}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {medicine.product_name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{medicine.description}</p>
              <p className="text-green-600 font-bold text-2xl mb-4">
                ₹{medicine.price}
              </p>
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400" />
                <span className="ml-1 text-gray-700">{medicine.rating} / 5</span>
              </div>
              <div className="flex items-center justify-center h-12">
                <button
                  onClick={() => handleSubscribe(medicine.product_name)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <FaBell className="mr-2" /> Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferPage;