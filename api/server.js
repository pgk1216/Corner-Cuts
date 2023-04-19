const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Appointment = require("./models/Appointment");

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

app.post("/appointments/new", (req, res) => {
  const appointments = new Appointment({
    date: new Date(req.body.date),
    time: req.body.time,
    clientName: req.body.name,
  });

  appointments.save();

  res.json(appointments);
});

app.delete("/appointments/delete/:id", async (req, res) => {
  const result = await Appointment.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.listen(3001, () => console.log("Server started on port 3001"));
