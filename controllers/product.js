const Product = require("../models/product");

async function getProducts(category) {
  // create empty object for filter
  let filter = {};
  // if category exists, then add to filter
  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter).sort({ _id: 1 });
  return products;
}

async function getProduct(id) {
  const product = await Product.findById(id);
  return product;
}

async function addProduct(name, description, price, category) {
  // create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });

  // save the new product into mongodb
  await newProduct.save();

  return newProduct;
}

async function updateProduct(id, name, description, price, category) {
  return await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    { new: true }
  );
}

async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
