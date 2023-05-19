const inquirer = require("inquirer");
require("console.table");
const db = require("./db");
// Initial function, it prompts initial question
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome to the employee tracker!",
        name: "menu",
        choices: [
          "View all employees",
          "View all departments",
          "View all roles",
          "Add Employee",
          "Add role",
          "Add Department",
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
// Function that shows all edpartments in the console
function ViewAllDepartments() {
  db.findAllDepartments()
    .then((records) => {
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
}
// Function that shows all roles in the console
function ViewAllRoles() {
  db.findAllRoles()
    .then((records) => {
      //console.log(records);
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
}
// Function that shows all employees in the console
function ViewAllEmployees() {
  db.findAllEmployees()
    .then((records) => {
      //console.log(records);
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
}
// Function that creates a new employee in the database
function createEmployee() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "Type your first name",
      name: "first_name"
    },
    {
      type: "input",
      message: "Type your last name",
      name: "last_name"
    },
    {
      type: "input",
      message: "What's your role id?",
      name: "first_name"
    },
    {
      type: "list",
      message: "What is your department id?",
      name: "first_name"
    }
  ]).then(response => {
    db.insertEmployee()
      .then((records) => {
        console.table(records[0]);
        init();
      })
      .catch((err) => console.log(err));
  })
}

function createRole() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "Type your title",
      name: "title",
    },
    {
      type: "input",
      message: "Type your salary",
      name: "salary",
    },
    {
      type: "list",
      message: "Choose your department",
      name: "department_id",
      choices: [
        "1",
        "2",
        "3"
      ],
    },
  ]).then(response => {
  db.insertRole(response.title,response.salary,response.department_id)
    .then((records) => {
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
  })
}

function createDepartment() {
  db.insertDepartment()
    .then((records) => {
      console.table(records[0]);
      init();
    })
    .catch((err) => console.log(err));
}

function exitApp() {
  db.closeConection();
  process.exit(0);
}

init();
