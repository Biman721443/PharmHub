import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from "react";
import loginBanner from "../assets/login.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [emailExists, setEmailExists] = useState(false); 
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before login

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to Home after successful login
      
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setEmailExists(false);
        setError("Email not registered. Register now?");
      } else if (error.code === "auth/wrong-password") {
        setEmailExists(true);
        setError("Incorrect password. Try again!");
      } else {
        setError("please fill properly !");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side - Banner Image */}
        <div className="hidden md:block w-1/2">
          <img src={loginBanner} alt="Login Banner" className="w-full h-full object-cover" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">Welcome Back!</h2>
          <p className="text-gray-500 text-center mb-4">Login to continue</p>

          {/* Error Message Alert */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-md flex justify-between items-center">
              <p>
                {error}{" "}
                {error === "Email not registered. Register now?" && (
                  <span
                    onClick={() => navigate("/register")}
                    className="text-blue-600 cursor-pointer font-semibold hover:underline"
                  >
                    Register Here
                  </span>
                )}
              </p>
              <button onClick={() => setError("")} className="text-red-500 font-bold text-xl px-2">
                ✖
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            New user?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-500 font-medium cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
