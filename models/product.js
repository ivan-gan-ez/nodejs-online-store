const { Schema, model } = require("mongoose");

// declare schema for Products
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: false },
});

// create model from schema
const Product = model("Product", productSchema);

module.exports = Product;
