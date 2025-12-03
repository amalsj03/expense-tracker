import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../../utils/helper';
import CustomBarChart from '../../charts/CustomBarChart';

const Last30DaysExpensive = ({ data = [] }) => { // make sure data is passed as prop
  const [charData, setCharData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setCharData(result);

    // optional cleanup
    return () => {};
  }, [data]); // ✅ dependency array is correctly placed

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="mb-4">
        <h5 className="text-lg font-semibold text-gray-800">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={charData} />
    </div>
  )
}

export default Last30DaysExpensive
