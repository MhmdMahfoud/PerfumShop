const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
  },
  status: {
    type: String,
  },
});
module.exports=mongoose.model("Order",OrderSchema)