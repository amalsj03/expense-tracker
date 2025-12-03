import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineCharDate } from "../../utils/helper";
import CustomLineChart from "../charts/CustomBarChart";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineCharDate(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card p-6 bg-white shadow-md rounded-2xl mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-xl font-semibold text-gray-800">
            Expense Overview
          </h5>
          <p className="text-sm text-gray-500">
            Track your spending trends over time and gain insights into where
            your money goes
          </p>
        </div>
        <button
          className="add-btn add-btn-fill flex items-center gap-2"
          onClick={onExpenseIncome} // ✅ FIXED here
        >
          <LuPlus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      {/* Chart */}
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
