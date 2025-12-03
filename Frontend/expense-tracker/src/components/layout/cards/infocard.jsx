import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 min-w-[220px] max-w-[300px] h-28">
      
      {/* Icon Circle */}
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl ${color} shadow-md`}
      >
        {icon}
      </div>
      
      {/* Text Container */}
      <div className="flex flex-col justify-center">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <span className="text-gray-900 text-xl font-bold">{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
