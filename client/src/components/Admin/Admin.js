import React from "react";

import Calendar from "react-calendar";
import "../Calendar/Calendar.css";

const Admin = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold">Admin Control Center</h1>
      <div>Choose the dates and times that you are available</div>
      <div>
        <Calendar />
      </div>
    </div>
  );
};

export default Admin;
