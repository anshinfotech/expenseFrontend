import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import {
  EMPTY_FAILURE_MESSAGE,
  EMPTY_SUCCESS_MESSAGE,
} from "../../Redux/constants/admin";
import { addExpenseAction } from "../../Redux/actions/expense";
import { Link } from "react-router-dom";

function AddExpense() {
  const [formData, setFormData] = useState({
    expense: "",
    description: "",
    paymentType: "",
    paymentMethod: "",
  });

  const isLoading = useSelector((state) => state.ExpenseGS.isLoading);
  const success = useSelector((state) => state.ExpenseGS.success);
  const failure = useSelector((state) => state.ExpenseGS.failure);

  console.log(isLoading);
  console.log(success);
  console.log(failure);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(addExpenseAction(formData));

    setFormData({
      expense: "",
      description: "",
      paymentType: "",
      paymentMethod : "",
    });
  };

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <Sidebar />
      <div className="w-100 h-screen ps-96">
        <div className="flex justify-between py-10 pe-5">
          <h1 className="text-4xl font-bold">Add New Expense</h1>
          <div>
            <Link
              to="/admin/finance_management/view_expenses"
              className="px-4 py-2 text-lg font-bold hover:underline"
            >
              View Data
            </Link>
            <Link
              to="/admin/finance_management"
              className="px-4 py-2 text-lg font-bold hover:underline"
            >
              Go Back
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center w-100 mt-12">
          <div className="w-2/3 bg-white flex flex-col items-center py-6">
            <h2 className="text-4xl font-bold text-emerald-600 ">
              Add Expense
            </h2>
            <form
              className="flex flex-col gap-4 w-full px-12 mt-12"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                placeholder="Enter expense amount"
                value={formData.expense}
                onChange={(e) =>
                  setFormData({ ...formData, expense: e.target.value })
                }
                className="text-lg border px-4 py-2"
              />
              <select
                value={formData.paymentType}
                onChange={(e) =>
                  setFormData({ ...formData, paymentType: e.target.value })
                }
                className="text-lg border px-4 py-2"
              >
                <option value="">Payment Type</option>
                <option value="Salary">Salary</option>
                <option value="Rent">Rent</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
              <input
                type="text"
                placeholder="Give brief description"
                disabled={formData.paymentType ? false : true}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="text-lg border px-4 py-2"
              />
              <select
                value={formData.paymentMethod}
                disabled={formData.paymentType ? false : true}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                className="text-lg border px-4 py-2"
              >
                <option value="">Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Google Pay">Google Pay</option>
                <option value="Paytm">Paytm</option>
                <option value="IOB">IOB</option>
                <option value="Via Cheque">Via Cheque</option>
                <option value="NEFT">NEFT</option>
              </select>
              <button className="text-lg text-white bg-emerald-600 py-2 font-bold hover:bg-emerald-400">
                {isLoading ? "Loading...." : "Add Expense"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddExpense;
