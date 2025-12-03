import React from 'react'
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from 'react-icons/lu';

const transactioninfocard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
    const getAmountStyles = () => 
   type === "income" ? "text-green-600" : "text-red-600";


  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
      
      {/* Left side: Icon + details */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white group-hover:bg-blue-100 transition-colors duration-300">
          {icon ? (
            <img src={icon} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <LuUtensils className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />
          )}
        </div>

        <div>
          <p className="text-gray-700 font-semibold group-hover:text-blue-600">{title}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      {/* Right side: amount + delete */}
      <div className="flex items-center gap-4">
        {!hideDeleteBtn && (
          <button
            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
            onClick={onDelete}
          >
            <LuTrash2 size={18} />
          </button>
        )}

        <div className={`text-right ${getAmountStyles()}`}>
          <h6
            className={`font-semibold text-lg ${
              type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {type === 'income' ? '+' : '-'} ${amount}
          </h6>
          {type === 'income' ? (
            <LuTrendingUp className="text-green-600" />
          ) : (
            <LuTrendingDown className="text-red-600" />
          )}
        </div>
      </div>
    </div>
  );
};

export default transactioninfocard;
