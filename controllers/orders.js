const db = require("../config/connect");

// Get All Orders
function getAllOrders(req, res) {
  try {
    const query = `
    select o.id, c.name, c.email, f.name as flower, f.color, f.price, o.quantity
    from orders as o join customers as c on o.customer_id = c.id
    join flowers as f on o.flower_id = f.id
  `;
    db.query(query, (error, result) => {
      if (error) {
        console.log("Error while getting orders");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ orders: result.length, data: result });
    });
  } catch (error) {
    console.log("Error while execute get all order code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get Single Order
function getSingleOrder(req, res) {
  try {
    const id = req.params.id;
    const query = `select o.id, c.name, c.email, f.name as flower, f.color, f.price, o.quantity
    from orders as o join customers as c on o.customer_id = c.id
    join flowers as f on o.flower_id = f.id where o.id = ?`;
    db.query(query, id, (error, result) => {
      if (error) {
        console.log("Error while getting single order");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Order Not Found" });
      }
      res.json(result[0]);
    });
  } catch (error) {
    console.log("Error while execute get single order code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Add New Order
function addOrder(req, res) {
  try {
    const { customer_id, flower_id, quantity } = req.body;
    db.query(
      "insert into orders (customer_id, flower_id, quantity) values(?, ?, ?)",
      [customer_id, flower_id, quantity],
      (error, result) => {
        if (error) {
          console.log("Error while creating new order");
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({
          message: "New Order Created Successfully",
          orderId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.log("Error while execute adding order code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete Order
function deleteOrder(req, res) {
  try {
    const id = req.params.id;
    db.query("select * from orders where id = ?", id, (error, result) => {
      if (error) {
        console.log("Error while searching order to delete");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      db.query("delete from orders where id = ?", id, (error) => {
        if (error) {
          console.log("Error while deleting order");
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ message: "Order Successfully Deleted" });
      });
    });
  } catch (error) {
    console.log("Error while execute delete order code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update Order
function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const { customer_id, flower_id, quantity } = req.body;
    db.query("select * from orders where id = ?", id, (error, result) => {
      if (error) {
        console.log("Error while searching order to update");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      db.query(
        "update orders set customer_id = ?, flower_id = ?, quantity = ? where id = ?",
        [customer_id, flower_id, quantity, id],
        (error) => {
          if (error) {
            console.log("Error while updating order");
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json({ message: "Order Successfully updated" });
        }
      );
    });
  } catch (error) {
    console.log("Error while execute update order code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  addOrder,
  deleteOrder,
  updateOrder,
};
