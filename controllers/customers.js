const db = require("../config/connect");

// Get All Customers
function getAllCustomers(req, res) {
  try {
    db.query("select * from customers", (error, result) => {
      if (error) {
        console.log("Error getting customers");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ customers: result.length, data: result });
    });
  } catch (error) {
    console.log("Error execute getting customers code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get Single Customer
function getSingleCustomer(req, res) {
  try {
    const id = req.params.id;
    db.query("select * from customers where id = ?", id, (error, result) => {
      if (error) {
        console.log("Error getting customer by id");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.log("Error execute getting single customer code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Add new Customer
function addCustomer(req, res) {
  try {
    const { name, email } = req.body;
    db.query(
      "insert into customers(name, email) values(?, ?)",
      [name, email],
      (error, result) => {
        if (error) {
          console.log("Error adding new cusomer");
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({
          message: "Customer Successfully Added",
          customerId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.log("Error execute adding customer code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update Customer By Id
function updateCustomer(req, res) {
  try {
    const id = req.params.id;
    db.query("select * from customers where id = ?", id, (error, result) => {
      if (error) {
        console.log("Error getting Customer in order to update");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      const { name, email } = req.body;
      db.query(
        "update customers set name = ?, email = ? where id = ?",
        [name, email, id],
        (error) => {
          if (error) {
            console.log("Error updating customer");
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json({ message: "Successfully Updated" });
        }
      );
    });
  } catch (error) {
    console.log("Error execute updating customer code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete Customer By Id
function deleteCustomer(req, res) {
  try {
    const id = req.params.id;
    db.query("select * from customers where id = ?", id, (error, result) => {
      if (error) {
        console.log("Error while searching customer to delete");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Customer Not Found" });
      }
      db.query("delete from customers where id = ?", id, (error) => {
        if (error) {
          console.log("Error while deleting customer");
          return res.status(500).json({ error: "internal Server Error" });
        }
        res.json({ message: "Customer Successfully Deleted" });
      });
    });
  } catch (error) {
    console.log("Error execute delete customer code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllCustomers,
  getSingleCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
