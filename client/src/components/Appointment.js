import { useState, React } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "./Calendar/Calendar.css";
// import "react-calendar/dist/Calendar.css";
import axios from "axios";

const availableTimes = ["8:00 AM", "9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"];

const Appointment = () => {
  // Variables to send to the database:
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");

  const [showTime, setShowTime] = useState(false);
  const [info, setInfo] = useState(false);
  const [nameMissing, setNameMissing] = useState(false);
  const [active, setActive] = useState(null);

  const displayInfo = (e) => {
    setInfo(true);
    setTime(e.target.innerText);
  };

  const submitAppointment = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      setNameMissing(true);
      return;
    }
    setNameMissing(false);

    try {
      await axios.post("http://localhost:3001/appointments/new", {
        date,
        time,
        name,
      });
      console.log("Date is: ", date);
      console.log("Time is: ", time);
      console.log("Name is: ", name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app flex flex-col items-center">
      <div className="flex">
        <p className="m-1">Name: </p>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={
            nameMissing
              ? "rounded-md border-2 border-rose-600 px-2"
              : "rounded-md border-2 border-teal-600 px-2"
          }
          placeholder="Name"
        />
      </div>
      {nameMissing && (
        <div>
          <p className="text-rose-600 text-xs">Name is required</p>
        </div>
      )}
      <div className="mt-5">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={() => setShowTime(true)}
        />
      </div>

      {date.length > 0 ? (
        <p>
          <span>Start: </span>
          {date[0].toDateString()}
          &nbsp; &nbsp;
          <span>End: </span>
          {date[1].toDateString()}
        </p>
      ) : (
        <p>
          Selected date:{" "}
          <span className="font-bold">{date.toDateString()}</span>
        </p>
      )}

      {/* Time Area */}
      {showTime && (
        <div className="times text-center">
          {availableTimes.map((times) => {
            return (
              <div key={times}>
                <button
                  className={`rounded-md border-solid border-[1px] px-2 m-2 border-black hover:bg-teal-300 ${
                    active === times && "active"
                  }`}
                  onClick={(e) => {
                    displayInfo(e);
                    setActive(times);
                  }}
                >
                  {" "}
                  {times}{" "}
                </button>
              </div>
            );
          })}
          <div>
            {info ? (
              <div>
                You have selected <span className="font-bold">{time}</span> on{" "}
                <span className="font-bold">{date.toDateString()}</span>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {/* End Time */}

      <div
        onClick={submitAppointment}
        className="rounded-full bg-teal-700 px-6 py-2 text-white my-2"
      >
        <Link
          to="/success"
          state={{ date: date.toDateString(), time: time, name: name }}
          className="px-6 py-2"
        >
          Submit
        </Link>
      </div>
    </div>
  );
};

export default Appointment;
