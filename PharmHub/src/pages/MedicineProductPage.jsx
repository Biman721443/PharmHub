import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTruck, FaTag, FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MedicineProductPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/medecine.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const productsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          const foundProduct = productsArray.find((p) => String(p.id) === String(productId));
          setProduct(foundProduct);
        }
      })
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!product) return <div className="flex justify-center items-center h-screen">Product not found!</div>;

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
    <div className="max-w-7xl mx-auto p-6">
      {/* Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Image Carousel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-2xl">
          <Slider {...sliderSettings}>
            {product.images?.map((img, index) => (
              <div key={index} className="relative h-96">
                <img
                  src={img}
                  alt={product.product_name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Middle Section: Product Details */}
        <div className="lg:col-span-1 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.product_name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-5 h-5" />
              ))}
            </div>
            <span className="text-gray-500">({product.rating} Reviews)</span>
          </div>
          <p className="text-gray-700 text-lg">{product.description}</p>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-semibold">Composition:</span> {product.composition}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Manufacturer:</span> {product.manufacturer}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Consume Type:</span> {product.consume_type}
            </p>
            <p className="text-red-500 font-semibold">Return Policy: {product.return_policy}</p>
            <p className="text-gray-600 font-semibold">Expires: {product.expiry_date}</p>
          </div>
        </div>

        {/* Right Section: Pricing & Actions */}
        <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-2xl">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold text-green-600">
                ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
              </p>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="text-2xl text-red-500 hover:text-red-600 transition-all"
              >
                <FaHeart className={isFavorite ? "fill-current" : "fill-transparent stroke-current"} />
              </button>
            </div>
            <p className="line-through text-red-500">MRP ₹{product.price}</p>
            <p className="text-green-500 flex items-center gap-1">
              <FaTag /> {product.discount}% off
            </p>
            <p className="text-gray-500">(Inclusive of all Taxes)</p>
            <p className="text-yellow-500 flex items-center gap-1">
              <FaTruck /> Free Delivery
            </p>
            <button
              className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => addToCart(product)}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="mt-12 bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Quantity Available:</span> {product.quantity}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Skin Type:</span> {product.skin_type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicineProductPage;