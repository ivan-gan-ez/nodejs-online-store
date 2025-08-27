const axios = require("axios");

const Order = require("../models/order");

const getOrders = async () => {
  const orders = await Order.find().sort({ _id: -1 });
  return orders;
};

const getOrder = async (id) => {
  const order = await Order.findById(id);
  return order;
};

const addNewOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  const billplzResponse = await axios.post(
    process.env.BILLPLZ_API_URL + "v3/bills",
    {
      collection_id: process.env.BILLPLZ_COLLECTION_ID,
      description: "Payment for React eCommerce",
      name: customerName,
      email: customerEmail,
      amount: parseFloat(totalPrice) * 100, //convert to sen
      callback_url: process.env.FRONTEND_URL + "verify-payment",
      redirect_url: process.env.FRONTEND_URL + "verify-payment",
    },
    {
      auth: {
        username: process.env.BILLPLZ_API_KEY,
        password: "",
      },
    }
  );

  const billplz_id = billplzResponse.data.id;
  const billplz_url = billplzResponse.data.url;

  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrice,
    billplz_id: billplz_id,
  });
  await newOrder.save();

  //return order with billplz url
  return { ...newOrder, billplz_url };
};

const updateOrder = async (id, status) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  return updatedOrder;
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = { getOrders, getOrder, addNewOrder, updateOrder, deleteOrder };
