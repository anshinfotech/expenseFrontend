import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import {
  EMPTY_FAILURE_MESSAGE,
  EMPTY_SUCCESS_MESSAGE,
} from "../../Redux/constants/admin";
import {
  fetchAllBatchesAction,
  deleteBatchAction,
} from "../../Redux/actions/admin";

import { FaTrash } from "react-icons/fa";

function ViewBatches() {
  const [batchArray, setBatchArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);

  const isLoading = useSelector((state) => state.AdminGS.isLoading);
  const failure = useSelector((state) => state.AdminGS.failure);
  const success = useSelector((state) => state.AdminGS.success);
  const batches = useSelector((state) => state.AdminGS.Batch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBatchesAction());
  }, []);

  useEffect(() => {
    if (batches && batches.length > 0) {
      setBatchArray(batches);
      setOriginalArray(batches);
    }
  }, [batches]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: EMPTY_SUCCESS_MESSAGE });
    }
  }, [success]);

  useEffect(() => {
    if (failure) {
      toast.error(failure);
      dispatch({ type: EMPTY_FAILURE_MESSAGE });
    }
  }, [failure]);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = originalArray.filter(
      (item) =>
        item.subject.toLowerCase().includes(term) ||
        (item.mentor && item.mentor.toLowerCase().includes(term))
    );
    setBatchArray(filtered);
  };

  const handleDeleteClick = (id) => {
    setBatchToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteBatchAction(batchToDelete));
    setShowConfirm(false);
    setBatchToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setBatchToDelete(null);
  };

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Sidebar />

      <div className="w-full h-screen ps-96 pt-5 pe-5 overflow-scroll">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Classes Schedule</h1>
          <Link
            to="/admin/batch_management"
            className="px-4 py-2 text-lg font-bold hover:underline"
          >
            Go Back
          </Link>
        </div>

        {/* Search Box */}
        <div className="flex gap-2 mt-6">
          <input
            type="text"
            placeholder="Search by subject or teacher"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 px-4 py-2 border border-gray-400 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 rounded-xl text-lg text-white font-bold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Search
          </button>
        </div>

        {/* Batch Cards */}
        <div className="grid grid-cols-3 mt-10">
          {isLoading ? (
            <p className="text-3xl text-center font-bold mt-10">
              Fetching Data.....
            </p>
          ) : batchArray.length > 0 ? (
            batchArray.map((item, index) => (
              <div
                key={index}
                className="relative w-80 h-52 bg-white mx-auto my-5 shadow-lg rounded-xl p-4"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl"
                  title="Delete"
                >
                  <FaTrash />
                </button>

                <div className="content-body h-full flex flex-col justify-center gap-2">
                  <span className="text-xl font-bold text-gray-800">
                    {item.subject}
                  </span>
                  <span>
                    <b>Batch :</b> {item.batch}
                  </span>
                  <span>
                    <b>Duration :</b> {item.duration}
                  </span>
                  {item.mentor && (
                    <span>
                      <b>Mentor :</b> {item.mentor}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-3xl text-center font-bold mt-10">No Data Found</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this batch?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBatches;
