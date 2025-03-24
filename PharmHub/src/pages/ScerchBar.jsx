import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from both APIs
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const skincareRes = await fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/skincare.json");
        const medicineRes = await fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/medecine.json");
        
        const skincareData = await skincareRes.json();
        const medicineData = await medicineRes.json();

        const skincareProducts = skincareData ? Object.values(skincareData) : [];
        const medicineProducts = medicineData ? Object.values(medicineData) : [];

        setAllProducts([...skincareProducts, ...medicineProducts]); // Merge both lists
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update suggestions based on the search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filteredSuggestions = allProducts.filter((item) =>
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if the search term is empty
    }
  }, [searchTerm, allProducts]);

  // Handle search button click
  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (searchTerm.toLowerCase() === "medicine") {
        navigate("/medicine-product");
      } else {
        navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    navigate(`/products?search=${encodeURIComponent(product.product_name)}`);
  };

  return (
    <div className="relative flex items-center bg-white border border-gray-300 rounded-full shadow-md px-4 py-1 w-full max-w-xl">
      <FaSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search for Medicine or Skincare"
        className="flex-grow focus:outline-none text-gray-700 bg-transparent"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded-full shadow hover:bg-teal-700"
        onClick={handleSearch}
      >
        Search
      </button>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul>
            {suggestions.map((item) => (
              <li
                key={item.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(item)}
              >
                {item.product_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
