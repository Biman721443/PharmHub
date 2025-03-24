import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">PharmHub</h2>
          <p className="text-sm">
            Your trusted online pharmacy delivering medicines and healthcare essentials to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/medicine" className="hover:text-green-400">Medicines</Link></li>
            <li><Link to="/lab-tests" className="hover:text-green-400">Lab Tests</Link></li>
            <li><Link to="/doctor-consult" className="hover:text-green-400">Doctor Consultation</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-400"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-green-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-green-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-green-400"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-sm mb-2">Get the latest health tips and offers.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md border-none outline-none"
            />
            <button className="bg-green-500 px-4 py-2 rounded-r-md text-white hover:bg-green-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm text-gray-400 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} PharmEasy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
