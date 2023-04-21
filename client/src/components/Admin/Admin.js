import React, { useEffect, useState } from "react";

import Calendar from "react-calendar";
import "../Calendar/Calendar.css";
import { format } from "date-fns";
import { TiDelete } from "react-icons/ti";
import axios from "axios";

const hourOptions = [
  "12",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
];
const minuteOptions = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];

const Admin = () => {
  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState([]);

  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [ampm, setAMPM] = useState("AM");

  const dateFormat = "yyyy-MM-dd";

  // Make sure there are no repeats
  const addTime = () => {
    // Construct overall time
    const timeToAdd = hour + ":" + minute + " " + ampm;

    if (!times.includes(timeToAdd)) {
      setTimes(times.concat(timeToAdd).sort());
    } else {
      alert("Date already exists!");
    }
  };

  const deleteTime = (time) => {
    const updatedTimes = times.filter(
      (containedTime) => containedTime !== time
    );

    setTimes(updatedTimes);
  };

  const pushTimesToDatabase = async (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:3001/appointments/" + format(date, dateFormat))
      .then((res) => {
        if (res.data[0]) {
          axios
            .patch("http://localhost:3001/opentimes/update", {
              date,
              times,
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          try {
            axios.post("http://localhost:3001/opentimes/new", {
              date,
              times,
            });
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    alert("Pushed to database!");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/appointments/" + format(date, dateFormat))
      .then((res) => {
        if (res.data[0]) setTimes(res.data[0].times);
        else setTimes([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date]);

  const tileDisabled = ({ activeStartDate, date, view }) => {
    const currentDay = new Date();
    currentDay.setDate(currentDay.getDate() - 1);
    return date < currentDay;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold">Admin Control Center</h1>
      <div>
        <p>Choose the dates and times that you are available</p>
      </div>
      <div>
        <Calendar onChange={setDate} value={date} tileDisabled={tileDisabled} />
      </div>
      <div>
        <p>
          Add time slots for{" "}
          <span className="font-bold">{date.toDateString()}</span>:
        </p>
      </div>
      <div className="flex">
        <select
          name="hour"
          id="hour"
          onChange={(e) => setHour(e.target.value)}
          className="border-2 border-black"
        >
          {hourOptions.map((hours) => {
            return (
              <option key={hours} value={hours}>
                {hours}
              </option>
            );
          })}
        </select>
        <p className="font-bold"> : </p>
        <select
          name="minute"
          id="minute"
          onChange={(e) => setMinute(e.target.value)}
          className="border-2 border-black"
        >
          {minuteOptions.map((minutes) => {
            return (
              <option key={minutes} value={minutes}>
                {minutes}
              </option>
            );
          })}
        </select>
        <select
          name="am-pm"
          id="am-pm"
          onChange={(e) => setAMPM(e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <button
          onClick={addTime}
          className="rounded-full bg-teal-700 text-white px-5 py-1"
        >
          Add
        </button>
      </div>
      <div className="mt-5">
        <p>Times currently selected as available:</p>
      </div>
      <div className="flex">
        {times.map((time) => {
          return (
            <div key={time} className="flex m-3 text-lg">
              <span>{time}</span>
              <span
                onClick={(e) => {
                  deleteTime(time);
                }}
                className="m-1 cursor-pointer text-xl"
              >
                <TiDelete />
              </span>
            </div>
          );
        })}
      </div>

      <div>
        <button
          onClick={pushTimesToDatabase}
          className="rounded-full bg-teal-700 text-white px-4 py-2"
        >
          Update Availability
        </button>
      </div>
    </div>
  );
};

export default Admin;

/**
 *
 *
 * TODOS:
 * - Fetch times array from database using date
 *
 */
