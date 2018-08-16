DROP DATABASE IF EXISTS bamazon;

-- Database being used for entire application
CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

-- Table being referenced for part one & two
CREATE TABLE products (
  item_id int AUTO_INCREMENT NOT NULL,
  product_name varchar(50) NOT NULL,
  department_name varchar(50),
  price float(5, 2) NOT NULL,
  stock_quantity int NOT NULL,
  product_sales int,
  PRIMARY KEY (item_id)
);

-- Dummy values
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('TV', 'Electronics', 300.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Playstation', 'Electronics', 250.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Laptop', 'Electronics', 225.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Chips', 'Food', 3.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Jeans', 'Clothing', 45.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cereal', 'Food', 5.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('iPhone', 'Electronics', 600.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Soccer Ball', 'Sports', 60.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Shirts', 'Clothing', 15.00, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Rice', 'Food', 10.00, 35);

DROP TABLE IF EXISTS departments;

-- Table being referenced for part three
CREATE TABLE departments (
  department_id int NOT NULL,
  department_name varchar(50) NOT NULL,
  over_head_costs int NOT NULL
);
