import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStaffMembersAction } from "../../Redux/actions/admin";
import {Toaster , toast} from 'sonner';
import { EMPTY_FAILURE_MESSAGE, EMPTY_SUCCESS_MESSAGE } from "../../Redux/constants/admin";

function ViewStaff() {
  const [isDetailCard, setIsDetailCard] = useState(false);
  const [details, setDetails] = useState({});
  const [staffArray, setStaffArray] = useState([]);

  const isLoading = useSelector((state) => state.AdminGS.isLoading);
  const success = useSelector((state) => state.AdminGS.success);
  const failure = useSelector((state) => state.AdminGS.failure);
  const Staff = useSelector((state) => state.AdminGS.Staff);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllStaffMembersAction());
  }, []);

  const viewStaffDetails = () => {
    setIsDetailCard(true);
  };

  useEffect(() => {
    if (Staff && Staff.length > 0) {
      setStaffArray(Staff);
    }
  }, [Staff]);

  useEffect(() => {
    if(success){
      toast.success(success);
      dispatch({type : EMPTY_SUCCESS_MESSAGE});
    }
  } , [success]);

  useEffect(() => {
    if(failure){
      toast.error(failure);
      dispatch({type : EMPTY_FAILURE_MESSAGE});
    }
  } , [failure]);

  return (
    <>
     <Toaster richColors position="bottom-right"></Toaster>
      <Sidebar />
      <div className="w-100 h-screen ps-96 pt-5 pe-5 overflow-scroll">
      <div className="flex justify-between">
          <h1 className="text-4xl font-bold">All Staff Members</h1>
          <div>
            <Link to="/admin/staff_management" className="px-4 py-2 text-lg font-bold hover:underline">Go Back</Link>
          </div>
        </div>
        <table className="w-full mb-5">
          <thead className="w-full">
            <tr className="grid grid-cols-5 gap-3 px-4 bg-slate-400 rounded-md mt-4 py-4">
              <td className="text-xl text-slate-900 font-bold">EmpID</td>
              <td className="text-xl text-slate-900 font-bold">Name</td>
              <td className="text-xl text-slate-900 font-bold">Department</td>
              <td className="text-xl text-slate-900 font-bold">Details</td>
              <td className="text-xl text-slate-900 font-bold">Remove</td>
            </tr>
          </thead>
        </table>

        {isLoading ? (
          <p className="text-3xl text-center font-bold mt-10">
            Fetching Data.....
          </p>
        ) : staffArray.length > 0 ? (
          staffArray.map((item) => {
            return (
              <table className="w-full" key={item._id}>
                <thead className="w-full">
                  <tr className="grid grid-cols-5 gap-3 px-4 bg-slate-200 items-center rounded-md mt-4 py-4">
                    <td className="text-xl text-slate-900 font-bold">{item.empId}</td>
                    <td className="text-xl text-slate-900 font-bold">{item.name}</td>
                    <td className="text-xl text-slate-900 font-bold">
                      {item.department}
                    </td>
                    <td className="text-xl text-white font-bold mx-auto">
                      <button
                        className="px-4 py-2 rounded-md text-lg font-bold bg-emerald-600 hover:underline"
                        onClick={() => viewStaffDetails()}
                      >
                        <i className="fa-solid fa-circle-user mr-2"></i>View
                        Details
                      </button>
                    </td>
                    <td className="text-xl text-white font-bold mx-auto">
                      <button className="px-4 py-2 rounded-md text-lg font-bold bg-red-600 hover:underline">
                        <i className="fa-solid fa-trash mr-2"></i>Remove
                      </button>
                    </td>
                  </tr>
                </thead>
              </table>
            );
          })
        ) : (
          <p className="text-3xl text-center font-bold mt-10">
            No Data!
          </p>
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
        </div>
      </div>
    </>
  );
}

export default ViewStaff;
