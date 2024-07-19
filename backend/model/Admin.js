const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: {
    data: Buffer,  // Using Buffer to store binary data
    contentType: String,
  }
});

module.exports = mongoose.model("Admin", adminSchema);
