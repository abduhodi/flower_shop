create table flowers(
  id int primary key auto_increment not null,
  name varchar(255) not null,
  color varchar(255),
  price float(10,2)
);

create table customers(
  id int primary key auto_increment not null,
  name varchar(255) not null,
  email varchar(255)
);

create table orders(
  id int primary key auto_increment not null,
  customer_id int,
  flower_id int,
  quantity int,
  foreign key(customer_id) references customers(id)
  on delete cascade,
  foreign key(flower_id) references flowers(id)
  on delete cascade
);