const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  size: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});
module.exports=mongoose.model("Products",ProductSchema)
