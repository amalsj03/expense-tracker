import React from "react";
import { getInitials } from "../../../utils/helper";

const CharAvatar = ({ fullName, width, height, className }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold
        ${width || "w-12"} ${height || "h-12"} ${className || ""}`}
    >
      {getInitials(fullName)}
    </div>
  );
};

export default CharAvatar;
