const connection = require("./connection");

//Function that returns all users
function findAllEmployees() {
  return connection.promise().query("SELECT * FROM employees");
}
// Function that returns all departments
function findAllDepartments() {
  return connection.promise().query("SELECT * FROM departments");
}
// Function that returns all roles
function findAllRoles() {
  return connection.promise().query("SELECT * FROM roles");
}
// Function that creates a new department
function insertDepartment(departmentname) {
  return connection.promise().query(`INSERT INTO departments (name) VALUES (?)`,[departmentname]);
}
// Function that creates a new role
function insertRole(title,salary,department_id) {
  return connection.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,[title,salary,department_id]);
}
// Function that creates a new employee
function insertEmployee(first_name, last_name, role_id, manager_id) {
  return connection.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,[first_name, last_name, role_id, manager_id]);
}
// Function that ends the app
function closeConection(){
  return connection.end()
}

module.exports = {
  findAllEmployees,
  findAllDepartments,
  findAllRoles,
  insertDepartment,
  insertEmployee,
  insertRole,
  closeConection
};
