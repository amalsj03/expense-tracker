import React, { useState } from "react";
import Input from "../layout/inputs/input";
import EmojiPickerPopup from "../layout/EmojiPickerPopup";
import { toast } from "react-hot-toast";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  const handleSubmit = () => {
    if (!income.source.trim()) {
      toast.error("Income source is required");
      return;
    }
    if (!income.amount || isNaN(income.amount) || Number(income.amount) <= 0) {
      toast.error("Amount must be a number greater than 0");
      return;
    }
    if (!income.date) {
      toast.error("Please select a date");
      return;
    }

    // Call parent handler with cleaned values
    onAddIncome({
      ...income,
      amount: Number(income.amount),
    });

    // Reset form
    setIncome({
      source: "",
      amount: "",
      date: "",
      icon: "",
    });
  };

  return (
    <div className="space-y-4">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
