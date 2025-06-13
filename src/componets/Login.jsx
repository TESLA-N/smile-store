import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Login = ({ onClose, onSwitch, onSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onSuccess(); // call refreshUser and close modal
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <CircularProgress style={{ color: '#2563eb' }} size={50} />
        </div>
      )}

      {/* Login Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-100 rounded-xl shadow-xl p-6 w-[90%] sm:w-[26rem] relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-black"
          >
            ×
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/smilestorelogo.png"
              alt="Smile Store"
              className="h-12"
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-900 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 px-4 py-2 text-gray-900 rounded-md outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-900 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 px-4 py-2 text-gray-900 rounded-md outline-none bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
            >
              Login
            </button>
          </form>

          {/* Switch to Signup */}
          <p className="text-center text-sm text-gray-700 mt-5">
            New to <span className="font-medium text-blue-600">Smile Store</span>?{" "}
            <span
              onClick={onSwitch}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Signup here
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
