const mongoose = require("mongoose");
const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  createAt: { type: Date },
});
module.exports = mongoose.model("Categories", CategoriesSchema);
