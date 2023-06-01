// const connection = require("./connect");
// const fs = require("fs");
// const path = require("path");

// const query = `create table orders(
//   id int primary key auto_increment not null,
//   customer_id int,
//   flower_id int,
//   quantity int,
//   foreign key(customer_id) references customers(id)
//   on delete cascade,
//   foreign key(flower_id) references flowers(id)
//   on delete cascade
// );`;
// connection.query(query, (error, result) => console.log(result));
// connection.query("show tables", (error, result) => console.log(result));
