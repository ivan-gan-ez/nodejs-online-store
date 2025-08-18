const express = require("express");

// create express router
const router = express.Router();

const Product = require("../models/product");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

/*
  GET /products - all products
  GET /products/[id] - specific product by id
  POST /products - add new product
  PUT /products/[id] - update product by id
  DELETE /products/[id] - delete product by id
*/

// GET /products - all products

router.get("/", async (req, res) => {
  const category = req.query.category;

  const products = await getProducts(category);
  res.status(200).send(products);
});

// GET /products/[id] - specific product by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProduct(id);
  res.status(200).send(product);
});

//  POST /products - add new product
/*
  following params required:
  - name
  - description
  - price
  - category
*/

router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    if (!name || !price || !category) {
      return res.status(400).send({ message: "You're missing something." });
    }

    const newProduct = await addProduct(name, description, price, category);

    res.send(newProduct);
  } catch (error) {
    res.status(400).send({ message: "my komputr borken. hlelp" });
  }
});

// PUT /products/[id] - update product by id

router.put("/:id", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    if (!name || !price || !category) {
      return res.status(400).send({ message: "You're missing something." });
    }

    const id = req.params.id;

    res
      .status(200)
      .send(await updateProduct(id, name, description, price, category));
  } catch (error) {
    res.status(400).send({ message: "my komputr borken. hlelp" });
  }
});

// DELETE /products/[id] - delete product by id

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(200).send({
      message: `${id} has been deleted.`,
    });
  } catch (error) {
    res.status(400).send({ message: "my komputr borken. hlelp" });
  }
});

module.exports = router;
