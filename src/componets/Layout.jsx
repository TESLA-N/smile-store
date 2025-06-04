// src/components/Layout.jsx
import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import Navbar2 from "./Navbar2.jsx";
import Footer from "./Footer.jsx";
import AuthModal from "./AuthModal.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
  };

  const switchAuthMode = () => {
    setAuthMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="layout flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar onLoginClick={() => openAuthModal("login")} />
      <Navbar2 />

      {/* <Outlet /> */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <AuthModal
            mode={authMode}
            onClose={closeAuthModal}
            onSwitch={switchAuthMode}
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
