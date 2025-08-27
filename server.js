require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// connect to mongodb with a mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/store");
  } catch (error) {
    console.log("server asleep. sory");
  }
}

// trogger de function
connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Greetings and salutations!");
});

// import all the routers
const productRouter = require("./routes/product");
app.use("/products", productRouter);

app.use("/orders", require("./routes/order"));

app.use("/payment", require("./routes/payment"));

app.listen(6789, () => {
  console.log("Server currently running at http://localhost:6789");
});
