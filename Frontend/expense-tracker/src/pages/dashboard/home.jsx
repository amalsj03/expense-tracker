import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardlayout";
import { useUserAuth } from "../../hooks/useuserauth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apipath"; // make sure this exists



import { LuHandCoins,LuWalletMinimal } from "react-icons/lu";
import {IoMdCard} from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import InfoCard from "../../components/layout/cards/infocard";
import RecentTransactions from "../../components/layout/dashboard/recenttransactions";
import FinanceOverview from "../../components/layout/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/layout/dashboard/ExpenseTransactions";
import Last30DaysExpensive from "../../components/layout/dashboard/last30DaysExpensive";
import RecentIncomeWithChart from "../../components/layout/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/layout/dashboard/RecentIncome";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {
      // cleanup if needed
    };
  }, []);

  return (
    <DashboardLayout activeMenu = "Dashboard">
       <div className='my=5 mx=auto'>
        <div className="grid=grid"> 
        <InfoCard
  icon={<IoMdCard />}
  label="Total Balance"
  value={addThousandsSeparator(dashboardData?.totalBalance)}
  color="bg-primary"
/>
<InfoCard
  icon={<LuWalletMinimal />}
  label="Total Income"
  value={addThousandsSeparator(dashboardData?.totalIncome)}
  color="bg-orange-500"
/>
<InfoCard
  icon={<LuHandCoins />}
  label="Total Expense"
  value={addThousandsSeparator(dashboardData?.totalExpense)}
  color="bg-red-500"
/>


        </div>
        <div className="grid-grid">
          <RecentTransactions
           transactions={dashboardData?.RecentTransactions}
           onSeeMore={() => navigate("/expense")}
           />
           <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
            />

            <ExpenseTransactions
  transactions={dashboardData?.last30DaysExpenses?.transactions || []}
  onSeeMore={() => navigate("/expense")}
/>

<Last30DaysExpensive
  data={dashboardData?.last30DaysExpenses?.transactions || []}
  />


  <RecentIncomeWithChart
    data={dashboardData?.Last60DaysExpensive?.transactions?.slice(0,4) || []}
    totalIncome={dashboardData?.totalIncome || 0}
    />

    <RecentIncome
  transactions={dashboardData?.last60DaysIncome?.transactions || []}
  
  onSeeMore={() => navigate("/income")}
/>

        </div>
        transactions
       </div>
        </DashboardLayout>
  );
};

export default Home;
