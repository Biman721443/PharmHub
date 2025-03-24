import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import { AuthProvider } from "./context/AuthContext"; // ✅ Import CartProvider
// ✅ Import CartProvider
import MainComponent from './components/Navbar';
import Home from './pages/Home';
import LabTestsPage from "./pages/LabTestsPage";
import HealthBlogsPage from "./pages/HealthBlogsPage";
import HealthCarePage from './pages/HealthCarePage';
import PrescriptionUpload from './pages/PrescriptionUpload';
import PrescriptionMedicine from './pages/PrescriptionMedicine';
import Footer from './pages/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import HealthCareProduct from './pages/HealthCareProduct';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import HomeCarePage from './pages/HomeCarePage';
import HomeCareProduct from './pages/HomeCareProduct';
import MedicineProduct from './pages/MedicineProduct';
import MedicineProductPage from './pages/MedicineProductPage';
import DoctorConsult from './pages/DoctorPage';
import OfferPage from './pages/OfferPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <div className="flex flex-col min-h-screen"> {/* Ensures footer stays at bottom */}
        <MainComponent />
        <div className="flex-grow"> {/* Allows main content to push footer down */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/lab-tests" element={<LabTestsPage />} />
            <Route path="/healthcare-page/:productId" element={<HealthCarePage />} />
            <Route path="/health-blogs" element={<HealthBlogsPage />} />
            <Route path="/homecare-page/:productId" element={<HomeCarePage/>} />

            {/* <Route path="/" element={<SearchBar/>} /> */}
            <Route path="/products" element={<ProductPage />} />

            <Route path="/prescription-upload" element={<PrescriptionUpload />} />
            <Route path="/prescription-medicine" element={<PrescriptionMedicine />} />
            <Route path="/healthcare-products" element={<HealthCareProduct/>} /> 
            <Route path="/homecare-product" element={<HomeCareProduct/>} />
            <Route path="/medicine-product" element={<MedicineProduct/>} />
            <Route path="/medicine-page/:productId" element={<MedicineProductPage />} />
            <Route path="/doctor-consult" element={<DoctorConsult/>} />
            <Route path="/plus" element={<OfferPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />



          </Routes>
        </div>
        <Footer />
      </div>
    </CartProvider>
      </AuthProvider>
  );
}

export default App;
