import React, { useState, useEffect } from "react";
import LoginTab from "./Login";
import SignInTab from "./sign";

const AuthModal = ({ onClose, refreshUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Lock background scroll when modal opens
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md mx-auto">
        {isLogin ? (
          <LoginTab
            onClose={onClose}
            onSwitch={() => setIsLogin(false)}
            refreshUser={refreshUser}
          />
        ) : (
          <SignInTab
            onClose={onClose}
            onSwitch={() => setIsLogin(true)}
            refreshUser={refreshUser}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
