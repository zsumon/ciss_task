-- create database cars_db;

drop table if exists cars;
CREATE TABLE cars(
	id SERIAL PRIMARY KEY,
  	manufacturer VARCHAR(255),
  	model VARCHAR(255),
	c_year VARCHAR(255),
	country VARCHAR(255)
);
