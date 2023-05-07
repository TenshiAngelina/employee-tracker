const inquirer = require("inquirer");
require("console.table");
const db = require("./db");

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome to the employee tracker!",
        name: "menu",
        choices: [
          "Add Employee",
          "Add role",
          "Add Department",
          "View all employees",
          "View all departments",
          "View all roles",
          "Exit app",
        ],
      },
    ])
    .then((response) => {
      switch (response.menu) {
        case "Add Employee":
          createEmployee();
          break;
        case "Add role":
          createRole();
          break;
        case "Add Department":
          createDepartment();
          break;
        case "View all employees":
          ViewAllEmployees();
          break;
        case "View all departments":
          ViewAllDepartments();
          break;
        case "View all roles":
          ViewAllRoles();
          break;
        case "Exit app":
          exitApp();
          break;
      }
    });
}

function ViewAllDepartments() {
  db.findAllDepartments()
    .then((records) => {
      //console.log(records);
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
}
function ViewAllRoles() {
  db.findAllRoles()
    .then((records) => {
      //console.log(records);
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
}
function ViewAllEmployees() {
  db.findAllEmployees()
    .then((records) => {
      //console.log(records);
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
}

function createEmployee() {
  db.insertEmployee()
    .then((records) => {
      //console.log(records);
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
}
function createRole() {
  inquirer.prompt([
    {
      //tilte
    },
    {
      //salary
    },
    {
     // department_id 
     //Option to have list of department Is - select first and then 
     //Option List of hardcoded departmentId
     //Option Enter
    }
  ]).then(response => {
  db.insertRole(response.title,response.salary,response.department_id)
    .then((records) => {
      //console.log(records);
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
  })
}

function exitApp() {
  db.closeConection();
  process.exit(0);
}

init();
