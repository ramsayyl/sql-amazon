DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  item_id int AUTO_INCREMENT NOT NULL,
  product_name varchar(50) NOT NULL,
  department_name varchar(50),
  price decimal(5, 2) NOT NULL,
  stock_quantity int NOT NULL,
  product_sales int NOT NULL,
  PRIMARY KEY (item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('TV', 'Electronics', 300.00, 5, 0),
	   ('Playstation', 'Electronics', 250.00, 10, 0),
	   ('Laptop', 'Electronics', 225.00, 20, 0),
       ('Chips', 'Food', 3.00, 100, 0),
       ('Jeans', 'Clothing', 45.00, 50, 0),
       ('Cereal', 'Food', 5.00, 10, 0),
       ('iPhone', 'Electronics', 600.00, 5, 0),
       ('Soccer Ball', 'Sports', 60.00, 150, 0),
       ('Shirts', 'Clothing', 15.00, 30, 0),
       ('Rice', 'Food', 10.00, 35, 0);

DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
	department_id int auto_increment NOT NULL,
    department_name varchar(50),
    over_head_costs int,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Electronics', 100),
	   ('Food', 50),
       ('Clothing', 25),
       ('Sports', 75);
