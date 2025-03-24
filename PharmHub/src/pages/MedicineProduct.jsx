import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AIRecommendations from "./AIRecommendations"; // Import the AI component

const MedicineProduct = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [quantityFilter, setQuantityFilter] = useState([]);
  const [discountFilter, setDiscountFilter] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [openFilters, setOpenFilters] = useState({ brands: true, category: true, quantity: true, discount: true });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/medecine.json")
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

  useEffect(() => {
    let filtered = products;
    if (brandFilter.length) {
      filtered = filtered.filter((p) => brandFilter.includes(p.brand));
    }
    if (categoryFilter.length) {
      filtered = filtered.filter((p) => categoryFilter.includes(p.category));
    }
    if (quantityFilter.length) {
      filtered = filtered.filter((p) => quantityFilter.includes(p.quantity >= 50 ? "above" : "below"));
    }
    if (discountFilter.length) {
      filtered = filtered.filter((p) => discountFilter.includes(p.discount >= 20 ? "20%+" : "10%+"));
    }
    if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts([...filtered]);
  }, [brandFilter, categoryFilter, quantityFilter, discountFilter, sortOption, products]);

  const toggleFilter = (filter) => {
    setOpenFilters({ ...openFilters, [filter]: !openFilters[filter] });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: true,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 animate-bounce hover:animate-pulse">
  Top Medicine Deals
</h2>        <select onChange={(e) => setSortOption(e.target.value)} className="border p-2 rounded shadow">
          <option value="">Sort By</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="low-to-high">Price: Low to High</option>
        </select>
      </div>
      <div className="flex gap-6">
        {/* Filters Section */}
        <div className="w-1/4 p-4 bg-white shadow rounded-lg sticky top-6 h-fit">
          <h3 className="font-bold text-lg">Filters</h3>
          {[
            { label: "Brands", state: "brands", options: ["PharmHub Pharmacy", "PharmHub Life", "PharmHub Sn"], setter: setBrandFilter },
            { label: "Category", state: "category", options: ["diabetic", "pain-relief", "liver-care", "cold-immunity", "stomach-care"], setter: setCategoryFilter },
            { label: "Quantity", state: "quantity", options: ["below", "above"], setter: setQuantityFilter, labels: { below: "Below 50", above: "Above 50" } },
            { label: "Discount", state: "discount", options: ["10%+", "20%+"], setter: setDiscountFilter },
          ].map(({ label, state, options, setter, labels }) => (
            <div key={state} className="mt-4 border-b pb-2">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFilter(state)}>
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
                            e.target.checked ? [...prev, option] : prev.filter((val) => val !== option)
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

        {/* Products Section */}
        <div className="w-3/4">
          {/* Main Products Grid */}
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition">
                {product.images && product.images.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {product.images.map((img, index) => (
                      <div key={index}>
                        <img
                          src={img}
                          alt={product.product_name}
                          className="w-full h-40 object-contain cursor-pointer rounded"
                          onClick={() => navigate(`/medicine-page/${product.id}`)}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-500">
                    No Image Available
                  </div>
                )}
                <h3 className="text-sm font-bold mt-2 truncate cursor-pointer" onClick={() => navigate(`/medicine-page/${product.id}`)}>
                  {product.product_name}
                </h3>
                <p className="text-green-600 font-bold">₹{(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                <p className="line-through text-red-500">MRP ₹{product.price}</p>
                <p className="text-green-500">{product.discount}% off</p>
                <button onClick={() => addToCart(product)} className="mt-2 bg-green-900 text-white p-2 w-full rounded hover:bg-green-800">
                  Add
                </button>
              </div>
            ))}
          </div>

          {/* AI Recommendations Section */}
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
};

export default MedicineProduct;