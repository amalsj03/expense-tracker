import React from 'react';
import CustomPieChart from '../../charts/CustomPieChart';

const COLORS = ["#4F46E5", "#16A34A", "#DC2626"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", value: totalBalance },
    { name: "Total Expense", value: totalExpense },
    { name: "Total Income", value: totalIncome },
  ];

  return (
    <div className="card">
      <div>
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
