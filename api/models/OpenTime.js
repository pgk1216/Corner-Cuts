const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpenTimeSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  times: [
    {
      type: String,
      required: true,
    },
  ],
});

const OpenTime = mongoose.model("OpenTimes", OpenTimeSchema);

module.exports = OpenTime;
