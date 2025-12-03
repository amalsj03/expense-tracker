import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./sidemenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-indigo-600 text-white">
      {/* Toggle Button */}
      <button
        onClick={() => setOpenSideMenu(!openSideMenu)}
        className="text-2xl"
      >
        {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      {/* Title */}
      <h2 className="text-lg font-bold">Expense Tracker</h2>

      {/* Sidebar */}
      {openSideMenu && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
