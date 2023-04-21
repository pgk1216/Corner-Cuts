// API KEY: MMx9j0QwbNwLSfpi964HVM4LkmIAEeQZzpY18aUEB4iUQUhDHAoDyGSsHX2o0K3B

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { format } = require("date-fns");

const Appointment = require("./models/Appointment");
const OpenTime = require("./models/OpenTime");

const dbURI =
  "mongodb+srv://pgkAdmin:HJleP4Uovg1rjpPP@cornercuts.uauy0hw.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo DB!"))
  .catch(console.error);

app.get("/appointments", async (req, res) => {
  const appointments = await Appointment.find();

  res.json(appointments);
});

app.get("/opentimes", async (req, res) => {
  const opentimes = await OpenTime.find();

  res.json(opentimes);
});

app.post("/appointments/new", (req, res) => {
  const appointments = new Appointment({
    date: format(new Date(req.body.date), "yyyy-MM-dd"),
    time: req.body.time,
    clientName: req.body.name,
  });

  appointments.save();

  res.json(appointments);
});

app.post("/opentimes/new", (req, res) => {
  const opentimes = new OpenTime({
    date: format(new Date(req.body.date), "yyyy-MM-dd"),
    times: req.body.times,
  });

  opentimes.save();

  res.json(opentimes);
});

app.patch("/opentimes/update", async (req, res) => {
  await OpenTime.findOneAndUpdate(
    { date: format(new Date(req.body.date), "yyyy-MM-dd") },
    { times: req.body.times },
    { new: true }
  );
});

app.get("/appointments/:date", async (req, res) => {
  const availableTimesAtDate = await OpenTime.find({
    date: req.params.date,
  });

  res.json(availableTimesAtDate);
});

app.delete("/appointments/delete/:id", async (req, res) => {
  const result = await Appointment.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.listen(3001, () => console.log("Server started on port 3001"));
