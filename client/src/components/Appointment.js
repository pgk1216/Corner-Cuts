import { useState, React, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "./Calendar/Calendar.css";
// import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { format } from "date-fns";

const Appointment = () => {
  // Variables to send to the database:
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");

  const dateFormat = "yyyy-MM-dd";

  const [info, setInfo] = useState(false);
  const [nameMissing, setNameMissing] = useState(true);
  const [timeMissing, setTimeMissing] = useState(true);
  const [displayNameRequired, setDisplayNameRequired] = useState(false);
  const [displayTimeRequired, setDisplayTimeRequired] = useState(false);
  const [active, setActive] = useState(null);

  // using date, find the correct document, then retrieve the id from that and pass through axios.get
  const [availableTimes, setAvailableTimes] = useState([]);

  const displayInfo = (e) => {
    setInfo(true);
    setTime(e.target.innerText);
  };

  const findTimes = (date) => {
    axios
      .get("http://localhost:3001/appointments/" + date)
      .then((res) => {
        if (res.data[0]) setAvailableTimes(res.data[0].times);
        else setAvailableTimes([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitAppointment = async (e) => {
    e.preventDefault();

    if (name.length === 0 || timeMissing) {
      if (name.length === 0) {
        setNameMissing(true);
        setDisplayNameRequired(true);
      }
      if (timeMissing) setDisplayTimeRequired(true);
      return;
    }
    setNameMissing(false);
    setDisplayNameRequired(false);

    try {
      await axios.post("http://localhost:3001/appointments/new", {
        date,
        time,
        name,
      });
    } catch (error) {
      console.log(error);
    }

    // Delete the time that the user just chose
    // Remove from array then patch the document
    const times = availableTimes.filter(
      (containedTime) => containedTime != time
    );

    axios
      .patch("http://localhost:3001/opentimes/update", {
        date,
        times,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    findTimes(format(date, dateFormat));
  }, []);

  const tileDisabled = ({ activeStartDate, date, view }) => {
    const currentDay = new Date();
    currentDay.setDate(currentDay.getDate() - 1);
    return date < currentDay;
  };

  return (
    <div className="app flex flex-col items-center">
      <div className="flex">
        <p className="m-1">Name: </p>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.length === 0) {
              setNameMissing(true);
              setDisplayNameRequired(true);
            } else {
              setNameMissing(false);
              setDisplayNameRequired(false);
            }
          }}
          className={
            displayNameRequired
              ? "rounded-md border-2 border-rose-600 px-2"
              : "rounded-md border-2 border-teal-600 px-2"
          }
          placeholder="Name"
        />
      </div>
      {displayNameRequired && (
        <div>
          <p className="text-rose-600 text-xs">Name is required</p>
        </div>
      )}
      <div className="mt-5">
        <Calendar
          tileDisabled={tileDisabled}
          onChange={setDate}
          value={date}
          onClickDay={(date) => {
            findTimes(format(date, dateFormat));
          }}
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
      <div className="times text-center">
        {displayTimeRequired && (
          <div className="text-rose-600">Please select a time</div>
        )}
        {availableTimes.map((times) => {
          return (
            <div key={times}>
              <button
                className={`rounded-md border-solid border-[1px] px-2 m-2 border-black hover:bg-teal-300 ${
                  active === times && "active"
                }`}
                onClick={(e) => {
                  setActive(times);
                  setTimeMissing(false);
                  setDisplayTimeRequired(false);
                  displayInfo(e);
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
      {/* End Time */}

      <div
        onClick={(e) => {
          submitAppointment(e);
        }}
        className="rounded-full bg-teal-700 px-6 py-2 text-white my-2"
      >
        <Link
          to={!nameMissing && !timeMissing ? "/success" : ""}
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
