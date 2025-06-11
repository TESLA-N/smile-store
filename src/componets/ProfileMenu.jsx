import React, { useState } from "react";

const ProfileMenu = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("http://localhost:4000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <div className="relative">
      <img
        src={user.profilePic}
        alt="profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md p-3 z-50">
          <p className="font-semibold">{user.name}</p>
          <button
            onClick={logout}
            className="text-red-500 mt-2 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
