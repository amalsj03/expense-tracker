import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data = [] }) => {
  // debug help: make sure data is an array of objects with month & amount
  // Example: [{ month: "Jan", amount: 120 }, { month: "Feb", amount: 80 }]
  console.log("chart data:", data);

  const getBarColor = (index) => {
    return index % 2 === 0 ? "#857cf5" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-3 border border-gray-200 w-48">
          <p className="text-xs font-semibold text-purple-700 mb-1">
            {payload[0].payload.category || payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600 flex items-center justify-between">
            <span className="text-gray-500">Amount:</span>
            <span className="text-gray-900 font-bold ml-2">
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6 p-4 rounded-xl shadow-sm">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} />
          <Tooltip content={<CustomTooltip />} />

          {/* Default fill so bars appear even if Cell mapping fails */}
          <Bar
            dataKey="amount"
            radius={[8, 8, 0, 0]}
            fill="#857cf5"
            fillOpacity={1}
            stroke="#6f63e8"
            strokeWidth={0.5}
            minPointSize={2} // makes very small values still visible
          >
            {data.map((entry, index) => (
              // use a stable unique key (month or index)
              <Cell
                key={`cell-${entry.month ?? index}`}
                fill={getBarColor(index)}
                fillOpacity={1}
                stroke={getBarColor(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
