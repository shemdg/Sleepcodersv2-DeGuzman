import React, { useState } from "react";
import useAxiosLogout from "../../hooks/useAxiosLogout";
import { IoLogOutOutline } from "react-icons/io5";

export const Navbar = () => {
  const [shouldLogout, setShouldLogout] = useState(false);

  // Trigger logout when the user clicks "Logout"
  const handleLogout = (e) => {
    e.preventDefault();
    setShouldLogout(true); // Set the flag to true to trigger useEffect in useAxiosLogout
  };

  useAxiosLogout(shouldLogout); // Call the custom hook

  return (
    <>
      <div className="bg-[transparent]  z-50 backdrop-blur-xl fixed text-white  top-0 w-full">
        <nav className="p-1 mx-8">
          <div className="flex items-center justify-between">
            <img
              src="../logo_image/bini logo.png"
              className="object-cover h-16 w-16"
              alt="BINI Logo"
            />
            <a href="#" className="text-2xl font-bold" onClick={handleLogout}>
              <IoLogOutOutline />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
