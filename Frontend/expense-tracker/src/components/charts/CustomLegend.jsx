import React from 'react'

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          {/* Color box */}
          <div
            className="w-4 h-4 rounded-full shadow-md"
            style={{ backgroundColor: entry.color }}
          ></div>

          {/* Label */}
          <span className="text-sm font-medium text-gray-700">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend

