const express = require("express");
const {
  getAllOrders,
  getSingleOrder,
  addOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orders");

const router = express.Router();

// Get All Orders
// Add New Order
router.route("/").get(getAllOrders).post(addOrder);

// Get Single Order By Id
// Update Order
// Delete Order
router.route("/:id").get(getSingleOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
