const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  userRole: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  
});
module.exports = mongoose.model("Review", ReviewSchema);
