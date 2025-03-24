import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from "react";
import registerBanner from "../assets/register.jpg"; // Add a suitable register banner image

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // Redirect to Login after successful registration
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side - Banner Image */}
        <div className="hidden md:block w-1/2">
          <img src={registerBanner} alt="Register Banner" className="w-full h-full object-cover" />
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-[oklch(0.925_0.084_155.995)]">
          <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">Join Us!</h2>
          <p className="text-gray-500 text-center mb-4">Create an account to continue</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <span onClick={() => navigate("/login")} className="text-blue-500 font-medium cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
