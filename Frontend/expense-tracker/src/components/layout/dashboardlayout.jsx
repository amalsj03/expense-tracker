
import React, { useContext } from "react";
import { UserContext } from "../../context/usercontext";
import Navbar from "../layout/navbar"; // adjust path
import SideMenu from "../layout/sidemenu"; // adjust path

const DashboardLayout = ({activeMenu,children}) => {
    const {user} =useContext(UserContext)
  return (
    <div className="">
      {/* Navbar */}
      <Navbar activeMenu={activeMenu} />

      {/* Main content */}
      {user && (
        <div className="flex">
          
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

         
          <div className="flex-1 p-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

 