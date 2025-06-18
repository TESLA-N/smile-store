import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = ({ onClose, onSwitch, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "", // added
  });

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePic(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("address", form.address); // added
      if (profilePic) formData.append("profilePic", profilePic);

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/register`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        onSuccess();
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <CircularProgress style={{ color: "#2563eb" }} size={50} />
        </div>
      )}

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-100 rounded-xl shadow-xl px-6 py-8 w-[92%] sm:w-[24rem] relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
          >
            ×
          </button>

          <div className="flex justify-center mb-3">
            <img src="/smilestorelogo.png" alt="Smile Store" className="h-12" />
          </div>

          <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">
            Create Account
          </h2>

          <div className="flex justify-center mb-4">
            <label className="relative w-16 h-16">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400">
                {profilePic ? (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">Add Photo</span>
                )}
              </div>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 px-3 py-2 rounded-md text-gray-900 text-sm focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 px-3 py-2 rounded-md text-gray-900 text-sm focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 px-3 py-2 rounded-md text-gray-900 text-sm focus:outline-none"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 px-3 py-2 rounded-md text-gray-900 text-sm focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md text-sm"
              disabled={loading}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-4">
            Already a user?{" "}
            <span
              onClick={onSwitch}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
