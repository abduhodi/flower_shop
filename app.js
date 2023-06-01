const express = require("express");
require("dotenv").config();
const app = express();

//Middleware json parser
app.use(express.json());

//Mount routes
app.use("/", require("./routes"));

// Run server
const port = process.env.PORT || 3333;
app.listen(port, console.log(`Server running on port ${port}`));
