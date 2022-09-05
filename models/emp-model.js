const mongoose = require("mongoose");
// full_name, address, phone_number, email, user_name, password, blood_group, designation
const empSchema = mongoose.Schema({
  full_name: {
    type: String,
    require: [true, "Please Provide Full-Name"],
    trim: true,
  },
  address: {
    type: String,
    require: [true, "Please Provide Address"],
    trim: true,
  },
  phone_number: {
    type: Number, unique: true,
    require: [true, "Please Provide Phone Number"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Please Provide Email"],
    unique: true,
  },
  user_name: {
    type: String,
    require: [true, "Please Provide unique User-Name "],
    unique: true,
    trim: true,
  },
  password: {
    type: String, select: false,
    require: [true, "Please Provide Password"],
    minLength: [8, "Password must be more than 8 characters"],
  },
  blood_group: {
    type: String,
    require: [true, "Please Provide Blood Group"],
    trim: true,
  },
  designation: { type: String, require: [true, "Please Provide Designation"] },
});

module.exports = mongoose.model("employee", empSchema);
