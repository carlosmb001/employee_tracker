-- DROP DATABASE
DROP DATABASE IF EXISTS employee_db;

-- CREATE DATABASE
CREATE DATABASE employee_db;

-- Select the created DATABASE
USE employee_db;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY(department_id) REFERENCES department(id)
);


CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);