DROP DATABASE IF EXISTS BamazonSuperDB;
CREATE database BamazonSuperDB;

USE BamazonSuperDB;

CREATE TABLE products (
  item_id INT(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  product_sales DECIMAL(10,2),
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, product_sales, department_name, price, stock_quantity)
VALUES ("darth vader", 0, "toys", 10, 100), ("foundation trilogy", 0, "books", 20, 100), ("mass effect", 0, "video games", 59, 100), ("titanfall", 0, "video games", 59, 100), ("red shirt", 0, "clothes", 10, 100), ("blue jeans", 0, "clothes", 10, 100), ("red solo cup", 0, "home", 1.99, 500), ("candle", 0, "home", 5, 10), ("hammock", 0, "outdoors", 249.99, 50), ("x-wing", 0, "toys", 19.99, 40);
