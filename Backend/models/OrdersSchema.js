const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Products"
  },
  status: {
    type: String,
  },
  quantity:{
    type:Number
  },
  address:{
    type:String
  }
});
module.exports=mongoose.model("Order",OrderSchema)