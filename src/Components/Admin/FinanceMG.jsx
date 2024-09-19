import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function FinanceMG() {
  const Links = [
    {
      id: 1,
      path: "/admin/finance_management/add_expense",
      icon: "fa-solid fa-money-bill",
      title: "Add Expense",
    },
    {
      id: 2,
      path: "/admin/finance_management/view_expenses",
      icon: "fa-solid fa-eye",
      title: "View Expenses",
    },
    {
      id: 3,
      path: "/admin/finance_management/add_income",
      icon: "fa-solid fa-money-bill",
      title: "Add Income",
    },
    {
      id: 4,
      path: "/admin/finance_management/view_incomes",
      icon: "fa-solid fa-eye",
      title: "View Income Details",
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="w-100 h-screen ps-96 pt-5">
        <h1 className="text-5xl font-bold">Finance Management Panel</h1>

        <div className="mt-10 grid grid-cols-4">
          {Links.map((item) => {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="w-56 h-56 bg-white shadow-xl flex flex-col my-4 items-center justify-center gap-4 hover:bg-emerald-100 px-4"
              >
                <i className={`text-6xl ${item.icon}`}></i>
                <h3 className="text-2xl text-center">{item.title}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FinanceMG;
