const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },

  productCategory: {
    type: String,
    required: true,
  },

  productImage: {
    type: String, // Assuming you want to store the image URL as a string
    required: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
