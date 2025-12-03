import React from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-2">
        <p className="text-sm font-semibold text-gray-800 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="font-bold text-blue-600">
            ${payload[0].value}
          </span>
        </p>
      </div>
    )
  }
  return null
}

export default CustomTooltip
