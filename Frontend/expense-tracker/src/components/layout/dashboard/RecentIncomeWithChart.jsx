import React, { useEffect, useState } from "react";
import CustomPieChart from "../../charts/CustomPieChart";

const COLORS = [
  "#8884d8", // Purple
  "#82ca9d", // Green
  "#ffc658", // Yellow
  "#ff8042", // Orange
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]); // ✅ renamed to chartData

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      value: item?.amount,
    }));
    console.log(dataArr, data, "FROM MEE")
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800">
          Last 60 Days Income
        </h5>
      </div>

      <CustomPieChart
        data={chartData} // ✅ corrected
        label="Total Income"
        totalAmount={`$${totalIncome}`} // ✅ fixed template string
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
