# Create database script for Berties books

# Create the database
CREATE DATABASE myBookshop;
USE myBookshop;

# Create the tables
CREATE TABLE books (id INT AUTO_INCREMENT,name VARCHAR(50),price DECIMAL(5, 2) unsigned,PRIMARY KEY(id));

# Insert data into the tables
INSERT INTO books (name, price)VALUES('database book', 40.25),('Node.js book', 25.00), ('Express book', 31.99) ;