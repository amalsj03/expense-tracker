import moment from "moment";
import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfocard from "../layout/cards/transactioninfocard";

const IncomeList = ({ transaction, onDelete, onDownload }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h5 className="text-xl font-semibold text-gray-800">Income Source</h5>
        <button
          className="card-btn flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition-all duration-200"
          onClick={onDownload}
        >
          <LuDownload className="text-lg" />
          <span>Download</span>
        </button>
      </div>

      {/* Income List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {transaction?.length > 0 ? (
          transaction.map((income) => (
            <TransactionInfocard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-6">
            <p className="text-gray-500 text-sm">No income records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
