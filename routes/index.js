const express = require("express");
const router = express.Router();

//Mount flowers route
router.use("/flowers", require("./flowers"));

// Mount customer
router.use("/customers", require("./customers"));

// Mount orders route
router.use("/orders", require("./orders"));

module.exports = router;
