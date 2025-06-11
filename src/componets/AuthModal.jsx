import React, { useState, useEffect } from "react";
import LoginTab from "./Login.jsx";
import SignInTab from "./SignUp.jsx";

const AuthModal = ({ onClose, refreshUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ✅ Call refreshUser and close modal
  const handleSuccess = () => {
    refreshUser(); // updates navbar/profile picture
    onClose();     // closes modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md mx-auto">
        {isLogin ? (
          <LoginTab
            onClose={onClose}
            onSwitch={() => setIsLogin(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <SignInTab
            onClose={onClose}
            onSwitch={() => setIsLogin(true)}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
