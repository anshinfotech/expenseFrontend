import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import {
  EMPTY_INCOME_FAILURE_MESSAGE,
  EMPTY_INCOME_SUCCESS_MESSAGE,
} from "../../Redux/constants/income";
import { addIncomeAction } from "../../Redux/actions/income";

function AddIncome() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    college: "",
    mobile: "",
    email: "",
    course: "",
    duration: "",
    batch: "",
    totalFees: "",
    paymentMethod: "",
    payment: "",
    otherCollege: "",
    transactionId: "",
  });

  const isLoading = useSelector((state) => state.IncomeGS.isLoading);
  const success = useSelector((state) => state.IncomeGS.success);
  const failure = useSelector((state) => state.IncomeGS.failure);

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
      setFormData({
        name: "",
        fatherName: "",
        motherName: "",
        college: "",
        mobile: "",
        email: "",
        course: "",
        duration: "",
        batch: "",
        totalFees: "",
        paymentMethod: "",
        payment: "",
        otherCollege: "",
        transactionId: "",
      });
    }
  }, [success]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      fatherName,
      motherName,
      college,
      mobile,
      email,
      course,
      duration,
      batch,
      transactionId,
      totalFees,
      paymentMethod,
      payment,
      otherCollege,
    } = formData;

    const newFormData = {
      name,
      fatherName,
      motherName,
      college: college === "Other" ? otherCollege : college,
      mobile: Number(mobile),
      email,
      course,
      duration,
      batch,
      totalFees: Number(totalFees),
      paymentMethod,
      transactionId,
      payment: Number(payment),
    };

    dispatch(addIncomeAction(newFormData));
  };

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <Sidebar />
      <div className="w-100 h-screen overflow-y-scroll pb-12 ps-96">
        <div className="flex justify-between py-10 pe-5">
          <h1 className="text-4xl font-bold">Student Fee Submission Page</h1>
          <div>
            <Link
              to="/admin/finance_management/view_incomes"
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
              Student Fees Form
            </h2>
            <form
              className="flex flex-col gap-4 w-full px-12 mt-12"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                placeholder="Enter student's name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="text-lg border px-4 py-2"
              />
              <input
                type="text"
                placeholder="Enter student's Father name"
                value={formData.fatherName}
                onChange={(e) =>
                  setFormData({ ...formData, fatherName: e.target.value })
                }
                className="text-lg border px-4 py-2"
              />
              <input
                type="text"
                placeholder="Enter student's Mother name"
                value={formData.motherName}
                onChange={(e) =>
                  setFormData({ ...formData, motherName: e.target.value })
                }
                className="text-lg border px-4 py-2"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                className="text-lg border px-4 py-2"
              />
              <input
                type="text"
                placeholder="Student email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="text-lg border px-4 py-2"
              />
              <select
                value={formData.college}
                disabled={formData.college === "Other" ? true : false}
                onChange={(e) =>
                  setFormData({ ...formData, college: e.target.value })
                }
                className="text-lg border px-4 py-2"
              >
                <option value="">Select Intitute/College/University</option>
                <option value="Guru Nanak Dev Engineering College, Ludhiana">
                  Guru Nanak Dev Engineering College, Ludhiana
                </option>
                <option value="PCTE Group of Institutes">
                  PCTE Group of Institutes
                </option>
                <option value="Ludhiana College of Engineering & Technology (LCET)">
                  Ludhiana College of Engineering & Technology {"(LCET)"}
                </option>
                <option value="Sant Baba Bhag Singh University (SBBSU)">
                  Sant Baba Bhag Singh University {"(SBBSU)"}
                </option>
                <option value="Khalsa Institure of Management and Technology of Women (KIMT)">
                  Khalsa Institure of Management and Technology of Women{" "}
                  {"(KIMT)"}
                </option>
                <option value="Punjab University Chandigarh">
                  Punjab University Chandigarh
                </option>
                <option value="Punjabi University Patiala">
                  Punjabi University Patiala
                </option>
                <option value="RIMT University">RIMT University</option>
                <option value="Gulzar Group of Institutes, Khanna">
                  Gulzar Group of Institutes, Khanna
                </option>
                <option value="Guru Nanak Institute of Management & Technology GNIMT">
                  Guru Nanak Institute of Management & Technology GNIMT
                </option>
                <option value="S.R.S. GOVT. POLYTECHNIC COLLEGE, LUDHIANA">
                  S.R.S. GOVT. POLYTECHNIC COLLEGE, LUDHIANA
                </option>
                <option value="Ludhiana Group of Colleges">
                  Ludhiana Group of Colleges
                </option>
                <option value="Other">Other</option>
              </select>
              {formData.college === "Other" ? (
                <input
                  type="text"
                  placeholder="Enter full College Name with City"
                  value={formData.otherCollege}
                  onChange={(e) =>
                    setFormData({ ...formData, otherCollege: e.target.value })
                  }
                  className="text-lg border px-4 py-2"
                />
              ) : null}
              <select
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="text-lg border px-4 py-2"
              >
                <option value="">Select Course</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Java Programming">Java Programming</option>
                <option value="Python Programming">Python Programming</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Data Science">Data Science</option>
              </select>

              <select
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="text-lg border px-4 py-2"
              >
                <option value="">Course Duration</option>
                <option value="4 Weeks">4 Weeks</option>
                <option value="6 Weeks">6 Weeks</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
              </select>

              <select
                value={formData.batch}
                onChange={(e) =>
                  setFormData({ ...formData, batch: e.target.value })
                }
                className="text-lg border px-4 py-2"
              >
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

              <select
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                className="text-lg border px-4 py-2"
              >
                <option value="">Payment Method</option>
                <option value="UPI(Bank)">
                  UPI{"("}Bank{")"}
                </option>
                <option value="UPI(Personal)">
                  UPI{"("}Personal{")"}
                </option>
                <option value="Cash">Cash</option>
                <option value="Via Cheque">Via Cheque</option>
                <option value="Bank Transfer(NEFT)">
                  Bank Transfer{"("}NEFT{")"}
                </option>
                <option value="Bank Transfer(NetBanking)">
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
                  formData.paymentMethod === "UPI(Bank)" ||
                  formData.paymentMethod === "UPI(Personal)" ? 'block' : 'hidden'
                } text-lg border px-4 py-2`}
              />

              <input
                type="text"
                placeholder="Enter full course fees"
                disabled={formData.paymentMethod ? false : true}
                value={formData.totalFees}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalFees: e.target.value,
                  })
                }
                className="text-lg border px-4 py-2"
              />
              <input
                type="text"
                placeholder="Enter payment amount (First Installment)"
                disabled={formData.paymentMethod ? false : true}
                value={formData.payment}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payment: e.target.value,
                  })
                }
                className="text-lg border px-4 py-2"
              />
              <button className="text-lg text-white bg-emerald-600 py-2 font-bold hover:bg-emerald-400">
                {isLoading ? "Loading...." : "Register Student"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddIncome;
