import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../charts/CustomBarChart';
import { prepareIncomeBarCharDate } from '../../utils/helper';

const IncomeOverview = ({ transaction, onAddIncome }) => {
  const [charData, setCharData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarCharDate(transaction);
    setCharData(result); // ✅ update state
  }, [transaction]);

  return (
    <div className="card bg-white shadow-lg rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl font-semibold text-gray-800">Income Overview</h5>
          <p className="text-gray-500 text-sm">
            Track your earnings over time and analyze your income
          </p>
        </div>

        {/* Add Income Button */}
        <button className="add-btn" onClick={onAddIncome}> {/* ✅ hook up handler */}
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      {/* Chart Section */}
      <div className="mt-10">
        <CustomBarChart data={charData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
