import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const SignInTab = ({ onClose, onSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // 👈 password visibility

 const handleSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    name,
    email,
    password,
    // profileImage is not being sent yet
  };

  try {
    const response = await fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Registration failed:", data.message);
      alert(data.message || "Registration failed");
    } else {
      console.log("Registration successful:", data);
      alert("Registration successful");

      if (props.refreshUser) {
        await props.refreshUser(); // ✅ update navbar state
      }

      props.onClose(); // ✅ close modal only once
    }
  } catch (err) {
    console.error("Error:", err.message);
    alert("Server error");
  }
};


  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-[400px] relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
      >
        ✖
      </button>

      <div className="flex justify-center mb-4">
        <img src="/smilestorelogo.png" alt="Login Logo" className="h-14 object-contain" />
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-3xl text-white font-bold overflow-hidden relative">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            name.charAt(0).toUpperCase()
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 text-black border rounded-lg mb-4 outline-none text-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 text-black border rounded-lg mb-4 outline-none text-lg"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-black border rounded-lg mb-4 outline-none text-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-600 hover:text-black"
          >
            <VisibilityIcon />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mt-5 text-gray-600 text-lg">
        Already have an account?{" "}
        <span onClick={onSwitch} className="text-blue-500 cursor-pointer hover:underline">
          Login here
        </span>
      </p>
    </div>
  );
};

export default SignInTab;
