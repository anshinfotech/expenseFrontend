import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { getAllIncomeAction } from "../../Redux/actions/income";
import { getAllExpenseAction } from "../../Redux/actions/expense";
import moment from "moment";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Calendar, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';

function Dashboard() {
  const [incomeArray, setIncomeArray] = useState([]);
  const [originalIA, setOriginalIA] = useState([]);
  const [expenseArray, setExpenseArray] = useState([]);
  const [originalEA, setOriginalEA] = useState([]);
  const [totalIncome, setTotalIncome] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const incomes = useSelector((state) => state.IncomeGS.incomes);
  const expenses = useSelector((state) => state.ExpenseGS.expenses);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIncomeAction());
    dispatch(getAllExpenseAction());
  }, []);

  useEffect(() => {
    let dynArr = new Array();
    incomes?.forEach((item) => {
      dynArr = [...dynArr, ...item.EMIs];
    });
    setIncomeArray(dynArr);
    setOriginalIA(dynArr);
  }, [incomes]);

  useEffect(() => {
    setExpenseArray(expenses);
    setOriginalEA(expenses);
  }, [expenses]);

  useEffect(() => {
    let totalIn = 0;
    if (incomeArray) {
      let totalEmi = incomeArray.reduce((acc, curIndex) => {
        return acc + curIndex.installment;
      }, 0);
      totalIn += totalEmi;
    }
    setTotalIncome(totalIn);
  }, [incomeArray]);

  useEffect(() => {
    if (expenseArray) {
      let totalEx = expenseArray.reduce((acc, curIndex) => {
        return acc + curIndex.expense;
      }, 0);
      setTotalExpense(totalEx);
    }
  }, [expenseArray]);

  const handleButtonClick = () => {
    if(startDateFilter > endDateFilter){
      return alert("Starting Date cannot be greater than ending date")
    }
    
    if(moment(endDateFilter).format('DD/MM/YYYY') > moment(Date.now()).format('DD/MM/YYYY') || moment(startDateFilter).format('DD/MM/YYYY') > moment(Date.now()).format("DD/MM/YYYY")){
      return alert("Date selected is Invalid! You cannot select a future date")
    }

    const filterIcData = originalIA.filter((data) => {
      const dateFil =
        startDateFilter && endDateFilter
          ? moment(data.installmentDate).format("DD/MM/YYYY") >=
              moment(startDateFilter).format("DD/MM/YYYY") &&
            moment(data.installmentDate).format("DD/MM/YYYY") <=
              moment(endDateFilter).format("DD/MM/YYYY")
          : true;

      return dateFil;
    });

    const filterExData = originalEA.filter((data) => {
      const dateFil =
        startDateFilter && endDateFilter
          ? moment(data.paymentDate).format("DD/MM/YYYY") >=
              moment(startDateFilter).format("DD/MM/YYYY") &&
            moment(data.paymentDate).format("DD/MM/YYYY") <=
              moment(endDateFilter).format("DD/MM/YYYY")
          : true;

      return dateFil;
    });

    setExpenseArray(filterExData);
    setIncomeArray(filterIcData);
  };

  // Prepare chart data
  const pieData = [
    { name: 'Income', value: totalIncome, color: '#10B981' },
    { name: 'Expenses', value: totalExpense, color: '#EF4444' }
  ];

  const barData = [
    {
      name: 'Financial Overview',
      Income: totalIncome,
      Expenses: totalExpense,
      Balance: totalIncome - totalExpense
    }
  ];

  const formatCurrency = (amount) => {
    return `Rs.${amount.toLocaleString('en-IN')}/-`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-xl">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-semibold" style={{ color: entry.color }}>
                {entry.name}: {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Sidebar />
      <div className="w-100 h-screen overflow-y-scroll ps-96 pe-24 pt-5 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">Financial Overview & Analytics</p>
          </div>
          
          {/* Date Filter Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex gap-6 items-end">
              <div className="flex flex-col gap-2">
                <label htmlFor="startdate" className="text-sm font-medium text-gray-700">Starting Date</label>
                <input
                  id="startdate"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  type="date"
                  className="px-4 py-2 bg-white/80 border border-gray-200 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="enddate" className="text-sm font-medium text-gray-700">Ending Date</label>
                <input
                  id="enddate"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  type="date"
                  className="px-4 py-2 bg-white/80 border border-gray-200 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                />
              </div>
              <button
                onClick={handleButtonClick}
                className="px-6 py-2 rounded-xl text-white font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>

        {/* Rich Dad Poor Dad Quote */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="text-4xl opacity-50">"</div>
            <div>
              <p className="text-lg font-medium italic mb-2">
                "The rich don't work for money. They make money work for them."
              </p>
              <p className="text-sm opacity-90">- Robert Kiyosaki, Rich Dad Poor Dad</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Income Card */}
          <div className="bg-emerald-50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Income</h3>
              <p className="text-3xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</p>
            </div>
          </div>

          {/* Total Expenses Card */}
          <div className="bg-red-50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Expenses</h3>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpense)}</p>
            </div>
          </div>

          {/* Profit/Loss Card */}
          <div className={`${totalIncome > totalExpense ? 'bg-green-50' : 'bg-red-50'} backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${totalIncome > totalExpense ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} shadow-lg`}>
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Net Balance</h3>
              <p className={`text-3xl font-bold ${totalIncome > totalExpense ? 'text-green-600' : 'text-red-600'}`}>
                {totalIncome > totalExpense ? (
                  <span>
                    Rs.(+{(totalIncome - totalExpense).toLocaleString('en-IN')})/-
                  </span>
                ) : (
                  <span>
                    Rs.(-{(totalExpense - totalIncome).toLocaleString('en-IN')})/-
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Financial Analytics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <PieChartIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-semibold text-gray-800">Income vs Expenses</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-semibold text-gray-800">Financial Comparison</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.5} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      tickFormatter={(value) => `Rs.${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="Income" 
                      fill="#10B981" 
                      radius={[4, 4, 0, 0]}
                      name="Income"
                    />
                    <Bar 
                      dataKey="Expenses" 
                      fill="#EF4444" 
                      radius={[4, 4, 0, 0]}
                      name="Expenses"
                    />
                    <Bar 
                      dataKey="Balance" 
                      fill={totalIncome > totalExpense ? "#059669" : "#DC2626"} 
                      radius={[4, 4, 0, 0]}
                      name="Net Balance"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <Link
              to="/admin/finance_management/add_income"
              className="px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add Income
            </Link>
            <Link
              to="/admin/finance_management/add_expense"
              className="px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add Expense
            </Link>
            <Link
              to="/admin/finance_management/view_expenses"
              className="px-6 py-3 rounded-xl text-gray-700 font-bold bg-white hover:bg-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;