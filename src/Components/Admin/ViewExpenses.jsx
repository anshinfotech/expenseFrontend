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

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <Sidebar />
      <div className="w-100 h-screen ps-96 pt-5 pe-5 overflow-scroll">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Expenses History</h1>
          <div>
            <Link
              to="/admin/finance_management/add_expense"
              className="px-4 py-2 text-lg font-bold hover:underline"
            >
              Add new Entry
            </Link>
            <Link
              to="/admin/finance_management"
              className="px-4 py-2 text-lg font-bold hover:underline"
            >
              Go Back
            </Link>
            <button className="px-4 py-2 text-lg font-bold hover:underline">
              Delete All{"  "}
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        <div className="filter_container w-full mt-10 flex justify-between">
          <div className="flex gap-4">
            <select
              value={filterPM}
              onChange={(e) => {
                setFilterPM(e.target.value);
              }}
              className="px-4 py-2 w-52 border-2 border-slate-900 rounded-md font-medium text-xl"
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
              className="px-4 py-2 w-52 border-2 border-slate-900 rounded-md font-medium text-xl"
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
              className="px-4 py-2 w-52 border-2 border-slate-900 rounded-md font-medium text-xl"
            />
            <input
              type="time"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 w-52 border-2 border-slate-900 rounded-md font-medium text-xl"
            />
          </div>
          <button
            onClick={handleFilterDataOperation}
            className="px-4 py-2 rounded-md text-lg text-white font-bold bg-emerald-600 hover:underline"
          >
            <i className="fa-solid fa-magnifying-glass mr-2"></i>Search
          </button>
        </div>
        <table className="w-full mb-5">
          <thead className="w-full">
            <tr className="grid grid-cols-5 gap-3 px-4 bg-slate-900 rounded-md mt-4 py-4">
              <td className="text-xl text-white font-bold">
                Amount{"(in INR)"}
              </td>
              <td className="text-xl text-white font-bold">
                Payment Method
              </td>
              <td className="text-xl text-white font-bold">Payment Type</td>
              <td className="text-xl text-white font-bold">View Details</td>
              <td className="text-xl text-white font-bold">Remove Data</td>
            </tr>
          </thead>
        </table>

        {isLoading ? (
          <p className="text-3xl text-center font-bold mt-10">
            Fetching Data.....
          </p>
        ) : expenseArray.length > 0 ? (
          expenseArray.map((item) => {
            return (
              <table className="w-full" key={item._id}>
                <thead className="w-full">
                  <tr className="grid grid-cols-5 gap-3 px-4 bg-slate-200 items-center rounded-md mt-4 py-4">
                    <td className="text-xl text-slate-900 font-bold">
                      Rs.{item.expense}/-
                    </td>
                    <td className="text-xl text-slate-900 font-bold">
                      {item.paymentMethod}
                    </td>
                    <td className="text-xl text-slate-900 font-bold">
                      {item.paymentType}
                    </td>
                    <td className="text-xl text-white font-bold mx-auto">
                      <button
                        onClick={() => viewExpenseDetails(item)}
                        className="px-4 py-2 rounded-md text-lg font-bold bg-emerald-600 hover:underline"
                      >
                        <i className="fa-solid fa-eye mr-2"></i>View
                      </button>
                    </td>
                    <td className="text-xl text-white font-bold mx-auto">
                      <button
                        onClick={() => handleDeleteExpense(item._id)}
                        className="px-4 py-2 rounded-md text-lg font-bold bg-red-600 hover:underline"
                      >
                        <i className="fa-solid fa-trash mr-2"></i>Remove
                      </button>
                    </td>
                  </tr>
                </thead>
              </table>
            );
          })
        ) : (
          <p className="text-3xl text-center font-bold mt-10">No Data!</p>
        )}
      </div>
      <div
        className={`${
          isDetailCard ? "block" : "hidden"
        } absolute w-100 h-screen flex items-center justify-center z-50 top-0 left-0 right-0 bottom-0`}
      >
        <div className="details-card w-1/2 h-2/3 bg-white shadow-2xl shadow-slate-700">
          <p
            className="text-right px-4 pt-2 cursor-pointer"
            onClick={() => setIsDetailCard(false)}
          >
            <i className="fa-solid fa-xmark text-3xl font-bold"></i>
          </p>
          <h2 className="my-2 text-3xl font-bold text-center">
            Expense Details
          </h2>
          <div className="flex flex-col gap-3 mt-12 px-16">
            <div className="flex justify-between">
              <span className="text-xl font-bold">Payment Method</span>
              <span className="text-xl underline">
                {expDetail.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Payment Type</span>
              <span className="text-xl underline">{expDetail.paymentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Payment Date</span>
              <span className="text-xl underline">
                {moment(expDetail.paymentDate).format(
                   "DD/MM/YYYY , dddd , hh:mm a"
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Description of payment</span>
              <span className="text-xl underline">{expDetail.description}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="text-xl font-bold">Total amount</span>
              <span className="text-xl underline">
                Rs.{expDetail.expense}/-
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewExpenses;
