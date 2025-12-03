// helper.js

import moment from "moment";

/**
 * Validates basic email format: something@domain.tld
 * Returns true if valid, false otherwise.
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i<Math.min(words.length,2); i++){
    initials += words[i][0];
  }

  return initials.toUpperCase();

};


export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  
  // Add commas as thousands separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart 
    ? `${formattedInteger}.${fractionalPart}` 
    : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
   const sortedData = [...data].sort(
    (a, b) => new Date(a?.date) - new Date(b?.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("MMM YYYY"), // cleaner axis labels
    amount: Number(item?.amount) || 0, // ensure numeric
    source: item?.source || "Unknown",
  }));

  return chartData;
};


export const prepareIncomeBarCharDate = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a?.date) - new Date(b?.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("MMM YYYY"), // cleaner axis labels
    amount: Number(item?.amount) || 0, // ensure numeric
    source: item?.source || "Unknown",
  }));

  return chartData;
};

export const prepareExpenseLineCharDate = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a?.date) - new Date(b?.date)
  );

   const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"), // cleaner axis labels
    amount: Number(item?.amount) || 0, // ensure numeric
    category: item?.category,
  }));

  return chartData;
};
