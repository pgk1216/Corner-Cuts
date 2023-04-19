import React from "react";

import AdminLogin from "./Admin/AdminLogin";

const Home = () => {
  const name = "Philip Kim";

  return (
    <div>
      <AdminLogin />
      <div className="text-center py-10">
        <p className="text-xl">
          Welcome to Corner Cuts! My name is{" "}
          <span className="text-teal-700 font-bold">{name}</span> and I cut
          hair!
        </p>
      </div>
      <div className="flex justify-center items-center my-10">
        <a
          href="/appointments"
          className="text-center py-4 px-6 rounded-full bg-teal-700 text-white"
        >
          Book An Appointment Now!
        </a>
      </div>
    </div>
  );
};

export default Home;

/* 

This file should contain no logic in terms of communicating with the server and database

*/
