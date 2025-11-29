const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    require:true
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});
module.exports = mongoose.model("User", UserSchema);
