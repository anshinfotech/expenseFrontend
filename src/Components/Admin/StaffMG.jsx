import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function StaffMG() {
  const Links = [
    {
      id: 1,
      path: "/admin/staff_management/add_staff",
      icon: "fa-solid fa-user",
      title: "Add New Staff Member",
    },
    {
      id: 2,
      path: "/admin/staff_management/view_staff",
      icon: "fa-solid fa-eye",
      title: "View All Members",
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="w-100 h-screen ps-96 pt-5">
        <h1 className="text-5xl font-bold">Staff Management Panel</h1>

        <div className="mt-10 grid grid-cols-2">
          {Links.map((item) => {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="w-56 h-56 bg-white shadow-xl flex flex-col items-center justify-center gap-4 hover:bg-emerald-100"
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

export default StaffMG;
