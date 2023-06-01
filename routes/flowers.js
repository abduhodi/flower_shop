const express = require("express");
const {
  getAllFlowers,
  newFlower,
  getSingleFlower,
  updateFlower,
  deleteFlower,
} = require("../controllers/flowers");

const router = express.Router();

// Get All Flowers
// Create New Flower
router.route("/").get(getAllFlowers).post(newFlower);

// Get Single Flowers
// Update Flower
// Delete Flower
router
  .route("/:id")
  .get(getSingleFlower)
  .put(updateFlower)
  .delete(deleteFlower);

module.exports = router;
