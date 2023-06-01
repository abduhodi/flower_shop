const db = require("../config/connect");

exports.getAllFlowers = (req, res) => {
  try {
    db.query("select * from flowers", (error, result, fields) => {
      if (error) {
        console.log("Error retrieving flowers", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({
        flowers: result.length,
        data: result,
      });
    });
  } catch (error) {
    console.log("Error while execute get All flowers code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get a single flower by Id
exports.getSingleFlower = (req, res) => {
  try {
    const flowerId = req.params.id;
    db.query(
      "select * from flowers where id = ?",
      flowerId,
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (result.length == 0) {
          return res.status(404).json({
            status: 404,
            message: "Flower not found",
          });
        }
        res.json(result[0]);
      }
    );
  } catch (error) {
    console.log("Error while execute get single flower code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// create new flower
exports.newFlower = (req, res) => {
  try {
    const { name, color, price } = req.body;
    db.query(
      "insert into flowers(name, color, price) values(?, ?, ?)",
      [name, color, price],
      (error, result) => {
        if (error) {
          console.log("Error creating new flower");
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({
          message: "Flower created successfully",
          flowerId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.log("Error while execute adding flower code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update flower
exports.updateFlower = (req, res) => {
  try {
    const flowerId = req.params.id;
    db.query(
      "select * from flowers where id = ?",
      flowerId,
      (error, result) => {
        if (result.length === 0) {
          console.log("Flower not found");
          return res.status(404).json({ error: "Flower not found" });
        }

        const { name, color, price } = req.body;
        db.query(
          "update flowers set name = ?, color = ?, price = ? where id = ?",
          [name, color, price, flowerId],
          (error) => {
            if (error) {
              console.log("Flower update error");
              return res.status(500).json({ error: "Internal Server Error" });
            }
            res.json({ message: "Flower successfully updated" });
          }
        );
      }
    );
  } catch (error) {
    console.log("Error while execute update flower code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete single flower by Id
exports.deleteFlower = (req, res) => {
  try {
    const flowerId = req.params.id;
    db.query(
      "select * from flowers where id = ?",
      flowerId,
      (error, result) => {
        if (result.length === 0) {
          console.log("Flower not found");
          return res.status(404).json({ error: "Flower not found" });
        }

        db.query("delete from flowers where id = ?", flowerId, (error) => {
          if (error) {
            console.log("Error while deleting flower");
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json({ message: "Flower successfully deleted" });
        });
      }
    );
  } catch (error) {
    console.log("Error while execute delete flower code");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
