import moment from "moment";
import React from "react";
import { LuArrowBigRight } from "react-icons/lu";
import Transactioninfocard from "../cards/transactioninfocard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h5 className="text-lg font-semibold text-gray-800">Income</h5>

        {/* Button aligned to right */}
        <button
          className="card-btn flex items-center gap-1 font-bold text-black"
          onClick={onSeeMore}
        >
          See All <LuArrowBigRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
       {transactions?.slice(0, 5)?.map((item) => (
  <Transactioninfocard
    key={item._id || item.id} // fallback for _id if from MongoDB
    title={item.source}
    icon={item.icon}
    date={moment(item.date).format("Do MMM YYYY")}
    amount={item.amount}
    type="income"
    hideDeleteBtn
  />
))}

      </div>
    </div>
  );
};

export default RecentIncome;
