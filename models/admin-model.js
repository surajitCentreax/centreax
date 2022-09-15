const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  full_name: {
    type: String,
    require: [true, "Please Provide Full-Name"],
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
  password: {
    type: String, select: false,
    require: [true, "Please Provide Password"],
    minLength: [8, "Password must be more than 8 characters"],
  }
});

module.exports = mongoose.model("admin", adminSchema);
