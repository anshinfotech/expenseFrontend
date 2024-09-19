import React from "react";
import { Link , useNavigate } from "react-router-dom";
import {useDispatch } from 'react-redux';
import { logoutAdminAction } from "../../Redux/actions/admin";

function Logout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanldeButtonClick = () => {
    dispatch(logoutAdminAction(navigate));
  }

  return (
    <div className="flex justify-center items-center w-100 h-screen">
      <div className="w-1/3 bg-white flex flex-col items-center gap-6 py-6">
        <h2 className="text-4xl font-bold text-emerald-600 ">
          Admin Logout Panel
        </h2>

        <h2 className="text-xl font-bold">Do you want to logout?</h2>

        <div className="flex gap-6">
          <button onClick={hanldeButtonClick} className="px-4 py-2 text-white rounded-md text-lg font-bold bg-green-600 hover:underline">
            Yes
          </button>

          <Link
            to="/admin/dashboard"
            className="px-4 py-2 text-white rounded-md text-lg font-bold bg-red-600 hover:underline"
          >
            No
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;
