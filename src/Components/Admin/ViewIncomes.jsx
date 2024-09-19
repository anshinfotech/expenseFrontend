import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {
  EMPTY_INCOME_FAILURE_MESSAGE,
  EMPTY_INCOME_SUCCESS_MESSAGE,
} from "../../Redux/constants/income";
import {
  addInstallmentAction,
  getAllIncomeAction,
  removeIncomeAction,
} from "../../Redux/actions/income";
import moment from "moment";

function ViewIncomes() {
  const [formData, setFormData] = useState({
    id: "",
    amount: "",
    method: "",
    transactionId: "",
  });
  const [incomeArray, setIncomeArray] = useState([]);
  const [originalIA, setOriginalIA] = useState([]);
  const [isDetailCard, setIsDetailCard] = useState(false);
  const [isUpdateCard, setIsUpdateCard] = useState(false);
  const [inDetail, setInDetail] = useState({});
  const [installement, setInstallement] = useState([]); //to store all the EMIs history of students
  const [nQuery, setNQuery] = useState(""); // nQuery = Name Query
  const [fnQuery, setFNQuery] = useState(""); // fnQuery = Father's Name Query
  const [pmQuery, setPMQuery] = useState(""); //pmQuery = Payment Method query
  const [dateFilter, setDateFilter] = useState(""); //dateFilter for date query
  const [timeFilter, setTimeFilter] = useState(""); //dateFilter for date query
  const [courseFilter, setCourseFilter] = useState(""); // used to filter the course
  const [durationFilter, setDurationFilter] = useState(""); //used to filter according to student course duration
  const [pendingFee, setPendingFee] = useState("");

  const isLoading = useSelector((state) => state.IncomeGS.isLoading);
  const success = useSelector((state) => state.IncomeGS.success);
  const failure = useSelector((state) => state.IncomeGS.failure);
  const incomes = useSelector((state) => state.IncomeGS.incomes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (failure) {
      toast.error(failure);
      dispatch({ type: EMPTY_INCOME_FAILURE_MESSAGE });
    }
  }, [failure]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: EMPTY_INCOME_SUCCESS_MESSAGE });
    }
  }, [success]);

  useEffect(() => {
    dispatch(getAllIncomeAction());
  }, []);

  useEffect(() => {
    setIncomeArray(incomes);
    setOriginalIA(incomes);
  }, [incomes]);

  const viewIncomeDetails = (item) => {
    const EMIs = item.EMIs;
    const pendFee = EMIs.reduce((acc, index) => {
      return acc + index.installment;
    }, 0);
    setIsDetailCard(true);
    setInDetail(item);
    setInstallement(EMIs);
    setPendingFee(item.totalFees - pendFee);
  };

  const handleDeleteIncome = (id) => {
    dispatch(removeIncomeAction(id));
  };

  const handleFilterDataOperation = () => {
    const filterData = originalIA.filter((data) => {
      //filter condition for payment method
      const pmFil = pmQuery
        ? data.paymentMethod.toLowerCase().includes(pmQuery.toLowerCase())
        : true;
      //filter condition for student name
      const nameFil = nQuery
        ? data.name.toLowerCase().includes(nQuery.toLowerCase())
        : true;
      //filter condition for student's fathers name
      const fnFil = fnQuery
        ? data.fatherName.toLowerCase().includes(fnQuery.toLowerCase())
        : true;
      //filter condition for date of payment
      const dateFil = dateFilter
        ? moment(data.paymentDate).format("DD/MM/YYYY") ===
          moment(dateFilter).format("DD/MM/YYYY")
        : true;
      //filter condition for time of payment
      const hours = timeFilter.split(":")[0];
      const timeFil = timeFilter
        ? moment(data.paymentDate).format("hh") === hours
        : true;
      //filter condition according to course
      const courseFil = courseFilter
        ? data.course.toLowerCase().includes(courseFilter.toLowerCase())
        : true;
      //filter condition according to course duration
      const durFil = durationFilter
        ? data.duration.toLowerCase().includes(durationFilter.toLowerCase())
        : true;

      return (
        pmFil && nameFil && fnFil && dateFil && timeFil && courseFil && durFil
      );
    });

    setIncomeArray(filterData);
  };

  const handleUpdateDataFunction = (user) => {
    setIsUpdateCard(true);
    setFormData({ id: user._id ? user._id : "No user Id found" });
  };

  const handleEMIMethod = (e) => {
    e.preventDefault();
    dispatch(
      addInstallmentAction({
        id: formData.id,
        amount: Number(formData.amount),
        installMethod: formData.method,
        transactionId : formData.transactionId,
      })
    );
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <Sidebar />
      <div className="w-100 h-screen ps-96 pt-5 pe-5 overflow-scroll">
        <div className="flex justify-between flex-col">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">All Incomes History</h1>
            <div>
              <button
                onClick={handleRefreshPage}
                className="px-4 py-2 text-lg font-bold hover:underline"
              >
                Refresh Page
              </button>
              <Link
                to="/admin/finance_management/add_income"
                className="px-4 py-2 text-lg font-bold hover:underline"
              >
                Add New Entry
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
          <div className="filter_container w-full mt-10 grid grid-cols-4 gap-5">
            <input
              type="text"
              value={nQuery}
              placeholder="Enter student's name"
              onChange={(e) => setNQuery(e.target.value)}
              className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
            />{" "}
            <input
              type="text"
              placeholder="Enter student's father name"
              value={fnQuery}
              onChange={(e) => setFNQuery(e.target.value)}
              className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
            />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
            >
              <option value="">Course</option>
              <option value="">All</option>
              <option value="Web Development">Web Development</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Data Science">Data Science</option>
            </select>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
            >
              <option value="">Course Duration</option>
              <option value="">All</option>
              <option value="4 Weeks">4 Weeks</option>
              <option value="6 Weeks">6 Weeks</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
            </select>
            <select
              value={pmQuery}
              onChange={(e) => setPMQuery(e.target.value)}
              className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
            >
              <option value="">Payment Method</option>
              <option value="">All</option>
              <option value="Cash">Cash</option>
              <option value="Via Cheque">Via Cheque</option>
              <option value="UPI(Bank)">
                UPI{"("}Bank{")"}
              </option>
              <option value="UPI(Personal)">
                UPI{"("}Personal{")"}
              </option>
              <option value="Bank Transfer">
                Bank Transfer{"("}NEFT{")"}
              </option>
              <option value="Bank Transfer">
                Bank Transfer{"("}NetBanking{")"}
              </option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
            />
            <input
              type="time"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-xl"
            />
            <button
              onClick={handleFilterDataOperation}
              className="px-4 py-2 rounded-md text-lg text-white font-bold bg-emerald-600 hover:underline"
            >
              <i className="fa-solid fa-magnifying-glass mr-2"></i>Search
            </button>
          </div>
        </div>
        <table className="w-full mb-5">
          <thead className="w-full">
            <tr className="grid grid-cols-6 gap-3 px-4 bg-slate-400 rounded-md mt-4 py-4">
              <td className="text-xl text-slate-900 font-bold">Student Name</td>
              <td className="text-xl text-slate-900 font-bold">
                Father's Name
              </td>
              <td className="text-xl text-slate-900 font-bold">
                Payment Method
              </td>
              <td className="text-xl text-slate-900 font-bold">View</td>
              <td className="text-xl text-slate-900 font-bold">Update EMI</td>
              <td className="text-xl text-slate-900 font-bold">Remove</td>
            </tr>
          </thead>
        </table>

        {isLoading ? (
          <p className="text-3xl text-center font-bold mt-10">
            Fetching Data.....
          </p>
        ) : incomeArray.length > 0 ? (
          incomeArray.map((item) => {
            return (
              <table className="w-full" key={item._id}>
                <thead className="w-full">
                  <tr className="grid grid-cols-6 gap-3 px-4 bg-slate-200 items-center rounded-md mt-4 py-4">
                    <td className="text-xl text-slate-900 font-bold">
                      {item.name}
                    </td>
                    <td className="text-xl text-slate-900 font-bold">
                      {item.fatherName}
                    </td>
                    <td className="text-xl text-slate-900 font-bold">
                      {item.paymentMethod}
                    </td>
                    <td className="text-xl text-white font-bold mx-auto">
                      <button
                        onClick={() => viewIncomeDetails(item)}
                        className="px-4 py-2 rounded-md text-lg font-bold bg-emerald-600 hover:underline"
                      >
                        <i className="fa-solid fa-eye mr-2"></i>View
                      </button>
                    </td>
                    <td className="text-xl text-white font-bold mx-auto">
                      <button
                        onClick={() => handleUpdateDataFunction(item)}
                        className="px-4 py-2 rounded-md text-lg font-bold bg-amber-600 hover:underline"
                      >
                        <i className="fa-solid fa-user-pen mr-2"></i>Update
                      </button>
                    </td>
                    <td className="text-xl text-white font-bold mx-auto">
                      <button
                        onClick={() => handleDeleteIncome(item._id)}
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
        <div className="details-card w-1/2 h-2/3 pb-8 overflow-y-scroll bg-white shadow-2xl shadow-slate-700">
          <p
            className="text-right px-4 pt-2 cursor-pointer"
            onClick={() => setIsDetailCard(false)}
          >
            <i className="fa-solid fa-xmark text-3xl font-bold"></i>
          </p>
          <h2 className="my-2 text-3xl font-bold text-center">
            Student Details and Incomes Details
          </h2>
          <div className="flex flex-col gap-3 mt-12 px-16">
            <div className="flex justify-between">
              <span className="text-xl font-bold">Name :</span>
              <span className="text-xl underline text-slate-600">
                {inDetail.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Father's Name :</span>
              <span className="text-xl underline text-slate-600">
                {inDetail.fatherName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Mobile :</span>
              <span className="text-xl underline text-slate-600">
                {inDetail.mobile}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Email :</span>
              <span className="text-xl underline text-slate-600">
                {inDetail.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Course :</span>
              <span className="text-xl underline text-slate-600">
                {inDetail.course}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Course Duration :</span>
              <span className="text-xl underline text-slate-600">
                {inDetail.duration}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Total Course Fees :</span>
              <span className="text-xl underline text-slate-600">
                Rs.{inDetail.totalFees}/-
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-bold">Pending Course Fees :</span>
              <span className="">
                {pendingFee ? (
                  <span className="text-xl underline text-red-500">
                    <i className="fa-solid fa-circle-exclamation me-1"></i>Rs.
                    {pendingFee}/-
                  </span>
                ) : (
                  <span className="text-green-600 text-xl">
                    Completed<i className="fa-solid fa-circle-check ml-1"></i>
                  </span>
                )}
              </span>
            </div>
            <hr />
            <h3 className="text-center text-2xl font-medium my-6 bg-emerald-300">
              Installments History
            </h3>

            <div className="flex flex-col gap-3">
              {installement.length > 0 ? (
                installement.map((inst, index) => {
                  return (
                    <div className="flex flex-col gap-4 border-b-2 border-black pb-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold ">
                          {index + 1}
                          {")"} Payment :
                        </span>
                        <span className="text-lg underline text-green-600">
                          Rs.{inst.installment}/-
                          <i className="fa-solid fa-circle-check ml-1"></i>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">
                          Submission Date :
                        </span>
                        <span className="text-lg underline text-slate-600">
                          {moment(inst.installmentDate).format("dddd,DD/MM/YY")}
                        </span>
                      </div>
                      <div className="flex justify-between" >
                        <span className="text-lg font-bold ">
                          Payment Method :
                        </span>
                        <span className="text-lg">
                          {inst.installmentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between" >
                        <span className="text-lg font-bold ">
                          Transaction ID :
                        </span>
                        <span className="text-lg">
                          {inst.transactionId ? inst.transactionId : "Nill"}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>No Installments paid Yet</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          isUpdateCard ? "block" : "hidden"
        } absolute w-100 h-screen flex items-center justify-center z-50 top-0 left-0 right-0 bottom-0`}
      >
        <div className="details-card w-1/2 h-2/3 pb-8 overflow-y-scroll bg-white shadow-2xl shadow-slate-700">
          <p
            className="text-right px-4 pt-2 cursor-pointer"
            onClick={() => setIsUpdateCard(false)}
          >
            <i className="fa-solid fa-xmark text-3xl font-bold"></i>
          </p>
          <h2 className="my-2 text-3xl font-bold text-center">Update EMI</h2>

          <form className="flex flex-col w-full px-12 mt-12">
            <input
              type="text"
              disabled={true}
              value={`Student Id : ${formData.id}`}
              className="px-4 py-2 border-2 border-slate-900 rounded-md font-medium text-slate-500 text-xl"
            />
            <select
              value={formData.method}
              onChange={(e) =>
                setFormData({ ...formData, method: e.target.value })
              }
              className="px-4 py-2 border-2 mt-4 border-slate-900 rounded-md font-medium text-xl"
            >
              <option value="">Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Via Cheque">Via Cheque</option>
              <option value="UPI(Bank)">
                UPI{"("}Bank{")"}
              </option>
              <option value="UPI(Personal)">
                UPI{"("}Personal{")"}
              </option>
              <option value="Bank Transfer">
                Bank Transfer{"("}NEFT{")"}
              </option>
              <option value="Bank Transfer">
                Bank Transfer{"("}NetBanking{")"}
              </option>
            </select>
            <input
                type="text"
                placeholder="Enter UPI Transaction ID"
                value={formData.transactionId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transactionId: e.target.value,
                  })
                }
                className={`${
                  formData.method === "UPI(Bank)" ||
                  formData.method === "UPI(Personal)" ? 'block' : 'hidden'
                } text-lg px-4 py-2 mt-4  border-2 border-slate-900`}
              />
            <input
              type="text"
              value={formData.amount}
              disabled={formData.method ? false : true}
              placeholder="Enter amount"
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="px-4 py-2 mt-4 border-2 border-slate-900 rounded-md font-medium text-xl"
            />
            <button
              onClick={handleEMIMethod}
              className="text-lg text-white bg-emerald-600 py-2 mt-6 font-bold hover:bg-emerald-400"
            >
              {isLoading ? "Loading...." : "Update EMI"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ViewIncomes;
