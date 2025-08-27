const { Schema, model } = require("mongoose");

/* fields needed in order:
    - name
    - email
    - products
    - total price
    - status
        pending
        paid
        failed
        completed
    - billplz_id
    - paid_at
 */

const orderSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  products: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "failed", "completed"],
  },
  billplz_id: String,
  paid_at: Date,
});

const Order = model("Order", orderSchema);
module.exports = Order;
