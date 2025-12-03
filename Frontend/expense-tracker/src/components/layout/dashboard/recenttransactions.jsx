import React from "react";
import { IoMdDocument } from "react-icons/io";
import { LuArrowBigRight } from "react-icons/lu";

import TransactionInfoCard from "../cards/transactioninfocard"; // <-- Make sure this path is correct
import { FaMonument } from "react-icons/fa6";

const RecentTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button
          className="card-btn flex items-center gap-1 text-sm font-medium"
          onClick={onSeeMore}
        >
          See All <LuArrowBigRight className="text-base" />
        </button>
      </div>

      {/* Transactions */}
      <div className="mt-6 space-y-4">
        {transactions.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon || <IoMdDocument />} // fallback icon
            date={FaMonument(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
