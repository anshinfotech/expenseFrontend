import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const Links = [
    {
      id: 1,
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: "fa-solid fa-house",
    },
    // {
    //   id: 2,
    //   title: "Staff Management",
    //   path: "/admin/staff_management",
    //   icon: "fa-solid fa-users",
    // },
    {
      id: 3,
      title: "Finance Management",
      path: "/admin/finance_management",
      icon: "fa-solid fa-money-bill",
    },
    // {
    //   id: 4,
    //   title: "Batch Management",
    //   path: "/admin/batch_management",
    //   icon: "fa-solid fa-people-group",
    // },
    {
      id: 5,
      title: "Logout account",
      path: "/admin/logout",
      icon: "fa-solid fa-right-from-bracket",
    },
  ];

  return (
    <div>
      <div className="sidebar w-80 h-screen bg-emerald-600 flex flex-col items-center pt-10 px-4 gap-4 fixed top-0 start-0 bottom-0">
        {Links.map((item) => {
          return (
            <Link
              className="w-full bg-white text-xl px-2 flex items-center rounded-md py-1  gap-5 justify-center"
              to={item.path}
              key={item.id}
            >
              <i className={`${item.icon}`}></i>
              <h3 className="font-medium hover:underline">{item.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
