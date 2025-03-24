import { FaSearch, FaShoppingCart, FaUser, FaUpload } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import logo from "../assets/logo.png";
import { auth } from "../firebaseConfig";
import { useCart } from "../context/CartContext"; // Import CartContext
import ScerchBar from "../pages/ScerchBar";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartItems, cartCount, clearCart } = useCart() || { cartItems: [], cartCount: 0, clearCart: () => {} }; // Prevent undefined error
  

  const handleProfileClick = () => {
    setDropdownOpen(false); // Close the dropdown
    navigate("/profile"); // Navigate to the profile page
  };
  // Fetch user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        clearCart(); // Clear the cart if the user is not logged in
      }
    });
    return () => unsubscribe();
  }, [clearCart]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDropdownOpen(false);
      clearCart(); // Clear the cart on logout
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  // Handle cart click
  const handleCartClick = () => {
    if (!user) {
      navigate("/login"); // Redirect to login page if the user is not logged in
    } else {
      navigate("/cart"); // Navigate to the cart page if the user is logged in
    }
  };

  return (
    <div className="shadow-md bg-white px-6 py-3 flex justify-center fixed top-0 left-0 w-full z-50">
      <div className="w-full max-w-7xl flex flex-wrap md:flex-nowrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/home" className="flex items-center">
            <img src={logo} alt="PharmHub Logo" className="h-14 w-auto cursor-pointer" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-700 tracking-tight drop-shadow-md">
              Pharm<span className="text-green-500">Hub</span>
            </h2>
          </Link>
        </div>

        {/* Search Bar */}
        <ScerchBar />

        {/* Icons */}
        <div className="flex items-center space-x-6 mt-3 md:mt-0">
          {user ? (
            <div className="relative dropdown-container">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 focus:outline-none"
              >
                <FaUser size={18} />
                <span className="hidden md:block text-sm cursor-pointer">Profile</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-36 py-2">
                  <button
        onClick={handleProfileClick}
        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Profile
      </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-1 text-gray-700">
              <FaUser size={18} />
              <span className="hidden md:block text-sm cursor-pointer">Hello, Log in</span>
            </Link>
          )}
          <button
            onClick={handleCartClick}
            className="relative flex items-center space-x-1 text-gray-700"
          >
            <FaShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUploadRedirect = () => {
    setTimeout(() => {
      navigate("/prescription-upload");
    }, 1000);
  };

  return (
    <nav className="shadow bg-white px-6 py-3 flex justify-center fixed top-[74px] left-6 w-full z-10">
      <div className="w-full max-w-4xl">
        {/* Mobile Menu Button */}
        <div className="flex justify-between items-center md:hidden">
          <button className="text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`mt-2 md:flex justify-center space-x-6 text-gray-600 font-medium text-sm transition-all duration-300 ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <Link to="/medicine-product" className="hover:text-gray-900">Medicine</Link>
          <Link to="/homecare-product" className="hover:text-gray-900">Homecare</Link>
          <Link to="/doctor-consult" className="hover:text-gray-900">Doctor Consult</Link>
          <Link to="/healthcare-products" className="hover:text-gray-900">Skincare</Link>
          <Link to="/health-blogs" className="hover:text-gray-900">Health Blogs</Link>

          {/* Upload Prescription Button */}
          <button
            onClick={handleUploadRedirect}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ml-4"
          >
            <FaUpload size={16} />
            <span>Upload Prescription</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const MainComponent = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="mt-[120px]">
        {/* This margin ensures content is pushed below the fixed navbar */}
      </div>
    </>
  );
};

export default MainComponent;