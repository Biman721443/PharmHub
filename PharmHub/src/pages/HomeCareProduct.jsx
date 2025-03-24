import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Import CartContext

const HomeCareProduct = () => {
    const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [skinTypeFilter, setSkinTypeFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [openFilters, setOpenFilters] = useState({ brands: true, skin: true, rating: true });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/homecare.json")
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
    if (skinTypeFilter.length) {
      filtered = filtered.filter((p) => skinTypeFilter.includes(p.skin_type));
    }
    if (ratingFilter.length) {
      filtered = filtered.filter((p) => ratingFilter.includes(p.rating >= 4.5 ? "above" : "below"));
    }
    if (sortOption === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts([...filtered]);
  }, [brandFilter, skinTypeFilter, ratingFilter, sortOption, products]);

  const toggleFilter = (filter) => {
    setOpenFilters({ ...openFilters, [filter]: !openFilters[filter] });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 animate-bounce hover:animate-pulse">
HomeCare Products</h2>        <select onChange={(e) => setSortOption(e.target.value)} className="border p-2 rounded shadow">
          <option value="">Sort By</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="low-to-high">Price: Low to High</option>
        </select>
      </div>
      <div className="flex gap-6">
        <div className="w-1/4 p-4 bg-white shadow rounded-lg">
          <h3 className="font-bold text-lg">Filters</h3>
          {[
            { label: "Brands", state: "brands", options: ["PharmHub Pharmacy", "PharmHub Life", "PharmHub Sn"], setter: setBrandFilter },
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

        <div className="w-3/4 grid grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition">
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full h-40 object-contain cursor-pointer"
                onClick={() => navigate(`/homecare-page/${product.id}`)}
              />
              <h3 className="text-sm font-bold mt-2 truncate cursor-pointer" onClick={() => navigate(`/healthcare-page/${product.id}`)}>
                {product.product_name}
              </h3>
              <p className="text-green-600 font-bold">₹{(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
              <p className="line-through text-red-500">MRP ₹{product.price}</p>
              <p className="text-green-500">{product.discount}% off</p>
              <button 
  onClick={() => addToCart(product)}  // Pass product details
  className="mt-2 bg-green-900 text-white p-2 w-full rounded hover:bg-green-800"
>
  Add
</button>            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCareProduct;