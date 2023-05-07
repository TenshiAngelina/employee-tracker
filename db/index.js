const connection = require("./connection");

//Function that returns all users
function findAllEmployees() {
  return connection.promise().query("SELECT * FROM employees");
}
function findAllDepartments() {
  return connection.promise().query("SELECT * FROM departments");
}
function findAllRoles() {
  return connection.promise().query("SELECT * FROM roles");
}

function insertDepartment(departmentname) {
  return connection
    .promise()
    .query(`INSERT INTO departments (name) VALUES (${departmentname});`);
}
function insertRole(title,salary,department_id) {
  return connection.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,[title,salary,department_id]);
}
function insertEmployee(first_name, last_name, role_id, manager_id) {
  return connection.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,[first_name, last_name, role_id, manager_id]);
}
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
