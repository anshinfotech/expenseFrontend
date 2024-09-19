import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

function ViewBatches() {
  const [isDetailCard, setIsDetailCard] = useState(false);

  const classes = [
    {
      id: 1,
      class: "Web Development",
      batch: "Morning 9-11",
      duration: "4 Weeks",
      Mentor: "John Wick",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20231205165904/web-development-image.webp",
    },
    {
      id: 2,
      class: "Computer Vision",
      batch: "Morning 10-12",
      duration: "6 Weeks",
      Mentor: "Kuldeep",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240319155102/what-is-ai-artificial-intelligence.webp",
    },
    {
      id: 3,
      class: "Digital Marketing",
      batch: "Afternoon 1-2",
      duration: "6 Months",
      Mentor: "Shristy Sharma",
      image: "https://etimg.etb2bimg.com/photo/89866384.cms",
    },
    {
      id: 4,
      class: "Cyber Security",
      batch: "Evening 4-6",
      duration: "6 Months",
      Mentor: "Jaspreet Singh",
      image:
        "https://media.licdn.com/dms/image/v2/D5612AQE0r5WC8r0HQg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1657711469335?e=2147483647&v=beta&t=AA7ierE6T8n-g7EDphWBu9qKdqcsXkOXo4tj7xg146s",
    },
  ];

  return (
    <>
      <Toaster richColors position="bottom-right"></Toaster>
      <Sidebar />
      <div className="w-100 h-screen ps-96 pt-5 pe-5 overflow-scroll">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Classes Schedule</h1>
          <div>
            <Link
              to="/admin/batch_management"
              className="px-4 py-2 text-lg font-bold hover:underline"
            >
              Go Back
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-10">
          {classes.map((item) => {
            return (
              <Link>
                <div className="w-80 h-80 bg-white mx-auto my-5">
                  <div className="image_con w-full h-2/3">
                    <img
                      src={item.image}
                      alt="Image Not Found"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="content-body h-1/3 px-4 flex flex-col gap-1 pt-2">
                    <span>
                      <b>Class :</b> {item.class}
                    </span>
                    <span>
                      <b>Batch :</b> {item.batch}
                    </span>
                    <span>
                      <b>Duration :</b> {item.duration}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ViewBatches;
