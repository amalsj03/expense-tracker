import React from 'react'
import { FaMonument } from 'react-icons/fa6';
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../cards/transactioninfocard';
import moment from 'moment';

const ExpenseTransactions = ({ onSeeMore, transactions }) => {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-800">Expense</h5>
        <button
          className="flex items-center gap-1 font-bold text-black"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className='mt-6 flex flex-col gap-3 max-h-64 overflow-y-auto'>
        {transactions?.slice(0, 4)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon || FaMonument}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expensive"
            hideDeleteBtn
          />
        ))}
        {transactions?.length === 0 && (
          <p className="text-gray-500 text-sm">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
