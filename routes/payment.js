const express = require("express");
const { verifyPayment } = require("../controllers/payment");
const router = express.Router();

/*
http://localhost:5173/verify-payment?
billplz[id]=e62b74befb9d0399
billplz[paid]=true
billplz[paid_at]=2025-08-26 11:20:02 +0800
billplz[x_signature]=7feb1555f1cbaf5357157c62dc6c5dbefdf425e57e6cdc271ef30d0841898ec8
*/

router.post("/", async (req, res) => {
  try {
    const billplz_id = req.body.billplz_id;
    const billplz_paid = req.body.billplz_paid;
    const billplz_paid_at = req.body.billplz_paid_at;
    const billplz_x_signature = req.body.billplz_x_signature;

    const updatedOrder = await verifyPayment(
      billplz_id,
      billplz_paid,
      billplz_paid_at,
      billplz_x_signature
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "my komputr borken. hlelp" });
  }
});

module.exports = router;
