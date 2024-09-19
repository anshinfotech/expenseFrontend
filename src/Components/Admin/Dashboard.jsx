import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { getAllIncomeAction } from "../../Redux/actions/income";
import { getAllExpenseAction } from "../../Redux/actions/expense";
import Chart from "./Chart";
import moment from "moment";

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

  return (
    <>
      <Sidebar />
      <div className="w-100 h-screen overflow-y-scroll ps-96 pe-24 pt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>
          <div className="filter flex gap-10 items-center">
            <div className="flex flex-col gap-2">
              <label htmlFor="startdate">Starting Date : </label>
              <input
                id="startdate"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                type="date"
                className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="startdate">Ending Date : </label>
              <input
                id="startdate"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                type="date"
                className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
              />
            </div>
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-slate-900 rounded-md font-medium text-white text-xl active:bg-slate-600"
            >
              Calculate
            </button>
          </div>
        </div>

        <div className="w-full flex justify-between mt-20">
          <div className="w-44 h-44 bg-white border border-black flex flex-col justify-center gap-5 items-center">
            <p className="text-xl">Total Income</p>
            <p className="text-2xl text-green-700">Rs.{totalIncome}/-</p>
          </div>
          <div className="w-44 h-44 bg-white border border-black flex flex-col justify-center gap-5 items-center">
            <p className="text-xl">Total Expenses</p>
            <p className="text-2xl text-green-700">Rs.{totalExpense}/-</p>
          </div>
          <div className="w-44 h-44 bg-white border border-black flex flex-col justify-center gap-5 items-center">
            <p className="text-xl">Total Profit/Loss</p>
            <p className="text-2xl">
              {totalIncome > totalExpense ? (
                <span className="text-green-700">
                  Rs.{"(+"}
                  {totalIncome - totalExpense}
                  {")"}/-
                </span>
              ) : (
                <span className="text-red-700">
                  Rs.{"(-"}
                  {totalExpense - totalIncome}
                  {")"}/-
                </span>
              )}
            </p>
          </div>
        </div>

        <p className="text-3xl mt-10">
          Income and Expenses Chart Representation
        </p>

        <div className="bar-graph flex items-center mt-24 gap-24">
          <Chart
            totalIncome={totalIncome}
            totalExpenses={totalExpense}
            type="pie"
          />

          {/* Render a Bar chart */}
          <Chart
            totalIncome={totalIncome}
            totalExpenses={totalExpense}
            type="bar"
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
