import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Admin/Login";
import { useDispatch, useSelector } from "react-redux";
import AddStaff from "./Components/Admin/AddStaff";
import Dashboard from "./Components/Admin/Dashboard";
import ViewStaff from "./Components/Admin/ViewStaff";
import Logout from "./Components/Admin/Logout";
import AddExpense from "./Components/Admin/AddExpense";
import ViewExpenses from "./Components/Admin/ViewExpenses";
import Schedule from "./Components/Admin/Schedule";
import FinanceMG from "./Components/Admin/FinanceMG";
import StaffMG from "./Components/Admin/StaffMG";
import BatchMG from "./Components/Admin/BatchMG";
import ViewBatches from "./Components/Admin/ViewBatches";
import AddIncome from "./Components/Admin/AddIncome";
import ViewIncomes from "./Components/Admin/ViewIncomes";
import RegisterStudent from './Components/Admin/RegisterStudent';
import PageNotFound from "./Components/Admin/PageNotFound";
import {
  adminAuthenticationAction,
} from "./Redux/actions/admin";

function App() {
  const Admin = useSelector((state) => state.AdminGS.Admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminAuthenticationAction());
  }, []);

  useEffect(()=>{
    document.title="Home"
  },[])

  return (
    <div className="font-roboto bg-zinc-100">
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={Admin && Admin.token ? <Dashboard /> : <PageNotFound />}
          ></Route>
          <Route path="/admin/login" element={<Login />}></Route>
          <Route
            path="/admin/finance_management"
            element={Admin && Admin.token ? <FinanceMG /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/staff_management"
            element={Admin && Admin.token ? <StaffMG /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/batch_management"
            element={Admin && Admin.token ? <BatchMG /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/staff_management/add_staff"
            element={Admin && Admin.token ? <AddStaff /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/staff_management/view_staff"
            element={Admin && Admin.token ? <ViewStaff /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/finance_management/add_expense"
            element={Admin && Admin.token ? <AddExpense /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/finance_management/add_income"
            element={Admin && Admin.token ? <AddIncome /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/finance_management/view_expenses"
            element={Admin && Admin.token ? <ViewExpenses /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/finance_management/view_incomes"
            element={Admin && Admin.token ? <ViewIncomes /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/batch_management/create_batch"
            element={Admin && Admin.token ? <Schedule /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/batch_management/view_batches"
            element={Admin && Admin.token ? <ViewBatches /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/batch_management/student_registration"
            element={Admin && Admin.token ? <RegisterStudent/> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/schedule_classes"
            element={Admin && Admin.token ? <Schedule /> : <PageNotFound />}
          ></Route>
          <Route
            path="/admin/logout"
            element={Admin && Admin.token ? <Logout /> : <PageNotFound />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
