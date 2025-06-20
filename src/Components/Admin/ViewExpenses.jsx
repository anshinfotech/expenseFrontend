import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllExpenseAction,
  removeExpenseAction,
} from "../../Redux/actions/expense";
import { Toaster, toast } from "sonner";
import {
  EMPTY_FAILURE_MESSAGE,
  EMPTY_SUCCESS_MESSAGE,
} from "../../Redux/constants/expense";
import moment from "moment";
import ExpenseOverview from "./ExpenseOverview";
import CustomLineChart from "./CustomLineChart";

function ViewExpenses() {
  const [expenseArray, setExpenseArray] = useState([]); //it is used to store the filtered data
  const [originalExArray, setOriginalExArray] = useState([]); //it is used to maintain the original data
  const [isDetailCard, setIsDetailCard] = useState(false);
  const [expDetail, setExpDetail] = useState({});
  const [filterPM, setFilterPM] = useState(""); //where filterPM stands for = filter for payment method
  const [filterPT, setFilterPT] = useState(""); //where filterPT stands for = filter for payment type
  const [dateFilter, setDateFilter] = useState(""); //where dataFilter is used to store date
  const [timeFilter, setTimeFilter] = useState(""); //where dataFilter is used to store time

  const isLoading = useSelector((state) => state.ExpenseGS.isLoading);
  const success = useSelector((state) => state.ExpenseGS.success);
  const failure = useSelector((state) => state.ExpenseGS.failure);
  const expenses = useSelector((state) => state.ExpenseGS.expenses);

  const dispatch = useDispatch();

  useEffect(() => {
    if (failure) {
      toast.error(failure);
      dispatch({ type: EMPTY_FAILURE_MESSAGE });
    }
  }, [failure]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: EMPTY_SUCCESS_MESSAGE });
    }
  }, [success]);

  useEffect(() => {
    //this is the useEffect for fetching data from API
    dispatch(getAllExpenseAction());
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      setExpenseArray(expenses);
      setOriginalExArray(expenses);
    }
  }, [expenses]);

  const viewExpenseDetails = (item) => {
    setIsDetailCard(true);
    setExpDetail(item);
  };

  const handleDeleteExpense = (id) => {
    dispatch(removeExpenseAction(id));
  };

  const handleFilterDataOperation = () => {
    const filterData = originalExArray.filter((data) => {
      //filter condition for payment method
      const filPM = filterPM
        ? data.paymentMethod.toLowerCase().includes(filterPM.toLowerCase())
        : true;
      //filter condition for payment type
      const filPT = filterPT
        ? data.paymentType.toLowerCase().includes(filterPT.toLowerCase())
        : true;
      //filter condition according to date
      const filDate = dateFilter
        ? moment(data.paymentDate).format("DD/MM/YYYY") ===
          moment(dateFilter).format("DD/MM/YYYY")
        : true;
      //filter condition according to time
      const time = timeFilter.split(":")[0];
      const filTime = timeFilter ? moment(data.paymentDate).format("hh") === time : true;

      return filPM && filPT && filDate && filTime;
    });

    setExpenseArray(filterData);
  };

  const clearFilters = () => {
    setFilterPM("");
    setFilterPT("");
    setDateFilter("");
    setTimeFilter("");
    setExpenseArray(originalExArray);
  };

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <Sidebar />
      <div className="w-100 h-screen ps-96 pt-5 pe-5 overflow-scroll bg-gradient-to-br from-emerald-50 via-white to-green-50">
        {/* Header */}
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Expenses History</h1>
            <p className="text-gray-600 mt-2">Track and manage your financial transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/finance_management/add_expense"
              className="px-4 py-2 text-lg font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
            >
              Add new Entry
            </Link>
            <Link
              to="/admin/finance_management"
              className="px-4 py-2 text-lg font-bold text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              Go Back
            </Link>
            <button className="px-4 py-2 text-lg font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200">
              Delete All <i className="fa-solid fa-trash ml-2"></i>
            </button>
          </div>
        </div>

        {/* Expense Overview Cards */}
        <ExpenseOverview 
          expenses={expenseArray} 
          onAddExpense={() => console.log('Add expense clicked')} 
        />

        {/* Charts Section */}
        <div className="mb-8">
          <CustomLineChart expenses={expenseArray} />
        </div>

        {/* Filters */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filter Expenses</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear All
            </button>
          </div>
          
          <div className="flex gap-4 mb-4">
            <select
              value={filterPM}
              onChange={(e) => {
                setFilterPM(e.target.value);
              }}
              className="px-4 py-2 w-52 bg-white/80 border border-gray-200 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            >
              <option value="">Payment Method</option>
              <option value="">All</option>
              <option value="Cash">Cash</option>
              <option value="Google Pay">Google Pay</option>
              <option value="IOB">IOB</option>
              <option value="Paytm">Paytm</option>
              <option value="Via Cheque">Via Cheque</option>
              <option value="NEFT">NEFT</option>
            </select>
            <select
              value={filterPT}
              onChange={(e) => {
                setFilterPT(e.target.value);
              }}
              className="px-4 py-2 w-52 bg-white/80 border border-gray-200 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            >
              <option value="">Payment Type</option>
              <option value="">All</option>
              <option value="Salary">Salary</option>
              <option value="Rent">Rent</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 w-52 bg-white/80 border border-gray-200 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            />
            <input
              type="time"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 w-52 bg-white/80 border border-gray-200 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            />
            <button
              onClick={handleFilterDataOperation}
              className="px-6 py-2 rounded-xl text-lg text-white font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <i className="fa-solid fa-magnifying-glass mr-2"></i>Search
            </button>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Expense History</h3>
            <p className="text-sm text-gray-600 mt-1">
              {expenseArray.length} {expenseArray.length === 1 ? 'transaction' : 'transactions'} found
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <span className="ml-3 text-lg font-medium text-gray-700">Fetching Data.....</span>
            </div>
          ) : expenseArray.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-emerald-600 text-left">
                    <th className="px-6 py-4 text-xl text-white font-bold">Amount (in INR)</th>
                    <th className="px-6 py-4 text-xl text-white font-bold">Payment Method</th>
                    <th className="px-6 py-4 text-xl text-white font-bold">Payment Type</th>
                    <th className="px-6 py-4 text-xl text-white font-bold">View Details</th>
                    <th className="px-6 py-4 text-xl text-white font-bold">Remove Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expenseArray.map((item) => (
                    <tr key={item._id} className="hover:bg-emerald-50/50 transition-colors duration-200">
                      <td className="px-6 py-4 text-xl text-slate-900 font-bold">
                        Rs.{item.expense}/-
                      </td>
                      <td className="px-6 py-4 text-xl text-slate-900 font-bold">
                        {item.paymentMethod}
                      </td>
                      <td className="px-6 py-4 text-xl text-slate-900 font-bold">
                        {item.paymentType}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => viewExpenseDetails(item)}
                          className="px-4 py-2 rounded-md text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-200"
                        >
                          <i className="fa-solid fa-eye mr-2"></i>View
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteExpense(item._id)}
                          className="px-4 py-2 rounded-md text-lg font-bold bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                        >
                          <i className="fa-solid fa-trash mr-2"></i>Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-3xl text-center font-bold mt-10">No Data!</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <div
        className={`${
          isDetailCard ? "block" : "hidden"
        } fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50`}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Expense Details</h2>
              <button
                onClick={() => setIsDetailCard(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <i className="fa-solid fa-xmark text-2xl font-bold"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-600">Payment Method</span>
                <span className="font-semibold text-gray-900">{expDetail.paymentMethod}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-600">Payment Type</span>
                <span className="font-semibold text-gray-900">{expDetail.paymentType}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-600">Payment Date</span>
                <span className="font-semibold text-gray-900">
                  {expDetail.paymentDate && moment(expDetail.paymentDate).format("DD/MM/YYYY , dddd , hh:mm a")}
                </span>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <span className="font-medium text-gray-600 block mb-2">Description of payment</span>
                <p className="text-gray-900">{expDetail.description}</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200">
                <span className="font-bold text-gray-800">Total amount</span>
                <span className="text-2xl font-bold text-emerald-600">
                  Rs.{expDetail.expense}/-
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewExpenses;