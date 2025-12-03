import React from 'react';
import Imagecard from '../../assets/images/Imagecard.png';
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left/main panel */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12 bg-white">
        <h2 className="text-lg font-medium text-black mb-6">Expense Tracker</h2>
        {children}
      </div>

      {/* Right decorative panel */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Decorative shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-8" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

        {/* Stats card */}
        <div className="relative z-30 max-w-sm">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expense"
            value="43,0000"
            color="bg-purple-600"
          />
        </div>

        {/* Illustration image (below card) */}
        <img
          src={Imagecard}
          alt="Dashboard preview"
          className="absolute bottom-10 right-8 w-64 lg:w-[90%] rounded-xl shadow-xl object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
      {/* Icon container */}
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full shadow-xl`}
      >
        {icon}
      </div>

      {/* Text container */}
      <div className="flex flex-col">
        <h6 className="text-sm font-medium text-gray-600">{label}</h6>
        <span className="text-lg font-semibold text-gray-900">${value}</span>
      </div>
    </div>
  );
};
