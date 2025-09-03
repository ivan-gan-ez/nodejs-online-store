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
app.use("/products", require("./routes/product"));
app.use("/orders", require("./routes/order"));
app.use("/payment", require("./routes/payment"));
app.use("/image", require("./routes/image"));
app.use("/categories", require("./routes/category"));
app.use("/users", require("./routes/user"));

//set up static path for the uploads folder

app.use("/uploads", express.static("uploads"));

app.listen(6789, () => {
  console.log("Server currently running at http://localhost:6789");
});
