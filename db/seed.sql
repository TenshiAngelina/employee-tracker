USE employees_db;

INSERT INTO departments (name) VALUES ('Engineering'), ('Sales'), ('Marketing');

INSERT INTO roles (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Sales Representative', 80000, 2),
('Marketing Manager', 120000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 1, 1),
('Bob', 'Johnson', 2, NULL),
('Alice', 'Williams', 2, 3),
('David', 'Brown', 3, 4);