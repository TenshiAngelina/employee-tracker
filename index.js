const inquirer = require("inquirer");
require("console.table");
const db = require("./db");
// Object that contanins the name and id of the departments
let departmentChoices = [
  { name: "Engineering", VALUE: 1 },
  { name: "Sales", VALUE: 2 },
  { name: "Marketing", VALUE: 3 },
];
// Object that contanins the name and id of the roles
let roleChoices =  [
  { name: "Software Engineer", VALUE: 1 },
  { name: "Sales Representative", VALUE: 2 },
  { name: "Marketing Manager", VALUE: 3 },
];
// Object that contanins the name and id of the departments
let managerChoices =  [
  { name: "John Doe", VALUE: 1 },
  { name: "Jane Smith", VALUE: 2 },
  { name: "Bob Johnson", VALUE: 3 },
  { name: "Alice Williams", VALUE: 4 },
  { name: "David Brown", VALUE: 5 },  
];

// Initial function, it prompts initial question
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome to the employee tracker!",
        name: "menu",
        choices: [
          "Add employee",
          "Add role",
          "Add department",
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
      type: "list",
      message: "What's your role?",
      name: "role_id",
      choices: roleChoices.map((roleChoice) => roleChoice.name)
    },
    {
      type: "list",
      message: "Who is your manager?",
      name: "manager_id",
      choices: managerChoices.map((managerChoice) => managerChoice.name)
    }
  ]).then(response => {
    db.insertEmployee(response.first_name, response.last_name, response.role_id, response.manager_id)
      .then((records) => {
        console.table(records[0]);
        init();
      })
      .catch((err) => console.log(err));
  })
}
// Function that creates a new role into the database
function createRole() {
  inquirer
  .prompt([
    {
      type: "input",
      message: "Type the new role's title",
      name: "title",
    },
    {
      type: "input",
      message: "Type the new role's salary",
      name: "salary",
    },
    {
      type: "list",
      message: "Choose the new role's department",
      name: "department_id",
      choices: departmentChoices.map((departmentChoice) => departmentChoice.name)
    },
  ]).then(response => {
  db.insertRole(response.title, response.salary, response.department_id)
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
