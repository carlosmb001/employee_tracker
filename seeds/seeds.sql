-- Departments
INSERT INTO department (id, name) VALUES
    (1, 'HR'),
    (2, 'Engineering'),
    (3, 'Marketing');

-- Roles
INSERT INTO role (id, title, salary, department_id) VALUES
    (1, 'HR Manager', 80000, 1),
    (2, 'Software Engineer', 90000, 2),
    (3, 'Marketing Specialist', 60000, 3),
    (4, 'Engineering Manager', 100000, 2),
    (5, 'Marketing Manager', 85000, 3);

-- Employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
    (1, 'John', 'Doe', 1, NULL),
    (2, 'Jane', 'Smith', 2, 4),
    (3, 'Mike', 'Johnson', 2, 4),
    (4, 'Emily', 'Williams', 3, 5),
    (5, 'David', 'Lee', 4, NULL),
    (6, 'Sarah', 'Brown', 5, NULL);
