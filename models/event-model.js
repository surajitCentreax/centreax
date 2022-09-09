const mongoose = require("mongoose");
// full_name, address, phone_number, email, user_name, password, blood_group, designation
const eventSchema = mongoose.Schema({
  event_name: {
    type: String,
    require: [true, "Please Provide Event-Name"],
    trim: true,
  },
  event_date: {
    type: String,
    require: [true, "Please Provide Event's Date"],
    trim: true,
  },
  description: {
    type: String,
    require: [true, "Please Provide Description"],
  },
});

module.exports = mongoose.model("event", eventSchema);
