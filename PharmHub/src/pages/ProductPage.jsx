import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Import CartContext

const ProductPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [skinTypeFilter, setSkinTypeFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [openFilters, setOpenFilters] = useState({ brands: true, skin: true, rating: true });
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the search term from the query parameter
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  // Fetch all data from Firebase
  useEffect(() => {
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/skincare.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const productList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
          setProducts(productList);
          setFilteredProducts(productList);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((p) =>
        p.product_name.toLowerCase().includes(lowerCaseSearchTerm) ||
        p.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Filter by brand
    if (brandFilter.length) {
      filtered = filtered.filter((p) => brandFilter.includes(p.brand));
    }

    // Filter by skin type
    if (skinTypeFilter.length) {
      filtered = filtered.filter((p) => skinTypeFilter.includes(p.skin_type));
    }

    // Filter by rating
    if (ratingFilter.length) {
      filtered = filtered.filter((p) =>
        ratingFilter.includes(p.rating >= 4.5 ? "above" : "below")
      );
    }

    // Sort by price
    if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts([...filtered]);
  }, [searchTerm, brandFilter, skinTypeFilter, ratingFilter, sortOption, products]);

  // Toggle filter sections
  const toggleFilter = (filter) => {
    setOpenFilters({ ...openFilters, [filter]: !openFilters[filter] });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Search Results for "{searchTerm}"</h2>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded shadow"
        >
          <option value="">Sort By</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="low-to-high">Price: Low to High</option>
        </select>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-1/4 p-4 bg-white shadow rounded-lg">
          <h3 className="font-bold text-lg">Filters</h3>
          {[
            {
              label: "Brands",
              state: "brands",
              options: ["PharmHub Pharmacy", "PharmHub Life", "PharmHub Sn"],
              setter: setBrandFilter,
            },
            {
              label: "Skin Type",
              state: "skin",
              options: ["Dry Skin", "Oily Skin"],
              setter: setSkinTypeFilter,
            },
            {
              label: "Rating",
              state: "rating",
              options: ["above", "below"],
              setter: setRatingFilter,
              labels: { above: "Above 4.5", below: "Below 4.5" },
            },
          ].map(({ label, state, options, setter, labels }) => (
            <div key={state} className="mt-4 border-b pb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter(state)}
              >
                <h4 className="font-semibold">{label}</h4>
                {openFilters[state] ? <FaMinus /> : <FaPlus />}
              </div>
              {openFilters[state] && (
                <div className="mt-2 space-y-2">
                  {options.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        value={option}
                        onChange={(e) =>
                          setter((prev) =>
                            e.target.checked
                              ? [...prev, option]
                              : prev.filter((val) => val !== option)
                          )
                        }
                      />
                      <span>{labels ? labels[option] : option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full h-40 object-contain cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <h3
                className="text-sm font-bold mt-2 truncate cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.product_name}
              </h3>
              <p className="text-green-600 font-bold">
                ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
              </p>
              <p className="line-through text-red-500">MRP ₹{product.price}</p>
              <p className="text-green-500">{product.discount}% off</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-green-900 text-white p-2 w-full rounded hover:bg-green-800"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;