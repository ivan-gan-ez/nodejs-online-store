const { Schema, model } = require("mongoose");

// declare schema for Products
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  // creating linkage between product category and category model
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String, required: false },
});

// create model from schema
const Product = model("Product", productSchema);

module.exports = Product;
