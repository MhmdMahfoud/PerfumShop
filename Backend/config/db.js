const mongoose = require("mongoose");
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connection Successfuly")
  } catch (error) {
    console.log("You have an error",error)
  }
};
module.exports=ConnectDB