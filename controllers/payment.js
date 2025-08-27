const { createHmac } = require("crypto");

const Order = require("../models/order");
const { create, findById } = require("../models/product");

const verifyPayment = async (
  billplz_id,
  billplz_paid,
  billplz_paid_at,
  billplz_x_signature
) => {
  // console.log(billplz_id);

  // generate xsig from our end
  const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
  const x_signature = createHmac("sha256", process.env.BILLPLZ_X_SIGNATURE)
    .update(billplz_string)
    .digest("hex");

  // console.log(x_signature);
  // console.log(billplz_x_signature);

  // compare generated xsig with billplz's provided xsig
  if (x_signature !== billplz_x_signature) {
    throw new Error("Signature invalid.");
  }

  // find order using billplz id
  const selectedOrder = await Order.findOne({ billplz_id: billplz_id });
  console.log(selectedOrder);

  // check if order exists
  if (!selectedOrder) {
    throw new Error("Order not found.");
  }

  // if exists, update order status and paid_at date
  if (billplz_paid === "true") {
    // it work
    selectedOrder.status = "paid";
    selectedOrder.paid_at = billplz_paid_at;
  } else {
    // it not work
    selectedOrder.status = "failed";
  }

  // save order
  await selectedOrder.save();

  // return updated order
  return selectedOrder;
};

module.exports = { verifyPayment };
