const express = require("express");
const {
  getAllCustomers,
  getSingleCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers");

const router = express.Router();

// Get All Customers
// Add new Customer
router.route("/").get(getAllCustomers).post(addCustomer);

// Get Single Customer by Id
// Update Customer by id
router
  .route("/:id")
  .get(getSingleCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
