const { Schema, model } = require("mongoose");

// declare schema for Movies
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

// create model from schema
const Product = model("Product", productSchema);

module.exports = Product;
