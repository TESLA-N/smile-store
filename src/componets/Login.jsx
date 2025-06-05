// import React, { useState } from "react";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const LoginTab = ({ onClose, onSwitch,refreshUser  }) => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   const userData = {
//     email: emailOrPhone,
//     password,
//   };

//   try {
//     const response = await fetch("http://localhost:4000/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Login failed:", data.message);
//       alert(data.message || "Login failed");
//     } else {
//       console.log("Login successful:", data);
//       alert("Login successful");

//       if (refreshUser) {
//     await refreshUser();
//   }

//   onClose();

//     }
//   } catch (err) {
//     console.error("Error:", err.message);
//     alert("Server error");
//   }
// };

//   return (
//     <div className="bg-white p-8 rounded-xl shadow-2xl w-[400px] relative">
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
//       >
//         ✖
//       </button>

//       <div className="flex justify-center mb-6">
//         <img src="/smilestorelogo.png" alt="Login Logo" className="h-14 object-contain" />
//       </div>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Email "
//           value={emailOrPhone}
//           onChange={(e) => setEmailOrPhone(e.target.value)}
//           className="w-full p-3 text-black border rounded-lg mb-4 outline-none text-lg"
//         />

//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 text-black border rounded-lg mb-4 outline-none text-lg pr-10"
//           />
//           {/* Always show this eye icon */}
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3 text-gray-600 hover:text-black"
//           >
//             <VisibilityIcon />
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>

//       <p className="text-center mt-5 text-gray-600 text-lg">
//         New to Smile-Store?{" "}
//         <span onClick={onSwitch} className="text-blue-500 cursor-pointer hover:underline">
//           Create an account
//         </span>
//       </p>
//     </div>
//   );
// };

// export default LoginTab;
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const LoginTab = ({ onClose, onSwitch, refreshUser }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: emailOrPhone,
      password,
    };

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Login failed:", data.message);
        alert(data.message || "Login failed");
      } else {
        alert("Login successful");
        if (refreshUser) await refreshUser();
        onClose();
      }
    } catch (err) {
      console.error("Error:", err.message);
      alert("Server error");
    }
  };

  return (
    // <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] mx-auto relative">
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-[90%] max-w-[400px] md:max-w-[500px] mx-auto relative">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
      >
        ✖
      </button>

      <div className="flex justify-center mb-6">
        <img src="/smilestorelogo.png" alt="Login Logo" className="h-12 sm:h-14 object-contain" />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          className="w-full p-3 text-black border rounded-lg mb-4 outline-none text-base sm:text-lg"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-black border rounded-lg mb-4 outline-none text-base sm:text-lg pr-10"
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
          className="w-full bg-blue-600 text-white p-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-5 text-gray-600 text-sm sm:text-lg">
        New to Smile-Store?{" "}
        <span onClick={onSwitch} className="text-blue-500 cursor-pointer hover:underline">
          Create an account
        </span>
      </p>
    </div>
  );
};

export default LoginTab;
