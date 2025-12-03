import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/usercontext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "./cards/charavatar"; // ✅ Capitalized import

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate(); 

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogOut();
      return;
    }
    navigate(route);
  };

  const handleLogOut = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 h-full p-4 w-64">
      {/* User Info */}
      <div className="flex flex-col items-center mb-6">
        {user?.profileImageUrl ? (   // ✅ if image exists → show image
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2"
          />
        ) : (                       // ✅ otherwise show initials avatar
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        
        <h5 className="text-lg font-semibold text-black">{user?.fullName || ""}</h5>
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.path)}
          className={`flex items-center w-full px-3 py-2 mb-2 rounded hover:bg-indigo-900 text-black ${
            activeMenu === item.label ? "bg-indigo-200 font-bold" : ""
          }`}
        >
          <item.icon className="mr-2 text-xl text-black" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
