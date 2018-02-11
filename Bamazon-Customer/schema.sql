DROP DATABASE IF EXISTS BamazonDB;
CREATE database BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  item_id INT(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("darth vader", "toys", 10, 100), ("foundation trilogy", "books", 20, 100), ("mass effect", "video games", 59, 100), ("titanfall", "video games", 59, 100), ("red shirt", "clothes", 10, 100), ("blue jeans", "clothes", 10, 100), ("red solo cup", "home", 1.99, 500), ("candle", "home", 5, 10), ("hammock", "outdoors", 249.99, 50), ("x-wing", "toys", 19.99, 40);
