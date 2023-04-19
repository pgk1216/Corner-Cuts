import React from "react";
import { useLocation } from "react-router-dom";

const Booked = () => {
  const location = useLocation();
  const { date, time, name } = location.state;

  const displayLocation = () => {
    console.log(location);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl">Success!</h1>
      <p className="m-5">
        Your appointment at <span className="font-bold">{time}</span> on{" "}
        <span className="font-bold">{date}</span> for{" "}
        <span className="font-bold">{name}</span> has been successfully booked!
      </p>
      <div>
        <a
          href="/"
          className="rounded-full bg-teal-700 px-6 py-2 text-white my-2"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default Booked;
