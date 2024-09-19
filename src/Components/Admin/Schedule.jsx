import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

function Schedule() {

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <Sidebar />
      <div className="w-100 h-screen ps-96 pt-5 pe-5 overflow-scroll">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Manage Classes Schedule</h1>
          <div>
            <Link
              to="/admin/batch_management"
              className="px-4 py-2 text-lg font-bold hover:underline"
            >
              Go Back
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center w-100 mt-20">
          <div className="w-2/3 bg-white flex flex-col items-center py-6">
            <h2 className="text-4xl font-bold text-emerald-600 ">
              Create New Batch
            </h2>
            <form className="w-full px-12 flex flex-col">
              <select className="text-lg border mt-4 px-4 py-2">
                <option value="">Select Class</option>
                <option value="Web Development">Web Development</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Data Science">Data Science</option>
              </select>

              <select className="text-lg border mt-4 px-4 py-2">
                <option value="">Select Batch</option>
                <option value="Morning 9:00 am - 11:00 am">
                  Morning 9:00 am - 11:00 am
                </option>
                <option value="Morning 9:30 am - 11:30 am">
                  Morning 9:30 am - 11:30 am
                </option>
                <option value="Morning 10:00 am - 12:00 am">
                  Morning 10:00 am - 12:00 am
                </option>
                <option value="Morning 11:30 am - 1:30 pm">
                  Morning 11:30 am - 1:30 pm
                </option>
                <option value="Afternoon 3:00 pm - 5:00 pm">
                  Afternoon 3:00 pm - 5:00 pm
                </option>
                <option value="Afternoon 3:30 pm - 5:30 pm">
                  Afternoon 3:30 pm - 5:30 pm
                </option>
                <option value="Evening 4:00 pm - 6:00 pm">
                  Evening 4:00 pm - 6:00 pm
                </option>
              </select>

              <select className="text-lg border mt-4 px-4 py-2">
                <option value="">Course Duration</option>
                <option value="4 Weeks">4 Weeks</option>
                <option value="6 Weeks">6 Weeks</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
              </select>

              <select className="text-lg border mt-4 px-4 py-2">
                <option value="">Mode of Class</option>
                <option value="Physical Mode">Physical Mode</option>
                <option value="Virtual Mode">Virtual Mode</option>
              </select>

              <input
                type="text"
                placeholder="Mentor name"
                className="text-lg border mt-4 px-4 py-2"
              />

              <button className="text-lg mt-4 text-white bg-emerald-600 py-2 font-bold hover:bg-emerald-400">
                Create Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;

/*

<form className="w-full px-12 flex flex-col">
              <h2 className="text-4xl text-center mt-4 font-bold text-emerald-600 ">
                Create New Batch
              </h2>
              <select className="text-lg border mt-4 px-4 py-2">
                <option value="">Select Class</option>
                <option value="Web Development">Web Development</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Data Science">Data Science</option>
              </select>

              <select className="text-lg border mt-4 px-4 py-2">
                <option value="">Select Batch</option>
                <option value="Morning 9:00 am - 11:00 am">
                  Morning 9:00 am - 11:00 am
                </option>
                <option value="Morning 9:30 am - 11:30 am">
                  Morning 9:30 am - 11:30 am
                </option>
                <option value="Morning 10:00 am - 12:00 am">
                  Morning 10:00 am - 12:00 am
                </option>
                <option value="Morning 11:30 am - 1:30 pm">
                  Morning 11:30 am - 1:30 pm
                </option>
                <option value="Afternoon 3:00 pm - 5:00 pm">
                  Afternoon 3:00 pm - 5:00 pm
                </option>
                <option value="Afternoon 3:30 pm - 5:30 pm">
                  Afternoon 3:30 pm - 5:30 pm
                </option>
                <option value="Evening 4:00 pm - 6:00 pm">
                  Evening 4:00 pm - 6:00 pm
                </option>
              </select>

              <select className="text-lg border mt-4 px-4 py-2">
                <option value="">Course Duration</option>
                <option value="4 Weeks">4 Weeks</option>
                <option value="6 Weeks">6 Weeks</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
              </select>

              <select className="text-lg border mt-4 px-4 py-2">
                <option value="">Mode of Class</option>
                <option value="Physical Mode">Physical Mode</option>
                <option value="Virtual Mode">Virtual Mode</option>
              </select>

              <input
                type="text"
                placeholder="Mentor name"
                className="text-lg border mt-4 px-4 py-2"
              />

              <button className="text-lg mt-4 text-white bg-emerald-600 py-2 font-bold hover:bg-emerald-400">
                Create Now
              </button>
            </form>

*/
